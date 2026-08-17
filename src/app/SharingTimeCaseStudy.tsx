import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Target,
  MessageCircle,
  Users,
  AlertCircle,
} from "lucide-react";
import type { IconKey, SharingTimeContent } from "../content/sharing-time";
import type { Project } from "./App";

// ── Design tokens — "Enterprise Service Design · Version C" ──────────────
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
  darkMobileBg: "#164a35",
};

const ICONS: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  check: Check,
  target: Target,
  chat: MessageCircle,
  people: Users,
  alert: AlertCircle,
  arrow: ArrowRight,
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
    <div
      className={`rounded-2xl p-7 ${className}`}
      style={{ backgroundColor: c.surface, ...style }}
    >
      {children}
    </div>
  );
}

type PersonaCard = SharingTimeContent["discovery"]["persona"]["cards"][number];
type Palette = typeof c;

function PersonaHeader({ card, c }: { card: PersonaCard; c: Palette }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-[52px] h-[52px] rounded-full flex-shrink-0 flex items-center justify-center text-2xl"
        style={{ backgroundColor: c.accentLight }}
      >
        <span role="img" aria-label={card.name}>{card.emoji}</span>
      </div>
      <div>
        <div className="text-[15px] font-bold" style={{ color: c.ink }}>{card.name}</div>
        <span
          className="inline-block text-[10px] font-semibold px-[8px] py-[2px] rounded-full mt-1"
          style={
            card.tagStyle === "primary"
              ? { backgroundColor: c.accentLight, color: c.accent }
              : card.tagStyle === "dark"
              ? { backgroundColor: c.accent, color: "#fff" }
              : { backgroundColor: "#e2e4de", color: c.body }
          }
        >
          {card.tag}
        </span>
      </div>
    </div>
  );
}

function PersonaQuote({ card, c }: { card: PersonaCard; c: Palette }) {
  return (
    <p
      className="text-[13px] leading-[1.6] mb-5 text-pretty"
      style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
    >
      「{card.quote}」
    </p>
  );
}

function PersonaField({
  label,
  items,
  c,
  tight = false,
}: {
  label: string;
  items: string[];
  c: Palette;
  tight?: boolean;
}) {
  return (
    <div className={tight ? "" : "mb-2.5 last:mb-0"}>
      <div className="text-[10px] font-bold uppercase tracking-[0.06em] mb-1" style={{ color: c.muted }}>
        {label}
      </div>
      <ul className="space-y-0.5 list-disc list-outside pl-4">
        {items.map((item, ii) => (
          <li key={ii} className="text-xs leading-[1.5] text-pretty" style={{ color: c.body }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SharingTimeCaseStudy({
  project,
  content,
  onNavigate,
}: {
  project: Project;
  content: SharingTimeContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  return (
    <main style={{ fontFamily: "var(--font-inter)", color: c.body, background: "#ffffff" }}>
      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-8">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
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
              className="text-[2.5rem] md:text-5xl font-bold leading-[1.3] tracking-tight mt-4 mb-8 max-w-3xl"
              style={{ color: c.ink }}
            >
              {content.hero.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
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

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <div className="w-full aspect-[16/9] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
          <img
            src={content.hero.coverImage}
            alt={content.hero.coverAlt}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Digital Extension — dark band opener, "this is what shipped" before diving into the process story */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.outcome.digitalExtension.kicker}</Kicker>
          <p className="text-sm leading-[1.85] max-w-2xl mt-6 mb-9" style={{ color: c.darkBody }}>
            <strong style={{ color: c.darkInk, fontWeight: 700 }}>{content.outcome.digitalExtension.title}：</strong>
            <br />
            {content.outcome.digitalExtension.paragraph}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-9">
            {content.outcome.digitalExtension.mobileScreens.map((screen, i) => (
              <div key={i}>
                <div
                  className="w-full aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: c.darkMobileBg }}
                >
                  {screen.src ? (
                    <video
                      src={screen.src}
                      aria-label={screen.caption}
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <span className="text-xs px-2 text-center" style={{ color: c.darkCaption }}>
                      GIF 待上傳
                    </span>
                  )}
                </div>
                <figcaption className="mt-2 text-xs text-center" style={{ color: c.darkCaption }}>
                  {screen.caption}
                </figcaption>
              </div>
            ))}
          </div>

          <a
            href={content.outcome.digitalExtension.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: c.accentLight, color: c.accent }}
          >
            {content.outcome.digitalExtension.cta}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.impact.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-16">
          {content.impact.stats.map((stat, i) => (
            <Card2 key={i}>
              <div className="mb-5">
                <IconCircle icon={stat.icon} />
              </div>
              <div className="text-xl font-bold mb-2.5" style={{ color: c.ink }}>{stat.title}</div>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{stat.description}</p>
            </Card2>
          ))}
        </div>

        <div
          className="text-xs font-semibold uppercase tracking-[0.08em] mb-6"
          style={{ color: c.muted }}
        >
          {content.impact.feedbackLabel}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.impact.quotes.map((q, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ border: `1px solid ${c.border}` }}>
              <p
                className="text-[17px] leading-[1.6] mb-3.5"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
              >
                {q.quote}
              </p>
              <div className="text-xs" style={{ color: c.muted }}>{q.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{content.problem.kicker}</Kicker>
          <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-5" style={{ color: c.body }}>
            {content.problem.before}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.problem.bold}</strong>
            {content.problem.after}
          </p>
          <p className="text-sm leading-[1.8] max-w-3xl" style={{ color: c.body }}>
            {content.problem.why.before}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.problem.why.emphasis}</strong>
            {content.problem.why.after}
          </p>
        </div>
      </div>

      {/* Discovery */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.discovery.kicker}</Kicker>

        {/* Phase 1 */}
        <div className="mt-6 mb-16">
          <p className="text-sm leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.discovery.phase1.heading}</strong>
            <br />
            {content.discovery.phase1.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-9">
            {content.discovery.phase1.insights.map((item, i) => (
              <Card2 key={i}>
                <div className="mb-4">
                  <IconCircle icon={item.icon} />
                </div>
                <p className="text-sm leading-[1.7]" style={{ color: c.body }}>{item.text}</p>
              </Card2>
            ))}
          </div>
          <div className="rounded-[20px] overflow-hidden max-w-[538px]" style={{ backgroundColor: c.surface }}>
            <img
              src={content.discovery.phase1.image}
              alt={content.discovery.phase1.imageCaption}
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="mt-2.5 text-xs mb-7" style={{ color: c.muted }}>
            {content.discovery.phase1.imageCaption}
          </figcaption>
          <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
            <img
              src={content.discovery.phase1.insightImage}
              alt={content.discovery.phase1.insightImageCaption}
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
            {content.discovery.phase1.insightImageCaption}
          </figcaption>
        </div>

        {/* Phase 2 */}
        <div className="mb-16">
          <p className="text-sm leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.discovery.phase2.heading}</strong>
            <br />
            {content.discovery.phase2.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-9">
            {content.discovery.phase2.findings.map((item, i) => (
              <Card2 key={i}>
                <div className="mb-4">
                  <IconCircle icon={item.icon} />
                </div>
                <p className="text-sm leading-[1.7]" style={{ color: c.body }}>{item.text}</p>
              </Card2>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {content.discovery.phase2.images.map((img, i) => (
              <div key={i} className="flex-none">
                <div
                  className="h-56 sm:h-72 lg:h-80 rounded-[20px] overflow-hidden flex"
                  style={{ backgroundColor: c.surface }}
                >
                  <img src={img.src} alt={img.caption} className="h-full w-auto object-contain" />
                </div>
                <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{img.caption}</figcaption>
              </div>
            ))}
          </div>
        </div>

        {/* Persona */}
        <div>
          <div className="text-[13px] font-semibold mb-3" style={{ color: c.muted }}>
            {content.discovery.persona.label}
          </div>
          <p className="text-sm leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
            {content.discovery.persona.description}
          </p>
          <div
            className="rounded-2xl p-5 md:p-6 mb-10"
            style={{ backgroundColor: c.problemBand }}
          >
            {/* Mobile / tablet — one persona per stacked block */}
            <div className="lg:hidden space-y-8">
              {content.discovery.persona.cards.map((card, i) => (
                <div key={i}>
                  <PersonaHeader card={card} c={c} />
                  <PersonaQuote card={card} c={c} />
                  {(
                    [
                      ["ABOUT", card.about],
                      ["NEEDS", card.needs],
                      ["CHALLENGES", card.challenges],
                      ["OPPORTUNITIES", card.opportunities],
                    ] as const
                  ).map(([label, items]) => (
                    <PersonaField key={label} label={label} items={items} c={c} />
                  ))}
                </div>
              ))}
            </div>

            {/* Desktop — row-major grid so About/Needs/Challenges/Opportunities align horizontally across all 4 personas.
                Columns interleave content tracks (1fr) with 1px divider tracks so a single continuous line
                separates each persona, spanning the full height via gridRow: '1 / -1'. */}
            <div
              className="hidden lg:grid gap-x-5 gap-y-3"
              style={{
                gridTemplateColumns: content.discovery.persona.cards.map(() => "1fr").join(" 1px "),
                gridTemplateRows: "repeat(6, auto)",
              }}
            >
              {content.discovery.persona.cards.map((_, i) =>
                i > 0 ? (
                  <div
                    key={`div-${i}`}
                    style={{
                      gridColumnStart: i * 2,
                      gridColumnEnd: i * 2 + 1,
                      gridRowStart: 1,
                      gridRowEnd: -1,
                      backgroundColor: c.border,
                    }}
                  />
                ) : null
              )}
              {content.discovery.persona.cards.map((card, i) => (
                <div key={`head-${i}`} style={{ gridColumn: i * 2 + 1 }}>
                  <PersonaHeader card={card} c={c} />
                </div>
              ))}
              {content.discovery.persona.cards.map((card, i) => (
                <div key={`quote-${i}`} style={{ gridColumn: i * 2 + 1 }}>
                  <PersonaQuote card={card} c={c} />
                </div>
              ))}
              {(["ABOUT", "NEEDS", "CHALLENGES", "OPPORTUNITIES"] as const).map((label) =>
                content.discovery.persona.cards.map((card, i) => (
                  <div key={`${label}-${i}`} style={{ gridColumn: i * 2 + 1 }}>
                    <PersonaField
                      label={label}
                      items={
                        label === "ABOUT"
                          ? card.about
                          : label === "NEEDS"
                          ? card.needs
                          : label === "CHALLENGES"
                          ? card.challenges
                          : card.opportunities
                      }
                      c={c}
                      tight
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Design Process */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.designProcess.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-8" style={{ color: c.body }}>
          <strong style={{ color: c.accent, fontWeight: 700 }}>{content.designProcess.hmwBold}</strong>{" "}
          {content.designProcess.description}
        </p>
        <Card2 className="mb-5">
          <div className="text-sm font-bold mb-5" style={{ color: c.ink }}>
            {content.designProcess.competitiveHeading}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.designProcess.competitive.map((group, i) => (
              <div key={i}>
                <div className="text-sm font-bold mb-2" style={{ color: c.accent }}>{group.heading}</div>
                <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{group.description}</p>
              </div>
            ))}
          </div>
        </Card2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {content.designProcess.referenceImages.map((src, i) => (
            <div
              key={i}
              className="w-full aspect-[4/3] rounded-[20px] overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: c.surface }}
            >
              <img src={src} alt={`Reference ${i + 1}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Solution */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.solution.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6" style={{ color: c.body }}>
          {content.solution.before}
          <strong style={{ color: c.accent, fontWeight: 700 }}>{content.solution.bold}</strong>
          {content.solution.after}
        </p>
      </div>

      {/* Outcome — dark band */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.outcome.kicker}</Kicker>
          <p className="text-sm leading-[1.85] max-w-2xl mt-6 mb-8" style={{ color: c.darkBody }}>
            {content.outcome.description}
          </p>

          <div className="flex rounded-[20px] overflow-hidden mb-3">
            {content.outcome.blueprintImages.map((src, i) => (
              <img key={i} src={src} alt={`Blueprint ${i + 1}`} className="w-1/2 h-auto object-cover" />
            ))}
          </div>
          <figcaption className="text-center text-xs mb-16" style={{ color: c.darkCaption }}>
            {content.outcome.blueprintCaption}
          </figcaption>

          <div className="flex gap-5 mb-3">
            {content.outcome.toolkitImages.map((src, i) => (
              <div key={i} className="w-1/2 rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
                <img src={src} alt={`Toolkit ${i + 1}`} className="w-full h-auto object-contain" />
              </div>
            ))}
          </div>
          <figcaption className="text-center text-xs" style={{ color: c.darkCaption }}>
            {content.outcome.toolkitCaption}
          </figcaption>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.reflection.kicker}</Kicker>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mt-6">
          <p className="text-[15px] leading-[1.85] flex-1" style={{ color: c.body }}>
            {content.reflection.paragraph}
          </p>
          <div className="flex-none w-full md:w-[360px]">
            <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
              <img
                src={content.reflection.image}
                alt={content.reflection.imageCaption}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
              {content.reflection.imageCaption}
            </figcaption>
          </div>
        </div>
      </div>
    </main>
  );
}
