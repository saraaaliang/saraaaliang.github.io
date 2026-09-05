// ── Sync AI 互動原型：共用資料模型 ──────────────────────────────────────────
// 設計師端（DesignerConsole）跟客戶端（ClientReview）是兩個獨立的網頁／路由，
// 各自有自己的畫面導覽狀態（見 designerState.ts／clientState.ts），但共用
// 同一份「決策資料」——真實產品裡這份資料活在後端，兩邊前端各自讀寫；這裡
// 沒有後端，用 localStorage 模擬「共用資料庫」：一邊寫入，另一邊重新載入
// （設計師端按「重新整理狀態」／客戶端重新整理頁面）時就會讀到最新版本。
//
// 完整規格見（開始改動前務必重新讀一次，比這份檔案新）：
//   Wireframe: https://claude.ai/code/artifact/1e16b7f3-23a2-4b47-af14-55380cbb024c
//   FR / 架構: https://claude.ai/code/artifact/a2e803f6-04e0-4e88-812b-8355859132a1

export type DecisionStatus =
  | "not_confirmed" // D7 送出後、C 端還沒確認也還沒留言（未閱覽）
  | "commented" // C4 留言但未確認（設計需調整，D8b）
  | "confirmed" // C5／C7 確認（D8／D11 已確認）
  | "affected_by_change"; // D9 模擬變更後，已確認的決策被標記受影響（D10 前）

export interface ClientExplanation {
  whatChanged: string; // 發生了什麼變化
  why: string; // 為什麼
  context: string; // 背景脈絡
}

export interface Decision {
  id: string;
  name: string; // 例：「整體頁面設計」「CTA 視覺層級」
  candidateOrder: number; // D3 候選清單裡的顯示順序
  selectedForGeneration: boolean; // D3 是否被勾選（進入 D4 生成清單）

  designerRationale: string; // 設計師內部語言，D6 審核文字框編輯的對象
  clientExplanation: ClientExplanation; // 轉譯後，C3a/C3b 顯示的三段式說明

  reviewed: boolean; // D6：這一項是否已按下「確認」
  status: DecisionStatus;
  comment: string | null; // C4 送出的留言內容

  confirmedBy: string | null;
  confirmedAt: string | null;

  // D9-D11 版本變更迴圈專用；沒有變更時維持 undefined
  changeNote?: {
    diffSummary: string; // D10「修改差異與其他說明」文字框內容，可編輯
    diffReviewed: boolean; // 對應 D10 → D10b：設計師是否已按「確認」
  };
}

const CANDIDATE_DECISIONS: Omit<
  Decision,
  "selectedForGeneration" | "reviewed" | "status" | "comment" | "confirmedBy" | "confirmedAt"
>[] = [
  {
    id: "overall-layout",
    name: "整體頁面設計",
    candidateOrder: 0,
    designerRationale:
      "把 Checkout 頁面整體版面重新排列，聚焦在單一商品與結帳按鈕，減少不必要的視覺干擾。",
    clientExplanation: {
      whatChanged: "結帳頁面整體版面重新排列，聚焦在單一商品與結帳按鈕。",
      why: "減少不必要的視覺干擾，讓使用者專心完成結帳。",
      context: "根據先前討論，希望降低結帳中途放棄的比例。",
    },
  },
  {
    id: "cta-hierarchy",
    name: "CTA 視覺層級",
    candidateOrder: 1,
    designerRationale:
      "CTA 加大、提高對比，是為了降低使用者猶豫，加快從瀏覽到下單的轉換速度。",
    clientExplanation: {
      whatChanged: "CTA 已被做得更明顯。",
      why: "讓訪客更快看出下一步該做什麼。",
      context: "根據先前討論，希望減少結帳中途放棄。",
    },
  },
  {
    id: "spacing",
    name: "間距調整",
    candidateOrder: 2,
    designerRationale: "調整區塊間距，讓資訊層級更清楚。",
    clientExplanation: {
      whatChanged: "各區塊之間的間距重新調整。",
      why: "讓頁面資訊層級更容易一眼看懂。",
      context: "延續整體頁面重新排列的方向。",
    },
  },
  {
    id: "type-contrast",
    name: "字級對比",
    candidateOrder: 3,
    designerRationale: "調整標題與內文的字級對比，強化閱讀層級。",
    clientExplanation: {
      whatChanged: "標題與內文的字級對比加大。",
      why: "強化頁面的閱讀層級，重點資訊更快被看到。",
      context: "延續整體頁面重新排列的方向。",
    },
  },
];

// 示範資料：4 個候選，預設勾選前 2 個（整體頁面設計、CTA 視覺層級）。
export const initialDecisions: Decision[] = CANDIDATE_DECISIONS.map((d, i) => ({
  ...d,
  selectedForGeneration: i < 2,
  reviewed: false,
  status: "not_confirmed",
  comment: null,
  confirmedBy: null,
  confirmedAt: null,
}));

export function selectedDecisions(decisions: Decision[]): Decision[] {
  return decisions.filter((d) => d.selectedForGeneration);
}

// ── 「共用後端」：用 localStorage 模擬，兩個獨立網頁各自讀寫同一組 key ──────────
const STORAGE_KEY = "sync-ai-prototype:shared-decisions";

export function loadSharedDecisions(): Decision[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialDecisions;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialDecisions;
  } catch {
    return initialDecisions;
  }
}

export function saveSharedDecisions(decisions: Decision[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  } catch {
    // localStorage 不可用（例如無痕模式關閉儲存）就放棄同步，示範仍可繼續跑，只是兩邊看不到彼此的更新。
  }
}

export function resetSharedDecisions(): Decision[] {
  saveSharedDecisions(initialDecisions);
  return initialDecisions;
}
