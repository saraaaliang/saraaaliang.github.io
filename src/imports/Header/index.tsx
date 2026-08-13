import { motion } from "motion/react";
import imgImage from "./1b00c47ef046255e030c6eb7c1be703ce950efd3.png";

function HeadlineSubhead1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-semibold items-start leading-[0] relative shrink-0 text-[#2d2d2d] w-[766px]" data-name="Headline + Subhead">
      <div className="flex flex-col font-['Epilogue:SemiBold','Noto_Sans_JP:Medium',sans-serif] h-[135px] justify-center relative shrink-0 text-[0px] w-[737px] whitespace-pre-wrap">
        <p className="leading-[50px] mb-0 text-[22px]">{`Sara is a UX Designer, UX researcher and Service Designer. `}</p>
        <p className="text-[18.4px] tracking-[0.92px]">
          <span className="font-['Epilogue:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[50px]">7年設計顧問公司經驗</span>
          <span className="font-['Epilogue:ExtraLight','Noto_Sans_JP:Medium',sans-serif] font-extralight leading-[50px]">{` | `}</span>
          <span className="font-['Epilogue:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[50px]">{`2年使用者研究&服務設計`}</span>
          <span className="font-['Epilogue:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[50px]">經驗</span>
          <span className="font-['Epilogue:ExtraLight','Noto_Sans_JP:Medium',sans-serif] font-extralight leading-[50px]">{` | `}</span>
          <span className="font-['Epilogue:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[50px]">20+個數位體驗設計</span>
        </p>
      </div>
      <div className="flex flex-col font-['Epilogue:SemiBold','Noto_Sans_JP:Bold',sans-serif] justify-center relative shrink-0 text-[46px] w-[662px]">
        <p className="leading-[70px]">善於將複雜議題轉化為清楚易懂的數位體驗。作品橫跨AI工具, 公共, 健康及教育領域。</p>
      </div>
    </div>
  );
}

function HeadlineSubhead() {
  return (
    <motion.div className="content-stretch flex flex-col items-start justify-center pl-[25px] relative shrink-0 w-[716px]" data-name="Headline + Subhead">
      <HeadlineSubhead1 />
    </motion.div>
  );
}

function Header1() {
  return (
    <motion.div className="content-stretch flex gap-px items-center relative shrink-0 w-full" data-name="Header">
      <HeadlineSubhead />
      <motion.div className="h-[343px] relative shrink-0 w-[340px]" data-name="Image">
        <div className="absolute inset-0 mix-blend-multiply overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[84.85%] left-0 max-w-none top-[15.21%] w-[99.97%]" src={imgImage} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[118px] pt-[46px] px-[100px] relative size-full" data-name="Header">
      <Header1 />
    </div>
  );
}