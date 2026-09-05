// ── 客戶端狀態機（C1-C5）────────────────────────────────────────────────
// 客戶端是完全獨立的網頁：載入時讀一次共用資料當初始內容，之後客戶按確認／
// 送出建議會立刻寫回共用資料（真實世界裡這就是打 API 更新後端），設計師端
// 要靠「重新整理狀態」才看得到，不是即時推播。
import { type Decision, loadSharedDecisions, saveSharedDecisions, selectedDecisions } from "./decisionModel";

export type ClientFlow =
  | "client_invite" // C1
  | "client_overview" // C2
  | "client_detail" // C3a / C3b（用 clientCursor 決定顯示第幾項）
  | "client_comment" // C4
  | "client_confirmed"; // C5

export interface ClientState {
  flow: ClientFlow;
  decisions: Decision[];
  clientCursor: number; // C3a/C3b 逐項查看到第幾個
}

export function createInitialClientState(): ClientState {
  return {
    flow: "client_invite",
    decisions: loadSharedDecisions(),
    clientCursor: 0,
  };
}

export type ClientAction =
  | { type: "CLIENT_START_REVIEW" } // C1 → C2
  | { type: "CLIENT_START_DETAIL" } // C2 → C3a（clientCursor 歸零）
  | { type: "SET_CLIENT_CURSOR"; index: number } // 「‹ N/M ›」自由左右切換，跟確認狀態無關
  | { type: "CLIENT_CONFIRM_CURRENT" } // 全部項目都確認後自動進 C5，並立刻寫回共用資料
  | { type: "CLIENT_OPEN_COMMENT" }
  | { type: "CLIENT_SUBMIT_COMMENT"; text: string }
  | { type: "CLIENT_COMMENT_DONE_RETURN" } // C4 → 回到 C3b 繼續
  | { type: "RESET" };

export function clientReducer(state: ClientState, action: ClientAction): ClientState {
  switch (action.type) {
    case "CLIENT_START_REVIEW":
      return { ...state, flow: "client_overview" };

    case "CLIENT_START_DETAIL":
      return { ...state, flow: "client_detail", clientCursor: 0 };

    case "SET_CLIENT_CURSOR": {
      const selected = selectedDecisions(state.decisions);
      const clamped = Math.max(0, Math.min(action.index, selected.length - 1));
      return { ...state, clientCursor: clamped };
    }

    case "CLIENT_CONFIRM_CURRENT": {
      const selected = selectedDecisions(state.decisions);
      const current = selected[state.clientCursor];
      if (!current) return state;
      const decisions = state.decisions.map((d) =>
        d.id === current.id
          ? { ...d, status: "confirmed" as const, confirmedBy: "接收端", confirmedAt: "剛剛" }
          : d
      );
      saveSharedDecisions(decisions);
      // 跟 D6 一樣，確認不會自動前進到下一項——導覽完全交給 ‹ › 自由切換；
      // 全部項目都確認過才自動進 C5，不管是從第幾項確認完成的。
      const allConfirmed = selectedDecisions(decisions).every((d) => d.status === "confirmed");
      return { ...state, decisions, flow: allConfirmed ? "client_confirmed" : state.flow };
    }

    case "CLIENT_OPEN_COMMENT":
      return { ...state, flow: "client_comment" };

    case "CLIENT_SUBMIT_COMMENT": {
      const selected = selectedDecisions(state.decisions);
      const current = selected[state.clientCursor];
      if (!current) return state;
      const decisions = state.decisions.map((d) =>
        d.id === current.id ? { ...d, status: "commented" as const, comment: action.text } : d
      );
      saveSharedDecisions(decisions);
      return { ...state, decisions };
    }

    case "CLIENT_COMMENT_DONE_RETURN":
      return { ...state, flow: "client_detail" };

    case "RESET":
      // 客戶端的「重新開始」只重置自己畫面的導覽位置，不動共用資料——
      // 現實中客戶沒有權限重置設計師那邊的資料，只能重新看一次自己這邊的畫面。
      return { ...createInitialClientState(), decisions: state.decisions };

    default:
      return state;
  }
}
