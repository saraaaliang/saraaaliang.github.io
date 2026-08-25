// ── Sharing Time — Case Study Content ──────────────────────────────────────
// All copy and image references for the Sharing Time case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/SharingTimeCaseStudy.tsx) to change content.

import cover from "./images/sharing-time/cover.png";
import discoveryPhase1Chart from "./images/sharing-time/discovery-phase1-chart.png";
import discoveryPhase1LeveragePoints from "./images/sharing-time/discovery-phase1-leverage-points.png";
import discoveryPhase2Workshop from "./images/sharing-time/discovery-phase2-workshop.png";
import discoveryPhase2Results from "./images/sharing-time/discovery-phase2-results.png";
import decisionRef1 from "./images/sharing-time/decision-ref-1.png";
import decisionRef2 from "./images/sharing-time/decision-ref-2.png";
import outcomeBlueprintLeft from "./images/sharing-time/outcome-blueprint-left.png";
import outcomeBlueprintRight from "./images/sharing-time/outcome-blueprint-right.png";
import outcome1 from "./images/sharing-time/outcome1.png";
import outcome2 from "./images/sharing-time/outcome2.png";
import mobile1 from "./images/sharing-time/mobile-1.mp4";
import mobile2 from "./images/sharing-time/mobile-2.mp4";
import mobile3 from "./images/sharing-time/mobile-3.mp4";
import mobile4 from "./images/sharing-time/mobile-4.mp4";
import reflectionPhoto from "./images/sharing-time/reflection.png";

export type IconKey =
  | "check"
  | "target"
  | "chat"
  | "people"
  | "alert"
  | "arrow";

export interface SharingTimeContent {
  meta: {
    id: string;
    titleZh: string;
    year: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    role: string;
    focus: string;
    coverImage: string;
    coverAlt: string;
  };
  impact: {
    kicker: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
    feedbackLabel: string;
    quotes: Array<{ quote: string; author: string }>;
  };
  problem: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
    why: { before: string; emphasis: string; after: string };
  };
  discovery: {
    kicker: string;
    phase1: {
      heading: string;
      description: string;
      insights: Array<{ icon: IconKey; text: string }>;
      image: string;
      imageCaption: string;
      insightImage: string;
      insightImageCaption: string;
    };
    phase2: {
      heading: string;
      description: string;
      findings: Array<{ icon: IconKey; text: string }>;
      images: Array<{ src: string; caption: string }>;
    };
    persona: {
      label: string;
      description: string;
      cards: Array<{
        photo?: string;
        imgPos?: string;
        emoji: string;
        tag: string;
        tagStyle: "primary" | "secondary" | "dark";
        name: string;
        quote: string;
        about: string[];
        needs: string[];
        challenges: string[];
        opportunities: string[];
      }>;
    };
  };
  designProcess: {
    kicker: string;
    hmwBold: string;
    description: string;
    competitiveHeading: string;
    competitive: Array<{ heading: string; description: string }>;
    referenceImages: string[];
  };
  solution: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
  };
  outcome: {
    kicker: string;
    description: string;
    blueprintImages: string[];
    blueprintCaption: string;
    toolkitImages: string[];
    toolkitCaption: string;
    digitalExtension: {
      kicker: string;
      title: string;
      paragraph: string;
      mobileScreens: Array<{ caption: string; src?: string }>;
      cta: string;
      ctaHref: string;
    };
  };
  reflection: {
    kicker: string;
    paragraph: string;
    image: string;
    imageCaption: string;
  };
}

export const sharingTimeContent: SharingTimeContent = {
  meta: {
    id: "enterprise-service-design",
    titleZh: "Enterprise Services · Internal Knowledge Sharing Service Design",
    year: "2024",
  },

  hero: {
    kicker: "Case Study",
    title: "企業服務：內部分享服務設計",
    description:
      "以用戶及組織真實反饋設計，促進團隊效率、溝通模式與工作滿意度。成功被合作企業採納，獲參與者全員正向評價。",
    role: "服務設計師 · UIUX設計師",
    focus: "從研究至功能產生 · 使用者研究 · 服務設計 · AI工具建立",
    coverImage: cover,
    coverAlt: "封面照片 — 企業服務：內部分享服務設計",
  },

  impact: {
    kicker: "Impact",
    stats: [
      {
        icon: "check",
        title: "工作坊參與者平均滿意度達89%",
        description:
          "問卷回饋全員評分皆達4分以上，滿分5分，參與者表示願意有更多類似機會點。",
      },
      {
        icon: "target",
        title: "企業導入採納",
        description:
          "合作企業主管表示認同，願意在團隊中導入，並開始創造更多此類交流機會。",
      },
    ],
    feedbackLabel: "User Feedback",
    quotes: [
      {
        quote: "「我認為公司應該要更常有這類型的交流機會！」",
        author: "工作坊參與者（企業成員）",
      },
      {
        quote: "「很高興今天我知道我可以跟另位動態設計師討論工作上碰到的狀況。」",
        author: "工作坊參與者（企業成員）",
      },
      {
        quote:
          "\"Fostering deeper internal communication can strengthen the sense of belonging. As belonging grows, efficiency is likely to improve, indirectly benefiting the company's overall output.\"",
        author: "Tiah, Product Designer, Burberry UK",
      },
    ],
  },

  problem: {
    kicker: "Problem",
    before:
      "創意產業團隊內部的知識與經驗，大多停留在一對一對話與個人工作習慣中，缺乏團隊層級的相互學習與跨成員交流機制。這個問題在",
    bold: "新進與資淺成員",
    after:
      "身上特別明顯——因為缺少討論與交流機會，他們在不確定的工作情境中更容易感到壓力，進而影響工作滿意度、團隊效率與產值。",
    why: {
      before:
        "初始假設是「員工壓力來自工作量」。但我透過研究發現，真正的痛點不是工作量大，而是",
      emphasis: "缺乏具支持與交流的溝通管道",
      after: "。",
    },
  },

  discovery: {
    kicker: "Discovery",
    phase1: {
      heading: "階段 1：進行使用者研究挖掘痛點",
      description:
        "透過深入訪談 13 位業界相關人士，並輔以二手資料搜查，執行主題分析與問題地圖，整理出以下洞察：",
      insights: [
        { icon: "chat", text: "缺乏溝通管道，於部分創意組織中是隱性但關鍵的問題。" },
        { icon: "people", text: "良好的同事關係，能有效降低工作中因不確定性帶來的壓力。" },
        { icon: "alert", text: "新進員工特別容易因缺少交流機會而感到焦慮。" },
      ],
      image: discoveryPhase1Chart,
      imageCaption: "痛點成因分析：從了解員工於公司實際工作情形後，發現痛點與可能造成的原因",
      insightImage: discoveryPhase1LeveragePoints,
      insightImageCaption:
        "就深度訪談後所發現的議題及歸納出的槓桿點（leverage point）為「與主管的互動」和「團隊內的互動方式」",
    },
    phase2: {
      heading: "階段 2：驗證解決方法",
      description:
        "以初步洞察尋找有意願合作的團隊，與員工們進行 4 個工作滿意度活動／工作坊，同時驗證增加交流機會方向是否有效。在收斂用戶痛點後，與 9 位專家（設計主管、PM、活動引導者）進行產品解決方法驗證。",
      findings: [
        {
          icon: "check",
          text: "工作坊達到 89% 正向回饋，多數參與者表示喜歡這樣的交流形式、也希望能有更多類似機會。",
        },
        { icon: "arrow", text: "實體互動成為「延伸成正式解決方案」的關鍵依據。" },
      ],
      images: [
        { src: discoveryPhase2Workshop, caption: "工作坊活動實作現場" },
        {
          src: discoveryPhase2Results,
          caption: "使用者工作坊中歸納出的洞察為工作中的不確定性和缺乏對外溝通管道，且以新進員工最為常見",
        },
      ],
    },
    persona: {
      label: "Persona",
      description:
        "合作對象為倫敦與台北兩地 10 多位創意產業工作者，包括企業主、主管與員工，以及 1 間設計公司；研究發現受影響最深的族群，是孤立感特別明顯的新進與資淺設計師。",
      cards: [
        {
          emoji: "🧑‍💼",
          tag: "服務推動者",
          tagStyle: "primary",
          name: "部門主管",
          quote: "公司願意關心員工，也願意打造一個正向的工作環境。",
          about: ["年齡 32 歲，任職超過五年，累積豐富經驗與應變彈性。", "滿意度曲線逐漸提升並趨於穩定。"],
          needs: ["希望更清楚了解上層需求與公司營運方向。", "需要提升團隊效率與凝聚力的洞察。"],
          challenges: ["需在繁重工作量與管理團隊間取得平衡。", "不確定如何拿捏管理角色的分寸。"],
          opportunities: ["願意了解員工遇到的困難並協助解方。", "遇到困難時，主管願意提供協助。"],
        },
        {
          emoji: "🧑‍🎨",
          tag: "主要使用者",
          tagStyle: "secondary",
          name: "資深設計師",
          quote: "公司應該舉辦更多這類活動，促進員工之間的互動。",
          about: ["年齡 27 歲，任職超過四年。", "目前滿意度不高不低，沒有離職打算但也稱不上滿意。"],
          needs: ["希望團隊氛圍更有活力。", "希望有更多交流與活動機會，並改善新人 onboarding。"],
          challenges: ["不特別喜歡目前的團隊氛圍。", "常需應對臨時客戶需求，會議中確認進度時感受到壓力。"],
          opportunities: ["樂於與同事、主管討論工作需求。", "願意憑藉豐富經驗協助其他設計師解決問題。"],
        },
        {
          emoji: "🧑‍💻",
          tag: "主要使用者",
          tagStyle: "secondary",
          name: "初階設計師",
          quote: "我不確定自己目前的做法是否正確，所以需要找人討論。",
          about: ["年齡 23 歲，任職超過一年。", "整體滿意度起伏不定，仍擔心是否會再度下滑。"],
          needs: [
            "需要機會與同事或主管討論、確認方向。",
            "希望主管能理解設計師現況，協調解方或協助爭取權益。",
            "工作產生焦慮時，希望公司能提供幫助。",
          ],
          challenges: [
            "對自己的做法不確定，傾向獨立工作。",
            "被過多緊急專案壓得喘不過氣，對修改多為被動接受。",
            "與其他部門溝通時感受到壓力。",
          ],
          opportunities: ["彈性的公司政策能降低壓力。", "若有機會，願意與同事分享自己的處境。"],
        },
        {
          emoji: "🙋",
          tag: "極端使用者",
          tagStyle: "dark",
          name: "新進設計師",
          quote: "每個人都像一座孤島。",
          about: [
            "剛離開前一份工作，進入新公司。",
            "整體滿意度極低，任職約一個月後便因與主管溝通困難而離職。",
            "與同事相處融洽，但缺乏專業討論機會。",
          ],
          needs: ["需要與同事更專業的溝通以提升職能。", "希望與主管進行邏輯清晰且有效的溝通。"],
          challenges: [
            "不喜歡團隊氛圍。",
            "需應對更多臨時客戶需求，常感到最後一刻的壓力。",
            "與客戶會議確認進度或需求時感到壓力。",
          ],
          opportunities: ["清楚知道理想的工作環境需要理性溝通，以及團隊內的共同學習與成長。"],
        },
      ],
    },
  },

  designProcess: {
    kicker: "Design Process",
    hmwBold:
      "HMW：如何增加創意公司設計師之間交流與討論工作相關技能的機會，同時提升與不同專業角色之間的溝通效率？",
    description:
      "基於研究洞察，為確保解法在企業限制下可行，我訂出功能篩選標準與競品分析：解法必須低預算、不增加行政負擔，並能嵌入既有工作流程。",
    competitiveHeading: "競品分析",
    competitive: [
      {
        heading: "企業內部方案",
        description:
          "HR 活動、team-building games、工作場所心理健康計畫：成本高、參與率低，且有標籤化風險。",
      },
      {
        heading: "非企業關係建立工具",
        description:
          "Ice-breaking cards、social prompt apps：門檻低、微互動，且能彈性安排於適合的情境中使用。",
      },
    ],
    referenceImages: [decisionRef1, decisionRef2],
  },

  solution: {
    kicker: "Solution",
    before: "最終產品方向截取「非企業工具」輕量低門檻的特性，但以企業能接受的方式落地。為",
    bold: "創意分享 + 小幅度團隊互動",
    after: "，並以工具搭配線上平台，讓服務嵌入既有會議前後，不額外增加一場活動。",
  },

  outcome: {
    kicker: "Outcome",
    description:
      "交付成果包含線下活動、線上資訊共享平台內容模組，以及 Toolkit（流程資訊、提示工具卡牌等）。Sharing Time 作為定期工作會議之外的補充活動，提供新進與資深設計師更多交換想法、討論工作與彼此學習的機會，並在活動中應用所設計的 Toolkit 產品，促進不同用戶進行溝通、增進互相理解。",
    blueprintImages: [outcomeBlueprintLeft, outcomeBlueprintRight],
    blueprintCaption:
      "最終服務藍圖協助檢視服務前、中、後及前台使用者互動狀況和對應到後台該如何運作",
    toolkitImages: [outcome1, outcome2],
    toolkitCaption:
      "初步開發出的促進創意團隊交流的實體卡牌工具和 Miro 內的線上平台內容規劃，可和服務藍圖內流程相互對應",
    digitalExtension: {
      kicker: "Digital Extension",
      title: "數位化延伸",
      paragraph:
        "今年(2026)，我為提升工具的可擴展性與使用彈性，將原本的實體卡牌工具與 Miro 共享平台的內容重新設計為「一站式的線上協作平台」，整合活動卡牌、工作坊引導內容、活動計時器及共享資訊線上空間，讓參與者能在不同地點共同完成活動、分享想法並保留討論成果。這項數位化設計讓工具不再受限於實體工作坊，可支援遠端、混合式團隊協作。",
      mobileScreens: [
        { caption: "首頁", src: mobile1 },
        { caption: "卡牌介紹", src: mobile2 },
        { caption: "團隊資訊共享區域", src: mobile3 },
        { caption: "計時與抽卡功能", src: mobile4 },
      ],
      cta: "前往數位分享工具",
      ctaHref: "https://saraaaliang.github.io/sharing-time/",
    },
  },

  reflection: {
    kicker: "Reflection",
    paragraph:
      "我從使用者需求出發，定義功能、拆解競品、說服企業，並交付可驗證的模型。可執行的方向不僅是流程設計，而是更全面分析使用者、企業與市場需求，藉此提升使用者體驗與品牌價值。",
    image: reflectionPhoto,
    imageCaption: "工作坊反思紀錄照片",
  },
};
