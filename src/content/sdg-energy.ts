// ── SDGs 能源互動體驗設計 — Case Study Content ──────────────────────────────
// All copy and image references for the SDG Energy case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/SdgEnergyCaseStudy.tsx) to change content.

import cover from "./images/sdg-energy/cover.png";
import oldDesign from "./images/sdg-energy/old-design.png";
import usabilityTestPhoto from "./images/sdg-energy/usability-test-photo.png";
import impactOutcomeScreens from "./images/sdg-energy/impact-outcome-screens.png";
import onboardingStep1 from "./images/sdg-energy/onboarding-step-1.png";
import onboardingStep2 from "./images/sdg-energy/onboarding-step-2.png";
import onboardingStep3 from "./images/sdg-energy/onboarding-step-3.png";
import onboardingStep4 from "./images/sdg-energy/onboarding-step-4.png";
import dashboardExperience from "./images/sdg-energy/dashboard-experience.png";
import version1Screen from "./images/sdg-energy/version-1-screen.png";
import version1GestureNote from "./images/sdg-energy/version-1-screen-1.png";
import version2Screen from "./images/sdg-energy/version-2-screen.png";
import version3Screen from "./images/sdg-energy/version-3-screen.png";

export type IconKey = "target" | "check" | "people" | "compass" | "lightbulb";

export interface SdgEnergyContent {
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
    exhibition: string;
    coverImage: string;
    coverAlt: string;
    pagePhoto: string;
    pagePhotoAlt: string;
  };
  impact: {
    kicker: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
    image: string;
    imageCaption: string;
  };
  problem: {
    kicker: string;
    image: string;
    imageCaption: string;
    description: string;
    users: {
      label: string;
      groupName: string;
      traits: string[];
    };
  };
  discovery: {
    kicker: string;
    cards: Array<{ icon: IconKey; heading: string; body: string }>;
  };
  designProcess: {
    kicker: string;
    problemCore: { before: string; bold: string };
    decisions: Array<{ heading: string; result: string }>;
    versions: Array<{
      version: string;
      description: string;
      image?: string;
      imageCaption?: string;
    }>;
    engineerNote: { before: string; emphasis: string; after: string; image: string; imageCaption: string };
  };
  outcome: {
    kicker: string;
    description: string;
    onboarding: {
      heading: string;
      points: Array<{ title: string; body: string }>;
      steps: Array<{ src: string; caption: string }>;
    };
    experience: {
      heading: string;
      points: Array<{ title: string; body: string }>;
      image: string;
      imageSteps: string[];
    };
  };
  reflection: {
    kicker: string;
    paragraph: string;
    projectValue: Array<{ label: string; text: string }>;
  };
}

export const sdgEnergyContent: SdgEnergyContent = {
  meta: {
    id: "sdg-energy",
    titleZh: "Exhibition Design · SDGs 能源互動體驗設計",
    year: "2021",
  },

  hero: {
    kicker: "Case Study",
    title: "SDGs 能源互動體驗設計",
    tags: ["實體觸控體驗", "易用性測試", "3週落地"],
    description:
      "識別舊有版本用戶痛點，重新設計體驗流程與架構。成功解決用戶中途離開問題，優化體驗易用性，增加親子族群對能源的認識。",
    role: "UI/UX 設計師",
    focus: "易用性研究 · 互動介面設計 · 跨部門協作",
    exhibition:
      "展出於 2021 台灣永續行動週（Taiwan SDGs Action Days）· 國父紀念館及中山公園廣場 · 主辦：立法院聯合國永續發展目標策進會、國立國父紀念館 · 承辦：紙風車文教基金會",
    coverImage: cover,
    coverAlt: "封面照片 — SDGs 能源互動體驗設計，展場觸控裝置",
    pagePhoto: usabilityTestPhoto,
    pagePhotoAlt: "展覽現場實際操作 — 親子一同體驗互動裝置",
  },

  impact: {
    kicker: "Impact",
    stats: [
      {
        icon: "compass",
        title: "上手引導更清楚",
        description: "觀眾詢問如何操作的次數明顯降低。",
      },
      {
        icon: "check",
        title: "超過90%觀眾完成體驗",
        description: "展覽期間現場觀察與工作人員回饋顯示，使用者中途放棄的狀況大幅減少。",
      },
      {
        icon: "people",
        title: "團隊後續採用",
        description: "以此版本作為後續同類互動體驗的設計原型。",
      },
    ],
    image: impactOutcomeScreens,
    imageCaption: "改版後的完整體驗流程：首頁 → 操作說明動畫 → 遊戲畫面 → 任務結果",
  },

  problem: {
    kicker: "Problem",
    image: oldDesign,
    imageCaption: "舊版設計",
    description:
      "這是前一屆專案團隊留下的展覽觸控裝置。舊版能源互動在另一個展覽現場實際使用時，觀眾出現操作不確定、中途放棄的狀況，因此這次改版由我接手，重新檢視體驗流程與介面設計。",
    users: {
      label: "Users",
      groupName: "親子族群",
      traits: ["多為非技術背景民眾", "停留時間短（約 10 秒 ~ 1 分鐘）"],
    },
  },

  discovery: {
    kicker: "Discovery",
    cards: [
      {
        icon: "compass",
        heading: "定點觀察",
        body: "我在展覽現場進行約 30 分鐘的觀察，發現圍觀民眾大多以「隨機按按看會發生什麼事」的探索方式操作，沒有明確遊戲目標與行動。",
      },
      {
        icon: "people",
        heading: "前專案核心成員訪問",
        body: "為了驗證此觀察，我進一步訪問了前案的 PM 與工程師，確認舊版上線期間，觀眾探索性質高，常有中途離開、未完成任務的狀況。",
      },
      {
        icon: "lightbulb",
        heading: "進行假設",
        body: "我判斷核心問題除了畫面資訊量的視覺呈現，也可提供使用者更明確的行動目標，讓他們知道該做什麼、什麼時候須完成體驗。",
      },
    ],
  },

  designProcess: {
    kicker: "Design Rationale",
    problemCore: {
      before: "🎯問題核心：缺乏明確目標感　➡️",
      bold: "需重新設計體驗的目標與結構",
    },
    decisions: [
      { heading: "加入「限時」機制", result: "給使用者明確的行動誘因" },
      { heading: "定義清楚的成功／失敗畫面", result: "讓使用者知道自己是否操作正確" },
      { heading: "搭配資料視覺化簡化 & 互動手勢優化", result: "降低認知與操作負擔" },
    ],
    versions: [
      {
        version: "Version 1",
        description:
          "我原先設定的操作方式，是以翻轉指針的旋鈕手勢來控制三座電廠的發電量。但這個做法需要工程師耗費大量時間修改舊版程式。",
        image: version1Screen,

      },
      {
        version: "Version 2",
        description:
          "操作方式改為符合工程師開發限制的左右滑動手勢，但整體畫面顯得較為單調枯燥，因此我嘗試修正主要顯示面板的視覺呈現。",
        image: version2Screen,
    
      },
      {
        version: "Version 3",
        description:
          "我發現「儀表板」是能更清楚展示數據的呈現方式。與團隊討論後，決定以此概念發展最終介面。",
        image: version3Screen,
      },
    ],
    engineerNote: {
      before: "工程師建議延用舊版的旋轉手勢以節省開發時間，但經實際觀測發現旋轉操作對使用者來說不夠直覺，",
      emphasis: "改用拖曳滑動的方式能更輕鬆操作",
      after: "。",
      image: version1GestureNote,
      imageCaption: "手勢建議：舊版旋轉手勢 → 改為拖曳滑動",
    },
  },

  outcome: {
    kicker: "Outcome",
    description:
      "在 3 週的時程與技術限制下，與工程師和 PM 共同產出落地新版本。迭代 3 版主要設計、進行 4 輪易用性測試（邀請內部跨部門夥伴測試，觀察操作是否順暢、有無困惑點，依據回饋持續調整）。",
    onboarding: {
      heading: "遊戲前介紹畫面",
      points: [
        { title: "重構使用流程", body: "重新拆解任務，給使用者明確的行動路徑。" },
        {
          title: "步驟動態化",
          body: "在遊戲前加入短動畫示範，縮短上手時間；經過測試及訪問後用戶了解「如何操作」的比例提高。",
        },
      ],
      steps: [
        { src: onboardingStep1, caption: "Step 1：提示使用者調整滑桿以修改電廠發電量" },
        { src: onboardingStep2, caption: "Step 2：發電比例過高或過低時會出現警示" },
        { src: onboardingStep3, caption: "Step 3：碳排放比例超過 30% 時的警示畫面" },
        { src: onboardingStep4, caption: "Step 4：完成引導後即可開始遊戲" },
      ],
    },
    experience: {
      heading: "遊戲體驗畫面",
      points: [
        { title: "資料視覺化", body: "儀表板設計簡潔圖表呈現排放與發電來源，將複雜數據一目了然。" },
        { title: "直覺互動手勢", body: "將順逆時鐘手勢改為左右滑動操作，降低操作負擔。" },
        { title: "正向視覺回饋", body: "加入微動畫與文字回饋，讓使用者知道自己是否操作正確。" },
      ],
      image: dashboardExperience,
      imageSteps: [
        "Step 1　今日所需發電量：提示使用者今天要達成的發電目標",
        "Step 2　目前發電量：即時顯示目前發電數值",
        "Step 3　情緒回饋：操作不同電廠時會出現對應表情動畫",
        "Step 4　燃煤警示：燃煤發電比例過高時顯示警示",
        "Step 5　電力已平衡：達到目標發電量時燈號亮起",
      ],
    },
  },

  reflection: {
    kicker: "Reflection",
    paragraph:
      "很感謝同團隊的工程師和 PM，在我發現問題後，願意在短時間內一起反覆測試、修改版本，並依照當下可執行的開發方式進行設計優化，做出在有限時間內真正能落地的方案。這個專案也讓我重視易用性測試的必要性，因為是觸控面板的緣故，在察覺痛點的時候非常倚靠實際觀察，像是：使用者操作時的手勢與目光搜尋的行為，往往比他們說出的心得更能反映出真正的痛點。",
    projectValue: [
      { label: "我的核心能力", text: "將複雜技術或數據轉化為清晰的互動模式" },
      { label: "跨部門協作", text: "產出規格說明並與工程師協作" },
      { label: "相關應用", text: "適用於 AI 儀表板、數據視覺化與企業使用者上手流程設計等" },
    ],
  },
};
