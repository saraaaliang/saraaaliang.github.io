// ── Sync AI：語意轉譯工具設計 — Case Study Content ──────────────────────────
// All copy and image references for the Sync AI case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/SyncAiCaseStudy.tsx) to change content.
//
// Status note: unlike the other case studies, this project has not shipped —
// it's a 5-day research-to-wireframe sprint that ends on an open question
// (see `openQuestion`), not a resolved outcome. Keep that framing when editing.

import cover from "./images/sync-ai/cover.png";
import surveyOverview from "./images/sync-ai/survey-overview.png";
import pluginOverview from "./images/sync-ai/plugin-overview.png";
import problemSurveyFrustration from "./images/sync-ai/problem-survey-frustration.png";
import userFlowDiagram from "./images/sync-ai/user-flow-diagram.png";
import designerWireframeVisualComm from "./images/sync-ai/designer-wireframe-visual-comm.png";
import designerWireframeSpecCheck from "./images/sync-ai/designer-wireframe-spec-check.png";
import clientMobileSteps from "./images/sync-ai/client-mobile-5steps.png";

export type IconKey = "alert" | "lightbulb" | "chat" | "people" | "check" | "target" | "compass";

export interface SyncAiContent {
  meta: {
    id: string;
    titleZh: string;
    year: string;
  };
  hero: {
    kicker: string;
    title: string;
    tags: string[];
    description: string;
    role: string;
    focus: string;
    coverImage: string;
    coverAlt: string;
  };
  keyInsight: {
    kicker: string;
    intro: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
  };
  problem: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
    why: { before: string; emphasis: string; after: string };
    images: Array<{ image: string; caption: string }>;
  };
  discovery: {
    kicker: string;
    persona: {
      label: string;
      description: string;
      cards: Array<{
        emoji: string;
        name: string;
        tag: string;
        traits: string[];
        quote: string;
        aiRole: string;
      }>;
    };
    journey: {
      heading: string;
      description: string;
      steps: Array<{ step: number; actor: string; emoji: string; action: string; detail: string }>;
    };
  };
  designRationale: {
    kicker: string;
    intro: string;
    flowImage: string;
    flowImageCaption: string;
    features: Array<{ heading: string; insight: string }>;
  };
  solution: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
    modeCompareHeading: string;
    modeCompare: Array<{ heading: string; items: string[] }>;
    screens: Array<{ image: string; caption: string }>;
  };
  openQuestion: {
    kicker: string;
    intro: string;
    forkBold: string;
    forkAfter: string;
    testPlanHeading: string;
    testPlanItems: string[];
    sprintTimeline: Array<{ day?: string; title: string; items: string[] }>;
    roadmap: Array<{ heading: string; items: string[] }>;
  };
}

export const syncAiContent: SyncAiContent = {
  meta: {
    id: "sync-ai",
    titleZh: "AI Product Design · Sync AI 語意轉譯工具設計",
    year: "2026",
  },

  hero: {
    kicker: "Case Study",
    title: "Sync AI：語意轉譯工具設計",
    tags: ["使用者研究", "問卷數據洞察", "0-1 功能發想", "AI 產品設計"],
    description:
      "接案設計師常在交付設計時，因為與客戶缺乏共同理解，反覆面對超出預期的修改要求。Sync AI 是一款 Figma 插件構想：協助設計師把視覺決策轉譯成客戶聽得懂的語言，並提供完整的線上確認流程，取代在通訊軟體上來回拉扯的溝通方式。",
    role: "Lead UX 設計師",
    focus: "0-1 產品定義 · 使用者研究 · AI 功能設計",
    coverImage: cover,
    coverAlt: "Sync AI Figma 插件介面示意，顯示語意轉譯與規格檢測功能",
  },

  keyInsight: {
    kicker: "Key Insight",
    intro:
      "5 天內完成使用者研究、痛點驗證與初步 Wireframe，目標是釐清「AI 轉譯」這個功能方向，是否真的能提升接案設計師與客戶之間的溝通效率。以下數據來自 12 份有效問卷回應。",
    stats: [
      {
        icon: "alert",
        title: "66% 曾因誤解而重工",
        description:
          "「改稿次數超出預期：對方理解有誤，導致產出完全不對，又要重來」——66% 的受訪設計師對此感到心累。",
      },
      {
        icon: "lightbulb",
        title: "58% 希望有專業轉譯介入",
        description: "超過半數的接案設計師，希望能有「專業轉譯」角色，協助把設計語言轉換成客戶聽得懂的說法。",
      },
      {
        icon: "chat",
        title: "落差不只是資訊落差",
        description: "跨領域溝通的根本問題，是雙方對「完成」的定義從未真正對齊過，而不只是單純的用詞不同。",
      },
    ],
  },

  problem: {
    kicker: "Problem",
    before:
      "「與客戶/協作者的溝通摩擦」是接案設計師壓力來源之一。除了線上資料搜集，我也規劃了一份問卷了解接案設計師的背景和困擾，收到 12 份有效回應。核心洞察指出，",
    bold: "缺乏共同理解導致的反覆修改",
    after: "，往往不是因為設計本身不好，而是雙方在過程中沒有建立起共同的判斷依據。",
    why: {
      before: "更深一層看，",
      emphasis: "設計師在缺乏回饋與決策依據的情況下，必須獨自承擔設計決策風險",
      after:
        "——這也是為什麼「接案設計師的成長」不只是技能提升，而是從「執行設計」轉向「設計整個合作方式」，包含如何定義溝通、設定界線與選擇客戶。",
    },
    images: [
      {
        image: surveyOverview,
        caption: "問卷全貌：《給自由工作者的邀請》一起定義未來的「零摩擦」協作模式",
      },
      {
        image: problemSurveyFrustration,
        caption:
          "問卷第 6 題：「哪種狀況最讓你感到『心累』？」12 則回應中，66.7% 選擇「改稿次數超出預期：對方理解有誤，導致產出完全不對，又要重來」",
      },
    ],
  },

  discovery: {
    kicker: "Discovery",
    persona: {
      label: "Persona",
      description: "歸納出 3 個代表性人物的痛點，以及 AI 可以介入、幫助他們的地方。",
      cards: [
        {
          emoji: "🐣",
          name: "接案新手",
          tag: "剛接案 / 轉職",
          traits: ["剛接案 / 轉職", "容易被客戶帶著走"],
          quote: "做了一堆，最後被刪光光，實際露出的內容變得很少。",
          aiRole: "AI 角色介入：Mentor，協助判斷、補足專業規範。",
        },
        {
          emoji: "🧑",
          name: "斜槓接案者",
          tag: "斜槓 / 中階（最多人）",
          traits: ["斜槓 / 中階（最多人）", "有能力，但溝通過程不順暢"],
          quote: "溝通不夠清楚，導致成果與預期有巨大落差，應提供更明確的 ref 作為參考。",
          aiRole: "AI 角色介入：提升溝通效率，協助攔截無效修改。",
        },
        {
          emoji: "🧔",
          name: "全職接案者",
          tag: "全職接案",
          traits: ["全職接案", "發生過因溝通造成的砍案狀況", "開始建立自己的接案規則"],
          quote: "問題不是難溝通，會去評估這種溝通值不值得我花時間。",
          aiRole: "AI 角色介入：提升個人專業，將溝通變成一種「可收費的產品」。",
        },
      ],
    },
    journey: {
      heading: "User Journey",
      description: "完整狀態下的使用者情境：從設計師完成初步設計，到客戶確認、設計師收到通知的完整循環。",
      steps: [
        { step: 1, actor: "設計師", emoji: "🎨", action: "完成初步設計", detail: "在 Figma 上完成初步設計版本" },
        { step: 2, actor: "設計師", emoji: "📤", action: "交稿前", detail: "點擊「Sync AI 語意同步插件」" },
        {
          step: 3,
          actor: "設計師",
          emoji: "🤖",
          action: "開啟 Plugin 並操作",
          detail: "插件「掃描」畫面，AI 根據圖層屬性自動產出說明文字",
        },
        { step: 4, actor: "設計師", emoji: "🔗", action: "傳送連結", detail: "點擊「分享連結」，傳送至 LINE / Slack" },
        {
          step: 5,
          actor: "客戶",
          emoji: "💬",
          action: "桌機 / 手機端瀏覽 & 操作",
          detail: "逐點瀏覽細部設計說明，確認無誤或標註修改建議",
        },
        { step: 6, actor: "設計師", emoji: "✅", action: "收到通知", detail: "收到設計已確認通知，或收到設計調整建議清單" },
      ],
    },
  },

  designRationale: {
    kicker: "Design Rationale",
    intro:
      "Sync AI 如何介入接案設計師既有的工作流：平面或插畫師可以直接進入「視覺溝通模式」，享受 AI 語境轉譯帶來的溝通便利；UI 設計師則能加開「開發交付模式」，用 AI 檢測確保 Spec 完備。「設計確認」功能的用意，是避免雙方一直在通訊軟體上來回溝通畫面的狀況。",
    flowImage: userFlowDiagram,
    flowImageCaption:
      "Sync AI 完整流程：設計師啟用插件 → AI 自動掃描規格與狀態 → 依交付對象選擇轉譯模式 → 客戶端確認或標註建議 → 設計師收到核准通知",
    features: [
      { heading: "功能 1・客戶轉譯", insight: "溝通誤解導致的反覆修改，往往源於缺乏共識。" },
      { heading: "功能 2・策略補充", insight: "在缺乏回饋與決策依據的情況下，必須獨自承擔設計決策風險。" },
      {
        heading: "功能 3・規格檢測",
        insight: "接案設計師如何更專業、有策略地從「執行設計」轉向「設計整個合作方式」。",
      },
    ],
  },

  solution: {
    kicker: "Solution",
    before: "設計師端的核心功能是「視覺溝通模式」，涵蓋",
    bold: "設計理念、行銷、UX 策略的轉譯",
    after:
      "；次要功能則是「開發交付模式」下的規格檢測，提供簡單的技術備註生成——但重點不在數據（Px/Hex），而在「技術決策的解釋」。",
    modeCompareHeading: "兩種模式功能對照",
    modeCompare: [
      {
        heading: "視覺溝通模式",
        items: ["無掃描按鈕", "無 Spec 診斷區", "客戶 + PM Tab（共 2 個）", "適合廣告 / 文宣 / 品牌"],
      },
      {
        heading: "開發交付模式",
        items: ["掃描並檢測按鈕", "Spec 診斷結果區", "客戶 + PM + 工程師 Tab（共 3 個）", "適合 UI / Web 產品"],
      },
    ],
    screens: [
      {
        image: pluginOverview,
        caption: "插件總覽：啟用後先選擇工作模式，決定工作流程與可用功能",
      },
      {
        image: designerWireframeVisualComm,
        caption: "設計師端：視覺溝通模式，AI 依圖層屬性自動產出客戶語言與策略說明",
      },
      {
        image: designerWireframeSpecCheck,
        caption: "設計師端：開發交付模式，AI 掃描規格缺漏並提供自動補齊建議",
      },
      {
        image: clientMobileSteps,
        caption: "客戶端手機審查流程：接收連結 → 設計概覽 → 詳細審查 → 標註建議 → 確認定稿",
      },
    ],
  },

  openQuestion: {
    kicker: "Open Question",
    intro:
      "Sync AI專案仍在產品開發與測試階段。5 天衝刺已完成前期痛點研究、需求定義與 Wireframe，下一步將驗證產品範圍（Product Scope）的取捨：",
    forkBold: "核心問題：是否保留「客戶端確認閉環」，還是把範圍收斂成只做「AI 生成解釋」？",
    forkAfter:
      "此決定會直接影響 Sync AI 在通用 AI 工具（如 Figma MCP + Claude Code）逐漸普及之後，是否還有開發必要。如果只做解釋產出，價值主張會更接近可被取代的「文字生成」；如果保留確認閉環，才真正解決研究裡驗證出的「反覆修改」問題。",
    testPlanHeading: "驗證方法：MVP開發測試",
    testPlanItems: [
      "A版：AI Explanation — 設計師將 AI 生成的設計說明分享至既有 LINE／Slack 流程，驗證「僅提供 AI 解釋設計稿」的價值。",
      "B版：AI Explanation + Confirmation Loop — 建立「分享連結 → 客戶逐項確認 → 即時通知設計師」的完整確認流程，驗證閉環機制是否能降低溝通成本。",
      "再追蹤 A、B 兩版的改稿次數與來回溝通次數，用數據決定產品範圍。",
    ],
    sprintTimeline: [
      {
        day: "Day 1",
        title: "專案啟動",
        items: ["釐清專案目標", "定義核心問題", "確認衡量指標與成功指標"],
      },
      {
        day: "Day 1–2",
        title: "痛點研究",
        items: ["客戶與設計師訪談", "現有流程觀察", "痛點與需求歸納"],
      },
      {
        day: "Day 2–3",
        title: "洞察與機會點",
        items: ["整理關鍵洞察", "定義設計機會點", "優先排序"],
      },
      {
        day: "Day 3–4",
        title: "概念發想",
        items: ["整理解決方案", "定製流程草圖", "功能優先級排序"],
      },
      {
        day: "Day 4–5",
        title: "Wireframe",
        items: ["繪製低保真 Wireframe", "設計關鍵流程與頁面"],
      },
      {
        title: "原型開發",
        items: ["A 版：僅 AI 解釋", "B 版：含確認閉環", "建立可操作的薄型 Prototype"],
      },
      {
        title: "真實測試",
        items: ["邀請設計師與真實客戶參與", "進行實際需求確認流程"],
      },
      {
        title: "數據收集與分析",
        items: ["追蹤改稿次數", "來回溝通次數", "確認所需時間", "首次確認成功率", "主觀滿意度"],
      },
      {
        title: "決策與下一步",
        items: ["分析 A/B 結果", "決定產品範圍", "規劃開發路線圖"],
      },
    ],
    roadmap: [
      {
        heading: "易用性",
        items: ["前期測試：驗證 AI 生成的精確度，確保數據符合邏輯", "極端場景測試：進行不同情境下的壓力測試"],
      },
      {
        heading: "技術可行性 & 資安",
        items: ["效能評估：評估 AI 掃描大型 Figma 檔案的延遲問題", "資安議題：確保 AI 處理過程符合隱私規範，建立用戶信任"],
      },
      {
        heading: "數據追蹤優化功能",
        items: ["追蹤客戶開啟連結後的停留點與瀏覽路徑", "透過量化數據確定用戶痛點，轉化為 UX 優化方式"],
      },
    ],
  },
};
