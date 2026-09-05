# CLAUDE.md

指引 Claude Code 在這個作品集網站專案裡工作時使用。這份文件是給「接手 session」看的進度筆記，不是給訪客看的網站文件。

## 常用指令

都從 `Modern Portfolio Website/` 這個資料夾底下執行：

```bash
npm run dev                    # 啟動本機開發伺服器
npm run build                  # 打包成正式版
npm run optimize-images        # 一次性壓縮 content/images 底下的圖片
npm run optimize-images:watch  # 監看模式，丟新圖進資料夾會自動壓縮
```

目前沒有設定 lint 或測試指令（`package.json` 裡沒有 `lint`／`test` script），不要假設有並嘗試執行。

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

## Sync AI Prototype 目前進度

一個獨立於作品集主站的**互動原型**，不是案例頁的一部分，做完之前刻意不放出任何可點擊的連結。

- **入口**：`src/app/App.tsx` 裡的隱藏 hash 路由，只能透過網址 `#sync-ai-prototype` 進入（真的重新整理頁面才會生效，不是單純換 state）。
- **程式碼位置**：`src/app/sync-ai-prototype/`
  - `state.ts` — `Decision` 物件（唯一資料來源）、`FlowState`、`prototypeReducer`。**重寫時要注意**：現在示範資料是 2 個 Decision（整體頁面設計、CTA 視覺層級），原本 `PrototypeState.decision: Decision` 這種單一物件的寫法撐不住，要改成 `decisions: Decision[]`（或用 id 索引的物件），並且要有一個「目前正在看第幾項」的游標狀態，給 D6、C3a/C3b 這類逐項審核畫面用（2026-08-28 因為擴大到 2 項而新增的架構要求，之前只有 1 項時沒這個問題）。
  - `ui.tsx` — 色票 `c`、`StatusBadge`、`LoadingChecklist`（共用元件，靠 props 決定畫面）
  - `DesignerConsole.tsx` — 設計師端 D1–D11
  - `ClientReview.tsx` — 客戶端 C1–C7（含 C3a／C3b，逐項查看畫面）
  - `SyncAiPrototype.tsx` — 入口，掛 `useReducer`，決定顯示哪個 surface
- **已完成並驗證（2026-09-04，經過兩輪跟 wireframe 逐畫面重新比對後的修正）**：設計師端 D1–D7 + S4/S5/S5b（彈窗）+ D8/D8b；客戶端 C1–C5（含 C3a/C3b 逐項、C4 補充建議）。已在瀏覽器裡實際跑過兩條分支並截圖確認：(a) C3a/C3b 都按「確認設計」→ 全部確認後自動跳 C5「已確認並回傳設計師」→ D8「已確認」雙勾；(b) C3b 改點「補充建議」送出、不確認 → C3b 停在原地（不會自動跳走，因為沒有全部確認）→ 用畫面最上方（phone/desktop frame 外面）的「查看設計師端」切換鈕直接跳去看 D8b「回饋與建議」，CTA 那行顯示建議內容。D8 或 D8b 完全由 `decisions` 的實際 `status` 決定，任何項目都可以走任一分支。「查看設計師端」是本原型單人扮演雙角色用的手動切換鈕（`DESIGNER_CHECK_RESOLUTION`），2026-09-04 第二輪比對後從 C5 卡片內部移到 SyncAiPrototype 最上層導覽列（`state.surface === "client"` 時顯示），因為 wireframe 明確要求 C5 卡片本身不能有這種功能。S1-S3（AI 不確定性彈窗）還沒做。
  - **2026-09-04 第一輪修正**：(1) D6 原本用單一個 `ADVANCE_REVIEW` action 同時做「確認當前項＋前進到下一項」，不能回頭看已經切過的項目；改成新增 `SET_REVIEW_CURSOR` action，讓標題旁的「‹ N / M ›」變成真的可以左右自由切換的按鈕（跟確認狀態完全無關），「已確認說明 →」的 disabled 條件也從只看目前這項改成 `selected.every(d => d.reviewed)`。(2) S5 原本直接把 S5b 的「連結已產生」內容當成整個 `link_ready` 畫面；改成 `link_ready`（S5，「預覽接收端頁面」＋「複製連結」）跟 `link_copied`（S5b，「連結已產生」＋「已複製」，2026-09-05 使用者要求拿掉按鈕文字後面的 ✓，前面的 icon 維持）兩個獨立 flow，新增 `FINISH_SHARE` action 讓 S5b 關閉彈窗回到 D7。
  - **2026-09-04 第二輪修正（wireframe 又改了 C3a/C3b/C4/C5）**：C3a/C3b 標題列改成 `DetailHeader`（‹›各自貼邊、標題下方縮小淡化的「N/M」，到頭尾會 disabled），「發生了什麼變化」底下的灰階示意圖改成 `MiniPagePreview`（迷你瀏覽器列＋版面線條＋深灰 CTA 色塊，C3b 的 CTA 刻意比 C3a 大且有邊框，對應「CTA 視覺層級」這個決策），按鈕改名「補充建議」／「確認設計」且等寬（原本 flex 1:2 改成 1:1）。連帶把 C3a/C3b 的確認邏輯也改成跟 D6 一致：`CLIENT_CONFIRM_CURRENT` 不再自動前進到下一項（改用新的 `SET_CLIENT_CURSOR` 自由切換，取代原本身兼「前進／略過完成」雙重角色的 `CLIENT_NEXT_DETAIL`，已移除），全部項目都確認才會自動轉場到 C5——這代表 C5 現在**只有**全部確認的分支會到達，「只留言不確認」的示範路徑不再經過 C5，直接用上面說的「查看設計師端」切換鈕跳去看 D8b。C4 的 id/catalog 名稱從「留言」改成「補充建議」（畫面上的 header 文字本來就是「留下建議」，沒變）。C5 文案改成大標「已確認並回傳設計師」→小標「無需進一步操作，有變更會再通知您」→細項「整體頁面設計、CTA 視覺層級・剛剛」，拿掉「查看設計師端結果」按鈕（見上一條）。
  - **2026-09-05 使用者要求的行為調整（不是 wireframe 規格，是使用者明確拍板要的）**：D6「確認」跟 C3a/C3b「確認設計」都改成確認後自動前進到下一項（不是最後一項時），`CONFIRM_EXPLANATION`／`CLIENT_CONFIRM_CURRENT` 各自在標記完成後順便把 `reviewCursor`／`clientCursor` +1。「‹ ›」還是能自由手動切換回去看已確認過的項目，只是「確認」多了一個「順便前進」的副作用，不是像原本那樣完全脫鉤。這跟第二輪修正時刻意讓「確認」與「‹ ›」導覽脫鉤的邏輯有點矛盾（前後兩次修正的取捨不同），但使用者在看過兩者的技術複雜度落差（低）跟取捨說明後選了現在這版，之後如果要重新脫鉤要記得回頭改這兩個 reducer case。
  - **2026-09-05 S5b「已複製」按鈕拆分（使用者反饋原本設計奇怪）**：原本「已複製 ✓」同一顆按鈕兼職「狀態顯示」跟「關閉彈窗的動作」，使用者反饋「都已經複製了為什麼還要再按一次」。改成狀態（純文字「✓ 已複製到剪貼簿」，不能點）跟動作（獨立的「完成 →」按鈕，dispatch `FINISH_SHARE`）分開，兩者不再共用同一個元素。這是在三個選項（自動關閉／拆開狀態與動作／按鈕文字改成「完成」但維持同一顆）裡，使用者選了「拆開」這個方向。
  - **2026-09-05 S5「預覽接收端頁面」做成真的可以用（同日重做過一次，第一版方向錯了）**：第一版做法是切換 `surface` 到 `"client"`、重用真正的 `ClientReview` 元件當預覽，結果使用者指出兩個問題：(1) 切 surface 會讓整個 `DesignerConsole` 桌機外框被換掉，畫面看起來像跳出了原本的視窗，但預覽這件事應該還是「在桌機視窗裡」發生的；(2) 預覽的目的只是讓設計師確認圖跟文字有沒有清楚標示，不需要真的能點「留言」「確認設計」這些互動。因此整個重做：拿掉 `previewSnapshot`／`ENTER_PREVIEW`／`EXIT_PREVIEW`（這套「暫存再還原」機制是為了怕預覽時誤觸互動才設計的，既然預覽不可互動，安全網也用不到了），改成 `DesignerConsole.tsx` 內部的本地 `useState`（`previewOpen`），S5「預覽接收端頁面」按鈕改成 `setPreviewOpen(true)`，疊出一個唯讀的 `PreviewSheet`：跟 S4/S5 一樣蓋在同一個桌機容器裡（`DesignerConsole` 全程不卸載、外框一直都在），但尺寸做得比小彈窗大很多、內容一頁式由上往下捲動——先是 C2 那張整體版面配置縮圖（數字標記），接著兩個決策各自的示意圖＋「發生了什麼變化／為什麼／背景脈絡」文字，一路排下去，沒有任何按鈕互動，純粹用來核對內容。共用的 `MiniPagePreview`（C3a/C3b 那個迷你瀏覽器列＋CTA 色塊示意圖）從 `ClientReview.tsx` 搬到 `ui.tsx`，讓 `DesignerConsole.tsx` 也能 import 使用，不是複製一份。
- **術語規則：全產品不能出現「核准」這個詞，一律用「確認」**（2026-08-27 使用者明確要求）。影響範圍包含未來要寫的程式碼：`DecisionStatus` 的 `"approved"` 這個 enum 值可以維持英文（使用者看不到），但任何會被畫面顯示出來的文字、變數如果之後要顯示中文標籤，一律用「確認」不要用「核准」；`approvedBy`/`approvedAt` 這兩個欄位名稱目前還沒被任何畫面用到，可以考慮改名成 `confirmedBy`/`confirmedAt` 保持一致，写程式碼時再一併處理。
- **核心原則，重構時不要合併**：`flow`（導覽用，決定畫面）跟 `decision.status`（確認狀態，決定 StatusBadge 顏色文字）是兩條獨立軸線，故意不合成一個狀態機，因為同一個 `decision.status` 要被 8 個以上畫面共用。
- **外部參考文件（唯一可信來源，不在 repo 裡，是 Claude Artifact，開始寫 D1-D11 之前一定要重新讀一次，內容比這份 CLAUDE.md 新）**：
  - Wireframe（21 個畫面全灰階，正式規格尺寸 390×844 / 1440×900）：`https://claude.ai/code/artifact/1e16b7f3-23a2-4b47-af14-55380cbb024c`
  - 需求分析／架構圖／產品邊界（FR 編號 FR1-FR13）：`https://claude.ai/code/artifact/a2e803f6-04e0-4e88-812b-8355859132a1`
- **設計師端完整流程是 D1-D11，2026-08-28 確認的最新順序**（跟程式碼現況不一樣，見上面「已完成」那條）：
  1. D1 掃描中：只確認「有東西」，不揭露內容
  2. D2 交付設定：唯一選擇動作是挑模式卡片（視覺溝通／開發交付），不是「交付對象」＋「模式」兩排獨立 pill
  3. D3 偵測結果列表：掃描不是只找到 1 個項目，是列出所有候選重點（示範資料 4 項，勾 2 項：整體頁面設計、CTA 視覺層級）
  4. D4 確認生成清單：設計師可以新增／移除／確認要生成說明的項目，示範資料鎖定最終 2 項（2026-08-28 從 1 項擴大到 2 項，驗證清單／逐項審核殼子撐得住多項目，不是只做給單一決策看的假殼子）
  5. D5 AI 轉譯中：designerRationale → clientExplanation
  6. D6 審核與微調：文字框跟「編輯」「確認」兩個按鈕做成同一個元件，不是分開飄浮的兩塊；逐項確認，每項確認完留一行進度紀錄（例如「整體頁面設計・已確認說明」）；全部項目確認完後按「已確認說明 →」，不是直接送出，而是彈出 S4／S5（見下一條）
  7. S4／S5（彈窗，不佔 D 編號）：S4 是「是否開啟接收方設計確認功能」[是]／[否] 選擇（2026-08-28 從 D6 內嵌卡片抽出來變成獨立彈窗），S5 是「連結已產生」，主要動作是複製連結，LINE／Slack／Email 是展示用分享管道
  8. D7 Review Ready：卡片顯示「2 個設計決策」，帶「未閱覽」標籤，是跟 D8 對照的 Before 狀態
  9. D8／D8b：客戶回覆後的分支（見下一條）
  10. D9 模擬變更、D10 變更偵測、D11 重新確認完成：核心的版本重新確認迴圈
- **D7/D8 是刻意設計的 Before/After 對照（2026-08-27 使用者要求）**：D7 顯示「未閱覽」，D8 是分支：客戶兩項都按確認 → 「設計已確認」（接續 D9-D11 迴圈）；客戶只留言沒確認 → 「設計需調整」（wireframe 裡的 D8b，走回 D1 重新掃描，不進入 D9-D11 迴圈）。
- **示範資料是 2 個決策，不是 1 個（2026-08-28 使用者要求擴大）**：整體頁面設計、CTA 視覺層級。C3 拆成 C3a（整體頁面設計，1/2）／C3b（CTA 視覺層級，2/2），C2 整頁 mockup 上有 2 個數字標記對應這兩項。但 D9-D11／C6-C7 的重新確認迴圈刻意只針對 CTA 這一項示範版本變更，不是兩項都要重新確認一次，理由：這個迴圈的敘事本來就是「其中一項後來被改動」，不需要每個決策都各自跑一次相同的迴圈才能證明機制成立。
- **下一步優先順序（2026-09-04 修正）**：
  1. **D9→D10→D10b→C6→C7→D11**（模擬版本變更 → 變更偵測／已生成差異說明 → 設計師確認差異說明 → 通知客戶重新審查 → 客戶再次確認 → 設計師看到重新確認完成）。reducer 裡對應的 action（`SIMULATE_CHANGE`／`REDETECT`／`EDIT_DIFF_NOTE`／`CONFIRM_DIFF_NOTE`／`NOTIFY_CLIENT_REPROMPT`／`CLIENT_OPEN_REPROMPT_DETAIL`／`CLIENT_RECONFIRM`／`DESIGNER_SEE_RECONFIRMED`）跟 flow 值都已經在 `state.ts` 裡定義好了，只差畫面。示範資料刻意只針對 CTA 這一項模擬變更（見下面「示範資料」那條），不用兩項都跑一次。D8/D8b 畫面目前是乾淨的終點（沒有「下一步」按鈕），接這段時要在 D8/D8b 補一個觸發 `SIMULATE_CHANGE` 的按鈕或入口。
  2. S1-S3（AI 不確定性彈窗，掛在 D5 底下）、視覺打磨排在最後，就算沒做完也不影響上面那步的核心論點。
- **顏色系統**：目前 wireframe 是灰階，之後要從使用者提供的 Figma 參考截圖（`3x3GJs4NpYvHVh9qAey2GD` 檔案，node 1:13／1:220／1:405／1:621）延伸出色票，不能直接套用作品集現有的深綠 Version C 色票。

## 待辦

- [ ] 取得 Persona 4 張人物照片，放進 `content/images/sharing-time/`，接上 `persona.cards[].photo`
- [ ] 決定 Epilogue 殘留的 4 處要不要統一成 Inter
- [ ] 確認 Decision 參考圖 / Service Blueprint 截圖是否為最終版本
- [ ] `PROJECTS` 陣列補齊到 6 個條目（目前 5 個：4 真實 + 1 個 `comingSoon`，還差 1 個）
- [ ] 作品 5-6：比照 Sharing Time 的三件套模式（案例頁元件 + content 資料檔 + images 資料夾）逐一開工，目前完全未開始
- [ ] （可選）SDG Energy 的圖片目前是 Figma 截圖裁切，如有更高解析度原始素材可替換
- [ ] （可選）RWD Storybook 的年份待 Sara 確認（見上方「作品4目前進度」）
- [ ] （可選）Nav 導覽列目前沒有特別重新設計過，只是自動吃到新色票；如果想要更貼合新設計系統可以再調整
