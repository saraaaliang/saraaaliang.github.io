import { useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { c } from "./ui";
import { createInitialClientState, clientReducer } from "./clientState";
import ClientReview from "./ClientReview";

// 客戶端獨立入口——真實產品裡這是接收端在任何瀏覽器打開的純網頁連結，不用
// 下載 App，也看不到設計師端的畫面或操作。跟設計師端（SyncAiPrototype.tsx）
// 完全是兩個獨立系統，只靠共用資料連動（見 decisionModel.ts）：設計師端送出
// 審查連結後，這裡讀到的就是最新內容；這裡確認或留言之後，設計師端要按
// 「重新整理狀態」才會看到，不是即時互相推播。
export default function SyncAiClientPage({
  onNavigate,
}: {
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const [state, dispatch] = useReducer(clientReducer, undefined, createInitialClientState);

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
            客戶端
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

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key="client"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ClientReview state={state} dispatch={dispatch} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
