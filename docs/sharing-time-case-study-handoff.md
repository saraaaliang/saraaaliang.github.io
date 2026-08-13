# Sharing Time — Case Study Content Export

> **Purpose:** Single source-of-truth content export for design handoff to Claude Design.
> **Source:** `src/app/App.tsx`, `PROJECTS` array, project id `enterprise-service-design`.
> **Rule for the design tool:** All copy below is verbatim from the live site. Apply new visual layout/styling only — do not alter, shorten, translate, or rewrite any wording. Section order below matches the live page's top-to-bottom order exactly.
> **Excluded (site chrome, not case-study content):** top navigation bar, "All projects" back link, "Next Project" footer link at the very bottom of the page.

## Document Map

1. Page Header (Hero)
2. Cover Image
3. Section: Impact
4. Section: Problem
5. Section: Discovery
6. Section: Design Process
7. Section: Solution
8. Section: Outcome
9. Section: Reflection
10. Appendix A — All Image Assets
11. Appendix B — Section Order Summary
12. Appendix C — Metadata Not Displayed in Body Copy

---

## 1. Page Header (Hero)

**Back link (nav element):** All projects

**H1 Title (Chinese, primary heading):**
企業服務：內部分享服務設計

**Subtitle (English, directly below H1):**
Enterprise Services · Internal Knowledge Sharing Service Design

**Value proposition (lede paragraph, below subtitle):**
以用戶及組織真實反饋設計，促進團隊效率、溝通模式與工作滿意度。成功被合作企業採納，且達80%使用者好評。

**Metadata row (two columns):**
- Label: `Role` → Value: 服務設計師 · UX Designer — *(exact source string: "Service Designer · UX Designer")*
- Label: `Focus` → Value: 從研究至功能產生 · 使用者研究 · 服務設計

---

## 2. Cover Image

- **File:** `src/imports/Frame11/bad3829be4b716b9090c792ee70474fa67f75614.png`
- **Placement:** Full-bleed banner directly below the hero header, before case-study content begins.
- **Alt text:** 企業服務：內部分享服務設計
- **Note:** This same file is also used as the project's thumbnail image on the homepage "Recent Projects" grid.

---

## 3. Section: Impact

**Section label (eyebrow heading):** Impact

### Stat Cards (2 — highlighted/emphasized callout style)

**Card 1**
- Number: 1
- Text: 工作坊問卷回饋達 80% 正向評價，參與者表示願意有更多類似交流機會

**Card 2**
- Number: 2
- Text: 合作企業主管表示認同，願意在團隊中導入。且開始於團隊內創造更多此類交流機會

### Sub-label: User Feedback

**Quote 1**
- Quote: 「我認為公司應該要更常舉辦這類型交流活動！」
- Author: 工作坊參與者（企業成員）

**Quote 2**
- Quote: 「很高興今天(工作坊日)我知道我可以跟另位動態設計師討論工作上碰到的狀況。」
- Author: 工作坊參與者（企業成員）

**Quote 3**
- Quote: "I believes that fostering deeper internal communication within the team can strengthen the sense of belonging. With an enhanced sense of belonging, efficiency is likely to improve, indirectly benefiting the overall output of the company."
- Author: Tiah, A product designer at Burberry UK

---

## 4. Section: Problem

**Section label (eyebrow heading):** Problem

### Problem Points (numbered list, 1–3, plain text — no box styling)

**1.** 創意產業團隊內部的知識與經驗,大多停留在一對一對話與個人工作習慣中，缺乏團隊層級的相互學習，與跨成員交流機制

**2.** 此問題在**新進與資淺成員**身上特別明顯。因為缺少討論與交流機會，且在不確定的工作情境中易感到壓力
*(bold span in source: "新進與資淺成員")*

**3.** 影響工作滿意度、團隊效率和產值

### Callout: Why (highlighted, left-border accent style)

- **Label:** 💡 Why
- **Body:** 初始假設是「員工壓力來自工作量」。但我透過研究發現，真正的痛點不是工作量大，而是**缺乏「具支持與交流的溝通管道」**。
  *(bold/emphasized span in source: "缺乏「具支持與交流的溝通管道」")*

---

## 5. Section: Discovery

**Section label (eyebrow heading):** Discovery

### 5.1 Research — Phase 1

- **Phase label:** 階段 1
- **Phase title:** 找出真正痛點

**Methods — left column list:**
- 深入訪談13位業界相關人士
- 二手資料搜查

**Methods — right column list:**
- 執行主題分析(Thematic Analysis)
- 問題地圖(Problem Mapping)

**Sub-label:** 分析結果 / 研究洞察

**Insights (numbered, highlighted/emphasized callout style, 3 items):**
1. 缺乏溝通管道：於部分創意組織中是隱性但關鍵的問題。
2. 良好的同事關係：能有效降低工作中因不確定性帶來的壓力
3. 新進員工：特別容易因缺少交流機會而感到焦慮。

**Image:**
- File: `src/imports/Discovery-RootCause/pain-point-root-cause.png`
- Caption: 痛點成因分析：從感受到根本原因
- Placement: end of the Phase 1 block, after the insights above. Standalone (not paired with another image).
- Content note: the image itself is a 3-row infographic (痛點與感受 → 工作現場觀察〈關鍵發現〉→ 根本原因); that internal text lives inside the image file, not in the page's text layer.

### 5.2 Research — Phase 2

- **Phase label:** 階段 2
- **Phase title:** 驗證解法可行性

**Methods list:**
- 以初步洞察，尋找有意願合作團隊
- 與員工們進行 4 個工作滿意度活動/工作坊
- 測試「增加交流機會」方向是否有效
- 與 9 位專家持續討論驗證（設計主管、PM、工作坊引導者）

**Sub-label:** 分析結果 / 研究洞察

**Results list (2 items):**
1. **工作坊問卷達到 80% 正向評價。**多數參與者表示喜歡這樣的交流形式、也希望能有更多類似機會
   *(bold span in source: "工作坊問卷達到 80% 正向評價。")*
2. 上述結果為「延伸成正式固定活動模型」的關鍵依據

**Images (2 — displayed side-by-side as a pair):**
- File: `src/imports/Frame22-2/21979d8ffe90269049a904e6559ffe3efb2abc4c.png`
  - Caption: 工作坊活動實作現場
  - Placement: left image of the pair, at the end of the Phase 2 block
- File: `src/imports/Frame22-2/19e47067312c9efc8d349066b30097eff3b64b0a.png`
  - Caption: 工作坊問卷結果：80% 正向評價
  - Placement: right image of the pair, at the end of the Phase 2 block

### 5.3 Persona

**Sub-label:** Persona

**Intro (bulleted, 2 lines):**
- 合作對象：倫敦&台北兩地的10多位創意產業工作者，包括企業主、主管與員工，與 1 間設計公司
- 發現最受影響族群：新進與資淺設計師的孤立感較為明顯

**Image:**
- File: `src/imports/Discovery-StakeholderMap/stakeholder-map.png`
- Caption: 利害關係人地圖
- Placement: after the intro bullets above, before the 4 persona cards below. Small supporting visual, not full width.

**Persona Cards (4, grid layout):**

**Card 1**
- Label: 服務推動者
- Name: 部門主管
- Quote: 「公司願意關心員工，也有意打造一個正向的工作環境。」
- Photo file: `src/imports/Frame22-3/b97c5c540ca9a6c6464aabbac78a277b6ed57dcc.png`
- Photo focal point: 20% 18%

**Card 2**
- Label: 主要使用者
- Name: 資深設計師
- Quote: 「公司應該舉辦更多活動，促進員工之間的互動。」
- Photo file: `src/imports/Frame22-3/b97c5c540ca9a6c6464aabbac78a277b6ed57dcc.png`
- Photo focal point: 88% 18%

**Card 3**
- Label: 主要使用者
- Name: 初階設計師
- Quote: 「我不確定自己目前的做法是否正確，所以需要找人討論。」
- Photo file: `src/imports/Frame22-3/344aaff71c2bea2b13e73ffeda2150d410b6ec75.png`
- Photo focal point: 22% 15%

**Card 4**
- Label: 極端使用者
- Name: 新進設計師
- Quote: 「每個人都像一座孤島。」
- Photo file: `src/imports/Frame22-3/344aaff71c2bea2b13e73ffeda2150d410b6ec75.png`
- Photo focal point: 88% 15%

*Note: Cards 1 & 2 share one source photo, cropped to two different focal points; Cards 3 & 4 share a second source photo the same way.*

### 5.4 Requirements

**Sub-label:** Requirements

**"How Might We" callout (highlighted background block, 3 lines):**
- Line 1 (small/muted): How Might We:
- Line 2 (large): 如何**增加創意公司設計師之間交流&討論工作相關技能**的機會，
  *(bold span: "增加創意公司設計師之間交流&討論工作相關技能")*
- Line 3 (large): 同時**提升與不同專業角色之間的溝通效率？**
  *(bold span: "提升與不同專業角色之間的溝通效率？")*

---

## 6. Section: Design Process

**Section label (eyebrow heading):** Design Process

### Iterations

**Sub-label:** Iterations

**Intro sentence:**
基於研究洞察，為確保解法在企業限制下可行性，我訂出**功能篩選標準&競品分析**
*(bold span: "功能篩選標準&競品分析")*

**Panel A — 3個篩選標準：** *(plain list, no background box)*
- 低預算
- 不增加行政負擔
- 嵌入既有工作流程

**Panel B — 競品分析：** *(boxed/card style)*

*企業內部方案*
- HR 活動、team-building games、工作場所心理健康計畫
- 缺點：成本高、參與率低、標籤化風險

*非企業關係建立工具*
- Ice-breaking cards、social prompt apps
- 優點：低門檻、輕量互動、能安排於適合的情境中使用

**Reference Images (3, single row, no captions in source):**
- File: `src/imports/Frame22-4/13d4f80fc95b79a6fc77e431a5bde44e9605f63e.png` — alt: Reference 1
- File: `src/imports/Frame22-4/ddd944c71fbce120bc3255e6d41fe75dd5f3d49d.png` — alt: Reference 2
- File: `src/imports/Frame22-4/1211484da72fbe2cbc782affea60a0af6773dbb4.png` — alt: Reference 3
- Placement: row of 3, after Panel A and Panel B above.

---

## 7. Section: Solution

**Section label (eyebrow heading):** Solution

**Heading paragraph:**
**最終產品方向＆機制：**截取「非企業工具」的輕量低門檻特性，但以企業能接受的方式落地
*(bold span: "最終產品方向＆機制：")*

**Numbered highlight items (2 — highlighted/emphasized callout style):**
1. 創意分享 + 小幅度團隊互動
2. 以工具搭配線上平台：
   Subtitle: 讓服務嵌入既有會議前/後，不額外增加一場活動

---

## 8. Section: Outcome

**Section label (eyebrow heading):** Outcome

### Deliverables + Service Core (two side-by-side panels)

**Panel A — Deliverables (numbered list):**
1. **線下活動**
2. **線上資訊共享平台** 內容模組
3. **Toolkit**：流程資訊、提示工具卡牌等
*(bold spans: "線下活動", "線上資訊共享平台", "Toolkit")*

**Panel B — 服務核心：**
- Sharing Time 作為定期工作會議之外的補充活動，提供新進與資深設計師更多交換想法、討論工作與彼此學習的機會。
- 在活動中應用所設計的 Toolkit 產品，促進用不同用戶進行溝通，增進互相理解

### Callout: Future Note (left-border accent style)

未來可轉型為數位版 Toolkit：現在的實體工具為前期雛形

### Service Blueprint Images (2 files forming ONE continuous strip)

- File: `src/imports/Frame13-2/df0f68dc382cdeeddcb5c48a5962859580319da9.png` — left half
- File: `src/imports/Frame13-2/f566ffe0dbb937c33c5069d9d4c0a859f88c9a87.png` — right half
- Shared caption (centered, below both): Service Blueprint 服務藍圖
- **Placement note:** these two files are two halves of one wide service-blueprint diagram. They must sit edge-to-edge with no gap so they read as a single continuous horizontal strip — not as two separate stacked images.

### Digital Extension (sub-section within Outcome)

**Sub-heading:** 數位化延伸

**Body paragraphs:**
1. 為提升工具的可擴展性與使用彈性，我將原本的實體卡牌工具 + Miro 共享平台重新設計為一站式的線上協作平台。數位版本完整保留活動卡牌與工作坊引導內容，並整合計時器及共享資訊空間，讓參與者能在不同地點共同完成活動、分享想法並保留討論成果。
2. 這項數位化設計讓工具不再受限於實體工作坊，可支援遠端、混合式團隊協作，並為未來的擴充與持續使用奠定基礎。

**Mobile screen row (4 items, single row, phone-shaped frames — no images uploaded yet):**
1. Caption: 首頁 — Image: *not yet uploaded, placeholder reads "GIF 待上傳"*
2. Caption: 卡牌介紹 — Image: *not yet uploaded*
3. Caption: 團隊資訊共享上傳及檢視區域 — Image: *not yet uploaded*
4. Caption: 活動當下的計時功能及抽卡功能 — Image: *not yet uploaded*

**CTA (button/link text):** 點擊進行即時互動

---

## 9. Section: Reflection

**Section label (eyebrow heading):** Reflection

**Body paragraphs:**
1. 我從使用者需求出發，定義功能、拆解競品、說服企業，並交付可驗證的模型。
2. 可執行方向的不僅為流程設計，而是更全面分析使用者、企業及市場需求，去提升使用者體驗及品牌價值。

**Image:**
- File: `src/imports/Frame13-3/3f37cfea41b3d316d9c213540b3c7c1d5cc9b15e.png`
- Caption: 工作坊反思紀錄照片
- Placement: after both body paragraphs above, at the end of the section. Card-sized supporting image, not full width.

---

## Appendix A — All Image Assets (in page order)

| # | File Path | Belongs To | Caption | Notes |
|---|---|---|---|---|
| 1 | `src/imports/Frame11/bad3829be4b716b9090c792ee70474fa67f75614.png` | Hero / Cover Image | — | Also reused as homepage project-card thumbnail |
| 2 | `src/imports/Discovery-RootCause/pain-point-root-cause.png` | Discovery → Research Phase 1 | 痛點成因分析：從感受到根本原因 | Standalone, text-dense infographic |
| 3 | `src/imports/Frame22-2/21979d8ffe90269049a904e6559ffe3efb2abc4c.png` | Discovery → Research Phase 2 | 工作坊活動實作現場 | Paired side-by-side with #4 |
| 4 | `src/imports/Frame22-2/19e47067312c9efc8d349066b30097eff3b64b0a.png` | Discovery → Research Phase 2 | 工作坊問卷結果：80% 正向評價 | Paired side-by-side with #3 |
| 5 | `src/imports/Discovery-StakeholderMap/stakeholder-map.png` | Discovery → Persona | 利害關係人地圖 | Small supporting visual |
| 6 | `src/imports/Frame22-3/b97c5c540ca9a6c6464aabbac78a277b6ed57dcc.png` | Discovery → Persona Cards 1 & 2 | — | One file, two focal-point crops |
| 7 | `src/imports/Frame22-3/344aaff71c2bea2b13e73ffeda2150d410b6ec75.png` | Discovery → Persona Cards 3 & 4 | — | One file, two focal-point crops |
| 8 | `src/imports/Frame22-4/13d4f80fc95b79a6fc77e431a5bde44e9605f63e.png` | Design Process → Iterations | — | Reference image 1 of 3 |
| 9 | `src/imports/Frame22-4/ddd944c71fbce120bc3255e6d41fe75dd5f3d49d.png` | Design Process → Iterations | — | Reference image 2 of 3 |
| 10 | `src/imports/Frame22-4/1211484da72fbe2cbc782affea60a0af6773dbb4.png` | Design Process → Iterations | — | Reference image 3 of 3 |
| 11 | `src/imports/Frame13-2/df0f68dc382cdeeddcb5c48a5962859580319da9.png` | Outcome → Service Blueprint | Service Blueprint 服務藍圖 (shared caption) | Left half of continuous strip |
| 12 | `src/imports/Frame13-2/f566ffe0dbb937c33c5069d9d4c0a859f88c9a87.png` | Outcome → Service Blueprint | Service Blueprint 服務藍圖 (shared caption) | Right half of continuous strip |
| 13 | *(not uploaded)* | Outcome → Digital Extension | 首頁 | Mobile screen 1 of 4 |
| 14 | *(not uploaded)* | Outcome → Digital Extension | 卡牌介紹 | Mobile screen 2 of 4 |
| 15 | *(not uploaded)* | Outcome → Digital Extension | 團隊資訊共享上傳及檢視區域 | Mobile screen 3 of 4 |
| 16 | *(not uploaded)* | Outcome → Digital Extension | 活動當下的計時功能及抽卡功能 | Mobile screen 4 of 4 |
| 17 | `src/imports/Frame13-3/3f37cfea41b3d316d9c213540b3c7c1d5cc9b15e.png` | Reflection | 工作坊反思紀錄照片 | Card-sized supporting image |

---

## Appendix B — Section Order Summary (top to bottom)

1. Hero / Header
2. Cover Image
3. Impact (Stat Cards → User Feedback)
4. Problem (Problem Points → Why callout)
5. Discovery (Research Phase 1 → Research Phase 2 → Persona → Requirements)
6. Design Process (Iterations)
7. Solution
8. Outcome (Deliverables/Service Core → Future Note → Service Blueprint → Digital Extension)
9. Reflection

---

## Appendix C — Metadata Not Displayed in Body Copy

- Project ID: `enterprise-service-design`
- Category: 服務設計
- Year: 2024
- Tags (array): 從研究至功能產生 / 使用者研究 / 服務設計
