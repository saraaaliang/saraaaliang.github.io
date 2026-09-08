import { useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { c } from "./ui";
import { createInitialDesignerState, designerReducer } from "./designerState";
import DesignerConsole from "./DesignerConsole";

// 設計師端獨立入口——真實產品裡這是 Figma 外掛，跟客戶端（另一個獨立網頁，
// 見 SyncAiClientPage.tsx）完全是兩個系統，中間只靠共用資料連動（見
// decisionModel.ts），沒有任何「切換視角」的按鈕，因為現實中設計師沒有辦法
// 打開接收端的畫面，兩邊本來就是各自獨立打開的。
export default function SyncAiPrototype({
  onNavigate,
}: {
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const [state, dispatch] = useReducer(designerReducer, undefined, createInitialDesignerState);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8" }}>
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pt-28 pb-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate("sync-ai")}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium hover:opacity-70"
          style={{ color: c.body }}
        >
          <ArrowLeft size={15} />
          返回 Sync AI 案例
        </button>

        <div className="flex items-center gap-4">
          <span
            className="text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wide"
            style={{ backgroundColor: c.surface, color: c.muted }}
          >
            設計師端
          </span>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium hover:opacity-70"
            style={{ color: c.muted }}
          >
            <RotateCcw size={13} />
            重新開始
          </button>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-6">
        <p className="text-[13px] leading-[1.7] max-w-2xl" style={{ color: c.muted }}>
          這是 Sync AI 設計師端的獨立示範，實際產品中會是 Figma 外掛，與客戶端（另一個獨立頁面）僅透過共用資料非即時同步。
        </p>
      </div>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key="designer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <DesignerConsole state={state} dispatch={dispatch} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
