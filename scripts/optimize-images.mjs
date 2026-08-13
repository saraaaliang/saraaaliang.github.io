#!/usr/bin/env node
// ── Image optimization for src/content/images ──────────────────────────────
// Resizes down (never up) and recompresses any PNG/JPEG/GIF dropped into
// src/content/images/** so it's web-appropriate in size while staying
// visually near-identical. Runs in place — same filename, same path — so
// nothing in the code needs to change when you swap a photo.
//
// One-shot:  npm run optimize-images
// Watch mode (auto-runs whenever a file is added/changed): npm run optimize-images:watch

import { readdir, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import sharp from "sharp";
import gifsiclePath from "gifsicle";

const execFileAsync = promisify(execFile);

const IMAGES_DIR = path.resolve(import.meta.dirname, "../src/content/images");
const MAX_WIDTH = 2000; // covers even full-bleed use at retina (2x) inside the 1080px content column
const GIF_MAX_WIDTH = 720; // GIFs here are small mobile-frame demo clips, not full-bleed images
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82; // sharp uses libvips palette quantization for PNG at this setting
const SKIP_IF_UNDER_BYTES = 300 * 1024; // don't bother reprocessing already-small files

const isWatch = process.argv.includes("--watch");

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (/\.(png|jpe?g|gif)$/i.test(entry.name)) {
      yield full;
    }
  }
}

async function optimizeGif(filePath, before) {
  const tmp = `${filePath}.tmp`;
  // --lossy trades a bit of dithering noise for much smaller files; -O3 is gifsicle's
  // highest optimization level; --resize-width scales down oversized screen recordings.
  await execFileAsync(gifsiclePath, [
    "-O3",
    "--lossy=80",
    "--colors=128",
    "--resize-width",
    String(GIF_MAX_WIDTH),
    filePath,
    "-o",
    tmp,
  ]);
  const fs = await import("node:fs/promises");
  const after = (await stat(tmp)).size;
  if (after < before) {
    await fs.rename(tmp, filePath);
    return after;
  }
  await fs.unlink(tmp);
  return before;
}

async function optimizeOne(filePath) {
  const before = (await stat(filePath)).size;
  const isGif = /\.gif$/i.test(filePath);

  if (isGif) {
    if (before < SKIP_IF_UNDER_BYTES) {
      return { filePath, skipped: true, before, after: before };
    }
    const after = await optimizeGif(filePath, before);
    return { filePath, skipped: after >= before, before, after };
  }

  if (before < SKIP_IF_UNDER_BYTES) {
    return { filePath, skipped: true, before, after: before };
  }

  const image = sharp(filePath);
  const meta = await image.metadata();
  const isPng = /\.png$/i.test(filePath);

  let pipeline = image.rotate(); // normalize EXIF orientation
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const buffer = isPng
    ? await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true }).toBuffer()
    : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  // Only overwrite if we actually made it smaller — never regress a file.
  if (buffer.length < before) {
    const fs = await import("node:fs/promises");
    await fs.writeFile(filePath, buffer);
    return { filePath, skipped: false, before, after: buffer.length };
  }
  return { filePath, skipped: true, before, after: before };
}

async function runOnce() {
  const files = [];
  for await (const f of walk(IMAGES_DIR)) files.push(f);

  if (files.length === 0) {
    console.log("No images found under", IMAGES_DIR);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const f of files) {
    const r = await optimizeOne(f);
    totalBefore += r.before;
    totalAfter += r.after;
    const rel = path.relative(IMAGES_DIR, f);
    if (r.skipped) {
      console.log(`  skip   ${rel}  (${(r.before / 1024).toFixed(0)} KB, already optimal)`);
    } else {
      const pct = (100 * (1 - r.after / r.before)).toFixed(0);
      console.log(
        `  ✓ ${rel}  ${(r.before / 1024 / 1024).toFixed(1)} MB → ${(r.after / 1024).toFixed(0)} KB  (-${pct}%)`
      );
    }
  }
  console.log(
    `\nDone. ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB total.`
  );
}

async function runWatch() {
  const { default: chokidar } = await import("chokidar");
  console.log(`Watching ${IMAGES_DIR} for new/changed images... (Ctrl+C to stop)`);
  const watcher = chokidar.watch(`${IMAGES_DIR}/**/*.{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}`, {
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
  });
  watcher.on("add", async (filePath) => {
    const r = await optimizeOne(filePath);
    const rel = path.relative(IMAGES_DIR, filePath);
    if (r.skipped) {
      console.log(`  skip   ${rel}`);
    } else {
      const pct = (100 * (1 - r.after / r.before)).toFixed(0);
      console.log(`  ✓ ${rel}  ${(r.before / 1024 / 1024).toFixed(1)} MB → ${(r.after / 1024).toFixed(0)} KB  (-${pct}%)`);
    }
  });
}

if (isWatch) {
  await runWatch();
} else {
  await runOnce();
}
