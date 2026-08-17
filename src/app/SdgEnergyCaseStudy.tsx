import { motion } from "motion/react";
import { ArrowLeft, Compass, Check, Users, Lightbulb, Target } from "lucide-react";
import type { IconKey, SdgEnergyContent } from "../content/sdg-energy";
import type { Project } from "./App";

// ── Design tokens — shared with "Enterprise Service Design · Version C" ────
const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  accentLight: "#cdec8e",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
  problemBand: "#eef4e8",
  darkBg: "#0f3d2b",
  darkInk: "#eef4e9",
  darkBody: "#c7d5c0",
  darkCaption: "#9db097",
};

const ICONS: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  target: Target,
  check: Check,
  people: Users,
  compass: Compass,
  lightbulb: Lightbulb,
};

function IconCircle({ icon }: { icon: IconKey }) {
  const Icon = ICONS[icon];
  return (
    <div
      className="w-[52px] h-[52px] rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: c.accentLight }}
    >
      <Icon size={22} strokeWidth={1.6} color={c.accent} />
    </div>
  );
}

function Kicker({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div
      className="text-xs uppercase tracking-[0.1em] font-semibold"
      style={{ color: onDark ? c.accentLight : c.accent }}
    >
      {children}
    </div>
  );
}

function Card2({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`rounded-2xl p-7 ${className}`} style={{ backgroundColor: c.surface, ...style }}>
      {children}
    </div>
  );
}

export default function SdgEnergyCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: SdgEnergyContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  return (
    <main style={{ fontFamily: "var(--font-inter)", color: c.body, background: "#ffffff" }}>
      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-8">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <button
              onClick={() => onNavigate("home", "work")}
              className="group inline-flex items-center gap-2 text-sm font-semibold mb-12 hover:opacity-70 transition-opacity"
              style={{ color: c.ink }}
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              All projects
            </button>

            <Kicker>{content.hero.kicker}</Kicker>
            <h1
              className="text-[2.5rem] md:text-5xl font-bold leading-[1.3] tracking-tight mt-4 mb-5 max-w-3xl"
              style={{ color: c.ink }}
            >
              {content.hero.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {content.hero.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: c.surface, color: c.body, border: `1px solid ${c.border}` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="max-w-xl flex-1">
                <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                  Description
                </div>
                <p className="text-[15px] leading-[1.8]" style={{ color: c.body }}>
                  {content.hero.description}
                </p>
              </div>
              <div className="hidden md:block w-px flex-none" style={{ backgroundColor: c.border }} />
              <div className="flex flex-row gap-8 flex-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                    Role
                  </div>
                  <div className="text-sm font-medium" style={{ color: c.ink }}>{content.hero.role}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                    Focus
                  </div>
                  <div className="text-sm font-medium max-w-[220px]" style={{ color: c.ink }}>
                    {content.hero.focus}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24 pt-6">
        <div className="w-full aspect-[16/9] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
          <img
            src={content.hero.pagePhoto}
            alt={content.hero.pagePhotoAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
          {content.hero.exhibition}
        </figcaption>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.impact.kicker}</Kicker>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {content.impact.stats.map((stat, i) => (
              <Card2 key={i}>
                <div className="mb-4">
                  <IconCircle icon={stat.icon} />
                </div>
                <div className="text-base font-bold mb-1.5" style={{ color: c.ink }}>{stat.title}</div>
                <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{stat.description}</p>
              </Card2>
            ))}
          </div>
          <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
            <img
              src={content.impact.image}
              alt={content.impact.imageCaption}
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
            {content.impact.imageCaption}
          </figcaption>
        </div>
      </div>

      {/* Problem — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{content.problem.kicker}</Kicker>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 mt-6">
            <div className="flex-1">
              <div className="rounded-[20px] overflow-hidden max-w-[420px]" style={{ backgroundColor: "#ffffff" }}>
                <img
                  src={content.problem.image}
                  alt={content.problem.imageCaption}
                  className="w-full h-auto object-contain"
                />
              </div>
              <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
                {content.problem.imageCaption}
              </figcaption>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <p className="text-[15px] leading-[1.85]" style={{ color: c.body }}>
                {content.problem.description}
              </p>
              <div className="rounded-2xl p-3.5" style={{ backgroundColor: "#ffffff" }}>
                <div
                  className="text-xs font-bold uppercase tracking-[0.06em] mb-3"
                  style={{ color: c.muted }}
                >
                  {content.problem.users.label}
                </div>
                <div className="text-sm font-bold mb-2" style={{ color: c.ink }}>
                  {content.problem.users.groupName}
                </div>
                <ul className="space-y-1 list-disc list-outside pl-4">
                  {content.problem.users.traits.map((t, i) => (
                    <li key={i} className="text-[13px] leading-[1.6]" style={{ color: c.body }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.discovery.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {content.discovery.cards.map((card, i) => (
            <Card2 key={i}>
              <div className="mb-4">
                <IconCircle icon={card.icon} />
              </div>
              <div className="text-base font-bold mb-3 leading-[1.4]" style={{ color: c.ink }}>
                {card.heading}
              </div>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{card.body}</p>
            </Card2>
          ))}
        </div>
      </div>

      {/* Design Process */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.designProcess.kicker}</Kicker>
        <div className="rounded-2xl p-6 mt-6 mb-6" style={{ backgroundColor: c.problemBand }}>
          <p className="text-sm leading-[1.8] font-semibold" style={{ color: c.ink }}>
            {content.designProcess.problemCore.before}
            <strong style={{ color: c.accent }}>{content.designProcess.problemCore.bold}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {content.designProcess.decisions.map((d, i) => (
            <Card2 key={i}>
              <div className="text-2xl font-bold mb-3" style={{ color: c.accent }}>
                {i + 1}
              </div>
              <div className="text-sm font-bold mb-2" style={{ color: c.ink }}>{d.heading}</div>
              <p className="text-[13px] leading-[1.6]" style={{ color: c.accent }}>→ {d.result}</p>
            </Card2>
          ))}
        </div>

        {/* Version timeline */}
        <div className="space-y-10">
          {content.designProcess.versions.map((v, i) => (
            <div key={i}>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-1 w-full text-left">
                  <div className="h-[300px] flex flex-col justify-center">
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.08em] mb-3"
                      style={{ color: c.muted }}
                    >
                      {v.version}
                    </div>
                    <p className="text-sm leading-[1.8]" style={{ color: c.body }}>
                      {v.description}
                    </p>
                    {i === 1 && (
                      <div
                        className="rounded-2xl p-4 mt-4 flex flex-col items-center gap-3"
                        style={{ border: `1px solid ${c.border}` }}
                      >
                        <img
                          src={content.designProcess.engineerNote.image}
                          alt={content.designProcess.engineerNote.imageCaption}
                          className="h-[70px] w-auto object-contain"
                        />
                        <p className="text-[13px] leading-[1.6] text-center" style={{ color: c.body }}>
                          {content.designProcess.engineerNote.before}
                          <strong style={{ color: c.accent, fontWeight: 700 }}>
                            {content.designProcess.engineerNote.emphasis}
                          </strong>
                          {content.designProcess.engineerNote.after}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {v.image && (
                  <div className="flex-1 w-full">
                    <div className="rounded-[20px] overflow-hidden w-full h-[300px] flex items-center justify-center">
                      <img
                        src={v.image}
                        alt={v.imageCaption}
                        className="max-w-full max-h-full object-contain rounded-[20px]"
                      />
                    </div>
                    {v.imageCaption && (
                      <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
                        {v.imageCaption}
                      </figcaption>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome — dark band */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.outcome.kicker}</Kicker>
          <p className="text-sm leading-[1.85] max-w-2xl mt-6 mb-20" style={{ color: c.darkBody }}>
            {content.outcome.description}
          </p>

          {/* Onboarding screens */}
          <div className="mb-7">
            <strong style={{ color: c.darkInk, fontWeight: 700 }} className="text-sm">
              {content.outcome.onboarding.heading}
            </strong>
          </div>
          <div className="space-y-2.5 mb-9 max-w-2xl">
            {content.outcome.onboarding.points.map((p, i) => (
              <p key={i} className="text-sm leading-[1.8]" style={{ color: c.darkBody }}>
                <strong style={{ color: c.darkInk, fontWeight: 700 }}>
                  {i + 1}. {p.title}
                </strong>
                {" | "}
                {p.body}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 mb-20">
            {content.outcome.onboarding.steps.map((step, i) => (
              <div key={i}>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
                  <img src={step.src} alt={step.caption} className="w-full h-auto object-contain" />
                </div>
                <figcaption className="mt-2.5 text-xs leading-[1.6]" style={{ color: c.darkCaption }}>
                  {step.caption}
                </figcaption>
              </div>
            ))}
          </div>

          {/* Experience screens */}
          <div className="mb-7">
            <strong style={{ color: c.darkInk, fontWeight: 700 }} className="text-sm">
              {content.outcome.experience.heading}
            </strong>
          </div>
          <div className="space-y-2.5 mb-9 max-w-2xl">
            {content.outcome.experience.points.map((p, i) => (
              <p key={i} className="text-sm leading-[1.8]" style={{ color: c.darkBody }}>
                <strong style={{ color: c.darkInk, fontWeight: 700 }}>
                  {i + 1}. {p.title}
                </strong>
                {" | "}
                {p.body}
              </p>
            ))}
          </div>
          <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
            <img
              src={content.outcome.experience.image}
              alt={content.outcome.experience.heading}
              className="w-full h-auto object-contain"
            />
          </div>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {content.outcome.experience.imageSteps.map((s, i) => (
              <li key={i} className="text-[12px] leading-[1.6]" style={{ color: c.darkCaption }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.reflection.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-8" style={{ color: c.body }}>
          {content.reflection.paragraph}
        </p>
        <div
          className="grid gap-x-6 max-w-3xl rounded-2xl px-7 py-6"
          style={{
            backgroundColor: c.surface,
            gridTemplateColumns: content.reflection.projectValue.map(() => "1fr").join(" 1px "),
          }}
        >
          {content.reflection.projectValue.map((_, i) =>
            i > 0 ? (
              <div key={`div-${i}`} style={{ gridColumn: i * 2, backgroundColor: c.border }} />
            ) : null
          )}
          {content.reflection.projectValue.map((v, i) => (
            <div key={i} style={{ gridColumn: i * 2 + 1 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.06em] mb-2" style={{ color: c.muted }}>
                {v.label}
              </div>
              <p className="text-xs leading-[1.6]" style={{ color: c.body }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
