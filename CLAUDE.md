# CLAUDE.md

指引 Claude Code 在這個作品集網站專案裡工作時使用。這份文件是給「接手 session」看的進度筆記，不是給訪客看的網站文件。

## 專案概況

- 這是 Sara 的個人作品集網站：首頁 + 6 個作品案例頁（`PROJECTS` 陣列規劃了 6 個位置，目前有 5 個實際條目——4 個真實作品（Sharing Time / Community of Care / SDG Energy / RWD Storybook）+ 1 個 `comingSoon` 佔位，**還缺 1 個佔位條目**才補滿 6 個）。
- 技術棧：Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion（`motion/react`）+ lucide-react 圖示。
- 專案根目錄：`Modern Portfolio Website/`（`npm run dev` 從這裡執行）。
- **已完成**：首頁（Hero / Selected Work / About / Contact / Footer 全部套用新設計系統）；作品1 Sharing Time、作品2 Community of Care、作品3 SDG Energy、作品4 RWD Storybook 四頁都已整頁做完，各自狀態見下方「作品進度」。
- **待完成**：作品 5–6，目前完全沒有內容，只有 `PROJECTS` 陣列裡的 `comingSoon` 佔位資料。

## 設計系統 / 規則

網站經歷過一次「Claude Design」提供的設計系統改版（代號 **Version C**），從舊的米色/teal 主題換成現在這套。**新作品頁請直接沿用這套色票字級，不要延用舊的 teal/米色系統。**

### 色票（都是寫死的 hex，不是 Tailwind 內建色名）

```
底色 / 墨色
  --bg 主背景        #ffffff
  --ink 標題文字       #15181a
  --body 內文文字      #40474a
  --muted 次要/說明文字  #8a908d
  --surface 卡片底色    #f4f5f2
  --border 邊框       #d8dbd5

強調色
  --accent 深綠（主強調色，kicker/連結/按鈕文字用）   #0f3d2b
  --accent-light 淺綠（icon圓圈底色、標籤pill、CTA按鈕底色） #cdec8e

區塊底色（整站最多用1-2個背景色，別亂加新色）
  --problem-band 淺卡其/鼠尾草綠（Problem區塊、Persona區塊底）  #eef4e8
  --dark-bg 深綠滿版色塊（Outcome區塊、首頁Contact收尾）      #0f3d2b
    --dark-ink 深色塊上的標題文字   #eef4e9
    --dark-body 深色塊上的內文文字  #c7d5c0
    --dark-caption 深色塊上的圖說   #9db097
    --dark-mobile-bg 深色塊裡手機截圖的底  #164a35
```

這些色票在 `src/styles/theme.css` 的 `:root` 裡也同步成 shadcn 語意變數了（`--background`／`--foreground`／`--card`／`--muted-foreground`／`--border`／`--primary`／`--accent` 等），所以舊元件如果用的是 `bg-background`／`text-foreground`／`border-border` 這類 Tailwind 語意 class，**會自動吃到新色票**，不需要每處都手動寫 hex。新寫的區塊（像 `SharingTimeCaseStudy.tsx`）則是直接用 inline `style={{ color: c.xxx }}` 寫死 hex（元件檔案開頭有一個 `c` 常數物件收斂全部色票）。

### 字體

- **Inter**（`var(--font-inter)`）：新設計系統的主字體，標題和內文都用它。案例頁 `SharingTimeCaseStudy.tsx` 全部用 Inter。
- **Cormorant Garamond 斜體**（`var(--font-cormorant)`）：**只用在引言/quote**（User Feedback 引言、Persona 卡片裡的語錄），不要用在其他地方。
- **Epilogue**（`var(--font-epilogue)`）：舊字體，理論上已被 Inter 取代，但還有 **4 處沒改**，是遺留、不是刻意設計：
  - Nav 左上角 logo「Sara Zhang」（`App.tsx` 裡的 `Nav` function）
  - 首頁 Hero 中文大標「善於將複雜議題...」（`HeroSection`）
  - 案例頁底部「Next Project」連結標題（`ProjectPage`）
  - 找不到專案時的 fallback「即將公開」頁面標題（`ProjectPage` 的 else 分支）
  - **待決定**：這 4 處要不要也換成 Inter，統一風格；還是刻意保留 Epilogue 做標題字體差異化。目前沒有定論。
- 字體都在 `src/styles/fonts.css` 用 `@import` 從 Google Fonts 載入，已含 Inter 400/500/600/700 + Cormorant Garamond 斜體 300/400。

### 間距 / 版型邏輯

- Kicker（區塊小標，如 Impact / Problem / Discovery）：`text-xs uppercase tracking-[0.1em] font-semibold`，顏色用 `--accent`，**永遠維持英文**，不要翻中文（首頁的 Selected Work / About / Contact 同理）。
- **完整的大中小標層級系統（L1-L6）**：見 `.claude/skills/heading-hierarchy/SKILL.md`。每次新增/修改案例頁的標題類元素（section 標題、子標題、卡片標題、小標籤）都要對照這份層級表，確認沒有「子層級視覺上比父層級還搶眼」的狀況（SDG Energy 的 Version 1/2/3 曾經比 Decision Rationale 還大，就是這個問題的實例）。
- 卡片：`rounded-2xl`（16px）用 `--surface` 底色；圖片用 `rounded-[20px]`。
- Icon 圓圈：`w-[52px] h-[52px] rounded-full`，底色 `--accent-light`，圖示或 emoji 置中。
- 圖文順序規則（使用者明確要求過）：**標題 → 內文 → 圖片 → 圖說**，圖片不能插在文字中間。
- 圖片處理原則：段落級大標題（Challenge/Solution等）可保留 1-2 段完整說明文字；細節展示型圖片（persona、journey map、過程照片）一律走「短句圖說 + 大圖」，不要長段落解釋圖片內容。
- 響應式對齊：像 Persona 的 About/Needs/Challenges/Opportunities 這種「多欄位需要跨欄水平對齊」的版面，桌面版用 **row-major CSS Grid**（同類項目排同一列，用 `gridTemplateRows` 明確宣告列數，讓 `grid-row: 1 / -1` 的分隔線能正確撐滿全高——**這裡曾經因為沒宣告 `gridTemplateRows` 導致分隔線只有一列高，之後遇到類似需求要記得先宣告好行數**），手機版用簡單的直向 stacked 版面（兩份 markup 各自用 `lg:hidden` / `hidden lg:grid` 切換，不要用同一份 markup 硬做響應式，行不通）。
- **卡片留白檢查（這個問題重複發生過好幾次，寫進去給每個 session 檢查）**：卡片（`Card2`／灰色 `--surface` 卡片、單點文字卡片等）只要內容撐不滿、留下大片空白或整張卡感覺「內容不多但卡很大」，就要重新設計，不要放著不管——**做完一個新區塊/卡片後，養成習慣自己截圖檢查一次留白比例，不要等使用者回頭抓**。常見修法（依情況挑一種，不是照順序都做）：
  1. **合併成一張卡**：好幾張各自獨立、內容稀疏的小卡，改成一張卡內部用 `border-top` 分隔多個小節。
  2. **收斂寬度對齊內容**：卡片不要無腦撐滿容器寬度，寬度收斂到跟相鄰文字段落對齊（例如用 `max-w-3xl` 對齊上方段落），或用 `display:inline-block`／`w-fit` 讓卡片貼合實際內容寬度，不要為了「看起來像卡片」硬撐滿版。
  3. **改成橫向排列**：資訊量少、每項都是「短標籤 + 一行說明」的情況，改成單行橫向多欄（欄與欄之間用 1px 分隔線），比堆疊直向的大留白卡更省空間。
  4. **降級成無卡片的純文字列表**：如果資訊真的很少（1-3 個短句），不一定需要卡片背景，用貼齊段落寬度的條列文字（`border-top` 分隔每項）或小標籤 chips 就夠了，不用每個區塊都塞進 `--surface` 灰底卡。
  SDG Energy 的 Reflection 區塊（`SdgEnergyCaseStudy.tsx` 的 `projectValue`）是這個問題的實際案例：原本 3 張稀疏小卡 → 先合併成 1 張大卡但還是偏空 → 使用者反饋「灰色卡片太大但資訊不多」，後續要在上面 4 種修法裡挑一種再改一輪（例如改法 3 橫向三欄，或改法 2 收斂成貼合內容寬度的小卡）。

### 共用 Component / Layout 邏輯

- `src/app/App.tsx`：首頁所有區塊（`HeroSection` / `AboutSection` / `ProjectsSection` / `ProjectCard` / `ContactSection` / `Footer` / `Nav`）+ 路由邏輯（`ProjectPage`：依 `project.id` 決定渲染哪個案例頁元件，找不到對應元件就渲染通用「即將公開」fallback）。
- **每個作品案例頁都應該是獨立元件 + 獨立內容檔**，不要塞進共用的 `CaseBlock`／泛用渲染邏輯（那套舊架構已經整個拆除，因為新設計系統每個案例頁的排版都不太一樣，硬共用只會綁死）。範例見 Sharing Time：
  - `src/app/SharingTimeCaseStudy.tsx` — 版面元件，不寫死任何文字或圖片路徑，全部從 `content` prop 讀。
  - `src/content/sharing-time.ts` — 純資料檔，文字內容 + 圖片 import 都在這裡，改文案/換圖不用碰版面程式碼。
  - `src/content/images/sharing-time/` — 圖片資料夾，**檔名要看得懂**（如 `cover.png`、`discovery-phase2-workshop.png`），不要用 Figma 匯出的亂碼檔名。
  - **未來作品2-6比照這個模式**：`SomeProjectCaseStudy.tsx` + `content/some-project.ts` + `content/images/some-project/`，然後在 `App.tsx` 的 `ProjectPage` 裡加一個 id 判斷分支。
- 圖片優化工具：`npm run optimize-images`（一次性）／`npm run optimize-images:watch`（監看模式，丟圖進資料夾自動壓縮）。原地覆蓋、同檔名同路徑，PNG/JPEG 用 `sharp` 壓、GIF 用 `gifsicle` 壓。腳本在 `scripts/optimize-images.mjs`。**GIF 如果是螢幕錄影類的長動畫，壓縮效果有限（GIF格式先天限制），建議轉成 MP4**（`<video autoPlay loop muted playsInline>`），可省 60-90% 檔案大小，Outcome 區塊的手機截圖已經是這樣處理。

## 作品3目前進度（SDG Energy / SDGs 能源互動體驗設計）

**整頁架構已經做完**，Hero → Impact → Problem → Discovery → Design Process（獨立呈現 Version 1→2→3 介面迭代故事）→ Outcome → Reflection，全部有真實文案，圖片是從 Figma 截圖裁切出來的（Figma 檔案節點過大，`get_metadata` 對這個 node 一直回傳 SSE 解析錯誤，改用 `get_screenshot` 抓整頁再用 Python/Pillow 裁切成各區塊圖片，存進 `content/images/sdg-energy/`）。

**背景資訊：**
- 舊版能源互動裝置是**前一屆專案團隊留下的**，Sara 這次接手改版，並訪談了前案的 PM 與工程師來確認問題根源（不是 Sara 自己團隊的舊版）。
- 展出於 2021 台灣永續行動週（Taiwan SDGs Action Days）· 國父紀念館及中山公園廣場 · 主辦：立法院聯合國永續發展目標策進會、國立國父紀念館 · 承辦：紙風車文教基金會。這段資訊放在 Hero 區塊的 `exhibition` 欄位。
- Design Process 裡 Version 1→2→3 的手勢迭代故事：V1 是 Sara 提的翻轉指針（旋鈕）手勢但工程成本太高 → 工程師建議延用舊版旋轉手勢，但 Sara 認為不夠直覺、改用左右滑動 → V3 定案為「車用儀表板」視覺概念。

**卡住 / 還沒決定的事：**
1. 圖片是從 Figma 截圖裁切而來（非乾淨的原始 export），畫質已是 Figma 原始畫布解析度（1280px 寬）上限，如果之後 Sara 有更高解析度的原始素材，可以直接替換 `content/images/sdg-energy/` 裡對應檔名的圖。
2. 沒有專屬的 Reflection 照片，目前 Reflection 區塊是純文字 + Project Value 小卡片，沒有配圖（跟 Sharing Time / Community of Care 的 Reflection 都有照片不同，是刻意的版面差異）。

**下一步：** 沒有明確排定——上面 2 點任一項有新素材，直接接續處理即可。

## 作品1目前進度（Sharing Time / 企業服務：內部分享服務設計）

**整頁架構已經做完**，Hero → Impact → Problem → Discovery（含 Phase1/Phase2/Persona/利害關係人地圖）→ Design Process → Solution → Outcome（含 Service Blueprint + 數位化延伸 4 支 MP4）→ Reflection，全部有真實文案和真實圖片/影片，不是佔位內容。

**卡住 / 還沒決定的事：**
1. **Persona 4 張人物照片還沒有**——目前是「照片待上傳」空白佔位（`content/sharing-time.ts` 裡 `persona.cards[].photo` 是 `undefined`）。原本 Figma 匯出的兩張圖其實是研究看板截圖不是人像照，已經刪除。等 Sara 提供新照片後，存進 `src/content/images/sharing-time/`，用檔名告訴 Claude 就能接上。
2. **字體一致性未決**：Nav logo / 首頁 Hero 中文大標 / Next Project 連結 / Coming Soon fallback 這 4 處還是 Epilogue 字體，要不要統一成 Inter 還沒決定（見上方「字體」小節）。
3. Decision 區塊的 3 張競品參考圖、Service Blueprint 的左右兩張截圖，都是沿用最早 Figma 匯出的原始素材，還沒跟 Sara 確認是否為最終定案版本。

**下一步：** 沒有明確排定——上面 3 點任一項有新素材或決定，直接接續處理即可。

## 作品4目前進度（RWD Storybook / RWD 數位繪本互動網站設計）

**整頁架構已經做完**，Hero → Impact（含 User Feedback 社群留言）→ Problem（含 Users）→ Discovery（3 個假設卡）→ Decision Rationale（venn 圖）→ User Flow → Design Process（手機版優化 / 漸進式揭露 / 側邊導覽三個子區塊）→ Outcome（4 個重點 pill + Screens 截圖 + 後續實體展覽應用）→ Reflection，全部有真實文案，來源是 Figma 檔案 `Ib75XLreTXSmOdKhN7lhI6`（node `1:1115`）。

**背景資訊：**
- 與伊甸社會福利基金會合作，將原訂的線下早療知識展覽因疫情改為線上互動網站（「太空小英雄飛飛」故事＋3款互動遊戲），後續也延伸出實體展覽版本（黑洞歷險互動裝置等）。
- 這個 Figma node 跟 SDG Energy 一樣，`get_metadata`／`get_design_context` 對這個 node 直接回傳 SSE 解析錯誤（node 太大），改用 `get_screenshot` 抓整頁（1280×8431）再用 Python/Pillow 裁切成各區塊圖片，存進 `content/images/rwd-storybook/`。

**卡住 / 還沒決定的事：**
1. **專案年份是猜的**——`content/rwd-storybook.ts` 的 `meta.year` 目前寫 `"2021"`，是根據「疫情期間」的敘述推測、跟 SDG Energy 同年，Sara 當時問到年份時回答「沒有偏好」。這個欄位目前網站上幾乎不會顯示出來（因為 `ProjectCard` 有 `role` 時不會秀 `year`），但如果之後要精確標示，需要跟 Sara 再確認實際執行年份。
2. Decision Rationale 的 venn 圖、User Flow 的流程圖、側邊導覽邏輯圖，都是直接從 Figma 截圖裁切而來（非乾淨原始 export），文字是圖片裡烤進去的，不是可選取的真實文字——如果之後有更高解析度或可編輯的原始素材，可以替換。

**下一步：** 沒有明確排定——上面 2 點任一項有新素材或決定，直接接續處理即可。

## 待辦

- [ ] 取得 Persona 4 張人物照片，放進 `content/images/sharing-time/`，接上 `persona.cards[].photo`
- [ ] 決定 Epilogue 殘留的 4 處要不要統一成 Inter
- [ ] 確認 Decision 參考圖 / Service Blueprint 截圖是否為最終版本
- [ ] `PROJECTS` 陣列補齊到 6 個條目（目前 5 個：4 真實 + 1 個 `comingSoon`，還差 1 個）
- [ ] 作品 5-6：比照 Sharing Time 的三件套模式（案例頁元件 + content 資料檔 + images 資料夾）逐一開工，目前完全未開始
- [ ] （可選）SDG Energy 的圖片目前是 Figma 截圖裁切，如有更高解析度原始素材可替換
- [ ] （可選）RWD Storybook 的年份待 Sara 確認（見上方「作品4目前進度」）
- [ ] （可選）Nav 導覽列目前沒有特別重新設計過，只是自動吃到新色票；如果想要更貼合新設計系統可以再調整
