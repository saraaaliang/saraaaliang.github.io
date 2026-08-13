---
name: heading-hierarchy
description: Canonical text-size/weight/color hierarchy (大中小標) for this portfolio's case study pages (src/app/*CaseStudy.tsx). Use this whenever building a new case study page, adding a new heading/label/subsection to an existing one, or when something "looks off" size-wise — e.g. a sub-item reads bigger or bolder than the section heading it lives under. Also use when the user asks to check, fix, or align heading levels, font sizes, or "層級" across the site.
---

# Heading hierarchy for case study pages

## Why this exists

Each case study page (Sharing Time, Community of Care, SDG Energy, RWD Storybook, and future ones) is its own independent component per `CLAUDE.md` — there's no shared `CaseBlock` enforcing consistency. That independence is deliberate (different projects need different layouts), but it means heading sizes drift unless someone actively checks them. This has already happened multiple times in this project:

- SDG Energy's "Version 1/2/3" labels were styled `text-lg font-bold` — bigger than the "Decision Rationale" subsection heading (`text-sm font-bold`) they sit right below, and bigger than the "Design Process" kicker for the whole section. A sub-item outranking its own parent heading is the exact failure mode this skill exists to catch.
- Sharing Time's "數位化延伸" is embedded inline via `<strong>` inside a paragraph instead of being its own heading block, while SDG Energy's "遊戲前介紹畫面"/"遊戲體驗畫面" (the same conceptual level) use a real block-level element.
- **RWD Storybook's first draft repeated the exact same `text-lg font-bold` mistake SDG Energy already made** — its three Design Process subsection headings ("為什麼將手機版優化" / "為什麼要用漸進式揭露提升資訊易讀性" / "為什麼要用側邊導覽設計") were built at `text-lg` from scratch, not introduced by a later edit. This means the bug isn't just an editing-drift risk — it recurs on a brand-new page too, because `text-lg` "feels right" for a subsection heading if you're not actively checking it against the table below. **Always run the self-check even on a first draft, not only when revising.** Fixed to `text-base font-bold` (the sanctioned L3 upgrade) to match SDG Energy/Community of Care's own discovery-card and subsection sizing.

The fix in all cases was the same move: identify what level the element actually is in the content's logical structure, then match it to the levels below — not invent a new size.

## The levels

Every case study page (see `src/app/SharingTimeCaseStudy.tsx`, `CommunityOfCareCaseStudy.tsx`, `SdgEnergyCaseStudy.tsx`, `RwdStorybookCaseStudy.tsx` for real examples) uses inline `style={{ color: c.xxx }}` with a `c` token object at the top of the file — see `CLAUDE.md` for the hex values. Reference colors by their token name (`c.ink`, `c.accent`, etc.), not raw hex, so this still works after a palette tweak.

| Level | What it is | Classes | Color | Examples |
|---|---|---|---|---|
| **L1** | Hero title (one per page) | `text-[2.5rem] md:text-5xl font-bold leading-[1.3] tracking-tight` | `c.ink` | "企業服務：內部分享服務設計", "SDGs 能源互動體驗設計" |
| **L2** | Kicker — major section label | `text-xs uppercase tracking-[0.1em] font-semibold` | `c.accent` (or `c.accentLight` on a dark band, via the `onDark` prop on `Kicker`) | Impact, Problem, Discovery, Design Process, Outcome, Reflection — **always English, never translated**, even though everything else on the page is Chinese |
| **L3** | Subsection heading — a named part inside one major section | `text-sm font-bold` (occasionally `text-base font-bold` when it needs more visual weight, e.g. a standalone problem statement) | `c.ink` on light bg, `c.darkInk` on the dark Outcome band | "Decision Rationale", "數位化延伸", "遊戲前介紹畫面", "遊戲體驗畫面", RWD Storybook's "為什麼將手機版優化" / "為什麼要用漸進式揭露提升資訊易讀性" / "為什麼要用側邊導覽設計" (all `text-base font-bold`) |
| **L4** | Card / list-item heading | `text-sm font-bold` to `text-base font-bold` | `c.ink` | Stat card titles, decision-card headings, persona names, discovery-card headings (all discovery-style cards across projects converge on `text-base font-bold mb-3 leading-[1.4]`) |
| **L5** | Body copy | `text-[13px]` to `text-sm`, `leading-[1.6]` to `leading-[1.85]` | `c.body` / `c.darkBody` | Paragraphs, card descriptions |
| **L6** | Meta / caption / small label | `text-[10px]` to `text-xs`, `uppercase`, `tracking-[0.05em]` to `tracking-[0.08em]` | `c.muted` / `c.darkCaption` | ROLE, FOCUS, USERS, figcaptions, "User Feedback", "Version 1/2/3" |

**The rule that actually matters**: within any given section, a level must never be visually louder (bigger, bolder, or a stronger color) than the level it's nested under. L3 beats L4 beats L5 beats L6. If a L6 caption-style label (like "Version 1") is doing real header duty and it *should* read as more prominent than its neighbors, that's a sign it's actually an L3 or L4 in disguise — promote it properly instead of just bumping the font size in place.

## When Decision Rationale (or similar recurring labels) can be L2 instead of L3

Some labels — "Decision Rationale" is the concrete case — show up across projects at different levels, and that's fine as long as it's a deliberate call, not drift:

- **Community of Care**: `decisionRationale` is its own top-level section with a `Kicker` (L2), because the page has enough distinct content (a full "not chosen vs. chosen" comparison) to earn a full section.
- **SDG Energy**: "Decision Rationale" is a `text-sm font-bold` subsection (L3) living inside the "Design Process" kicker section, alongside the problem-core callout and the Version 1→2→3 story — because there, it's one of three closely related pieces under one narrative, not a standalone section.

When adding this to a new project, ask: does this content stand alone as its own major beat in the case study story (→ L2, give it a `Kicker`), or is it one supporting piece inside a bigger section (→ L3, plain bold text)? Don't default to L2 just because another project did it that way.

## Emoji-prefixed callout pattern (💡 🎯 ⚠️ ✅)

Several pages use a leading emoji to flag an insight/warning/decision callout (a highlighted box or inline note). There are two legitimate shapes depending on what the "label" actually is — pick by content shape, not by copying whichever one you saw last:

- **Short fixed tag → Community of Care's `keyInsight`/`impact.notes` boxes**: the label is a short, static word (「假設」「疑慮」「下一階段目標」「專案定位」, 2–6 characters), styled as its own L6 line, separate from the body:
  ```jsx
  <div className="flex gap-2 mb-2">
    <span className="text-base leading-none">💡</span>
    <span className="text-xs font-bold uppercase tracking-[0.06em]" style={{ color: c.muted }}>
      {shortLabel}
    </span>
  </div>
  {/* body: <ul> or <p className="text-sm leading-[1.7] font-semibold"> below, color c.ink */}
  ```
  Use this when the label is a fixed category name that doesn't change per-instance.

- **Full-sentence headline → Sharing Time's Discovery `phase1.heading`/`phase2.heading`, RWD Storybook's Users `insight` box**: the "label" is itself a complete, content-specific sentence (varies per project, not a reusable tag), inlined as bold+accent text directly before the body, in one paragraph:
  ```jsx
  <p className="text-sm leading-[1.8]" style={{ color: c.body }}>
    <strong style={{ color: c.accent, fontWeight: 700 }}>💡 {headlineSentence}</strong>
    <br />
    {bodyText}
  </p>
  ```
  Use this when the headline is a one-off descriptive sentence pulled from that project's content data, not a short reusable label — forcing it into the uppercase-tag shape above reads oddly for a full sentence and was a real mistake caught in RWD Storybook's first draft (the box originally used a bold `c.ink` heading line + separate body paragraph, matching neither pattern above).

Both shapes stay at body-paragraph weight (`text-sm`/`text-xs`) — never bump an emoji callout to L3/L4 heading size just because it sits inside its own colored box.

## Self-check before calling a section "done"

List every heading-like element in the section (kickers, subsection labels, card titles, small caps labels) with its current Tailwind classes and color token. For each one, name which level (L1–L6) it's meant to be, and confirm nothing lower in the tree is visually heavier than its parent. If you find one that doesn't fit any level cleanly, that's the signal to fix it — either match it to the nearest real level, or flag it to the user with the specific mismatch (e.g. "X is styled bigger than its parent heading Y") rather than leaving it as a new one-off size.
