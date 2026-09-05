import { useEffect, useId, useState } from "react";
import { Check } from "lucide-react";
import type { DecisionStatus } from "./decisionModel";

// 沿用既有案例頁的 Version C 色票（見 CLAUDE.md），另外補幾個 prototype 專用的狀態色。
export const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  accentLight: "#cdec8e",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
  amber: "#9a6b12",
  amberLight: "#f6ecd2",
  blue: "#1d4ed8",
  blueLight: "#e3ebfd",
};

const STATUS_MAP: Record<DecisionStatus, { label: string; fg: string; bg: string }> = {
  not_confirmed: { label: "未確認", fg: c.muted, bg: c.surface },
  commented: { label: "設計需調整", fg: c.amber, bg: c.amberLight },
  confirmed: { label: "已確認", fg: c.accent, bg: c.accentLight },
  affected_by_change: { label: "需要重新確認", fg: c.amber, bg: c.amberLight },
};

export function StatusBadge({ status, meta }: { status: DecisionStatus; meta?: string }) {
  const s = STATUS_MAP[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{ backgroundColor: s.bg, color: s.fg }}
      >
        {s.label}
      </span>
      {meta && (
        <span className="text-[11px]" style={{ color: c.muted }}>
          {meta}
        </span>
      )}
    </span>
  );
}

// 掃描 / AI 生成都共用這個元件，只是傳進去的 items 不同。
export function LoadingChecklist({ items, onDone }: { items: string[]; onDone: () => void }) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setDoneCount(0);
    const timers: number[] = items.map((_, i) =>
      window.setTimeout(() => setDoneCount(i + 1), 420 + i * 460)
    );
    const finishTimer = window.setTimeout(onDone, 420 + items.length * 460 + 420);
    timers.push(finishTimer);
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="space-y-2.5">
      {items.map((label, i) => {
        const isDone = i < doneCount;
        return (
          <div
            key={label}
            className="flex items-center gap-2.5 text-[13px] transition-colors duration-300"
            style={{ color: isDone ? c.ink : c.muted }}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
              style={{ backgroundColor: isDone ? c.accentLight : c.border }}
            >
              {isDone && <Check size={10} strokeWidth={3} color={c.accent} />}
            </span>
            {label}
          </div>
        );
      })}
    </div>
  );
}

// D3（勾選候選項目）／狀態顯示（D8b／D9／D10／D11）共用的「圓點 + 標籤」列。
// interactive 時渲染成真的 button（可鍵盤操作、有 aria-pressed）；非 interactive 時純顯示狀態。
export function CheckRow({
  label,
  done,
  interactive = false,
  dimmed = false,
  onToggle,
  detail,
}: {
  label: string;
  done: boolean;
  interactive?: boolean;
  dimmed?: boolean;
  onToggle?: () => void;
  detail?: string;
}) {
  const dot = (
    <span
      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-[1px]"
      style={{ backgroundColor: done ? c.accentLight : "transparent", border: done ? "none" : `1.5px solid ${c.border}` }}
    >
      {done && <Check size={10} strokeWidth={3} color={c.accent} />}
    </span>
  );

  const content = (
    <>
      {dot}
      <span className="text-left">
        <span
          className="text-[13px] block"
          style={{ color: dimmed ? c.muted : c.ink, fontWeight: done || interactive ? 600 : 400 }}
        >
          {label}
        </span>
        {detail && (
          <span className="text-[12px] block mt-0.5" style={{ color: c.body }}>
            {detail}
          </span>
        )}
      </span>
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        className="w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:opacity-80"
        style={{ backgroundColor: c.surface, opacity: dimmed ? 0.55 : 1 }}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex items-start gap-2.5 py-1.5" style={{ opacity: dimmed ? 0.55 : 1 }}>
      {content}
    </div>
  );
}

// D6／D10 共用：AI 生成文字的審核框，文字框跟「編輯」「確認」按鈕做成同一個元件。
export function EditConfirmBox({
  label,
  value,
  confirmed,
  onChange,
  onConfirm,
}: {
  label: string;
  value: string;
  confirmed: boolean;
  onChange: (v: string) => void;
  onConfirm: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const fieldId = useId();

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={fieldId} className="text-[12px] font-semibold" style={{ color: c.ink }}>
            {label}
          </label>
          {confirmed && !editing && (
            <span className="text-[11px] font-medium" style={{ color: c.accent }}>
              已確認
            </span>
          )}
        </div>
        <textarea
          id={fieldId}
          value={value}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full text-[13px] leading-[1.6] resize-none outline-none bg-transparent"
          style={{ color: c.body }}
        />
      </div>
      <div className="flex" style={{ borderTop: `1px solid ${c.border}` }}>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="flex-1 py-2.5 text-[12px] font-medium hover:bg-black/[0.02] transition-colors"
          style={{ color: c.body, borderRight: `1px solid ${c.border}` }}
        >
          {editing ? "完成編輯" : "編輯"}
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(false);
            onConfirm();
          }}
          disabled={confirmed}
          className="flex-1 py-2.5 text-[12px] font-semibold hover:bg-black/[0.02] transition-colors disabled:opacity-40"
          style={{ color: c.accent }}
        >
          確認
        </button>
      </div>
    </div>
  );
}

// C3a/C3b「發生了什麼變化」底下的迷你畫面縮圖，也給設計師端「預覽接收端頁面」共用：
// 頂部一條瀏覽器列（三個小圓點）＋版面線條＋一個深灰色 CTA 色塊。C3b／CTA 視覺層級
// 這項的 CTA 刻意做得比其他項大、邊框更明顯，呼應這個決策本身在講的事。
export function MiniPagePreview({ ctaEmphasis }: { ctaEmphasis: boolean }) {
  return (
    <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ height: 96, backgroundColor: c.surface }}>
      <div
        className="h-[13px] flex items-center gap-1 px-2"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: c.muted }} />
        <span className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: c.muted }} />
        <span className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: c.muted }} />
      </div>
      <div className="flex flex-col items-center gap-1.5 pt-2.5">
        <div
          className="rounded"
          style={{ width: "70%", height: ctaEmphasis ? 19 : 24, backgroundColor: c.border, opacity: ctaEmphasis ? 0.5 : 0.6 }}
        />
        <div className="rounded-full" style={{ width: "40%", height: 5, backgroundColor: c.border }} />
        <div
          className="rounded-full mt-1"
          style={
            ctaEmphasis
              ? { padding: "7px 26px", backgroundColor: "#555555", border: `2px solid ${c.border}` }
              : { padding: "4px 18px", backgroundColor: "#555555" }
          }
        />
      </div>
    </div>
  );
}
