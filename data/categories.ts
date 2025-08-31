export type Subcategory = { slug: string; title: string };
export type Category = {
  slug: string;
  title: string;
  description?: string;
  children?: Subcategory[];
};

export const categories: Category[] = [
  {
    slug: "business-admin",
    title: "기업행정",
    description: "기업의 각종 행정 편의, 인증 및 컨설팅 원스톱 지원",
    children: [
      { slug: "corp-cert", title: "기업인증" },
      { slug: "tech-cert", title: "기술인증" },
      { slug: "product-cert", title: "제품인증" },
      { slug: "mfds-cert", title: "식약처인증" },
      { slug: "venture-cert", title: "벤처인증" },
      { slug: "rnd-dept", title: "연구전담부서" },
      { slug: "innobiz", title: "이노비즈" },
      { slug: "mainbiz", title: "메인비즈" },
      { slug: "iso", title: "ISO 인증" },
      { slug: "kc", title: "KC 인증" },
      { slug: "eco-label", title: "환경표시인증" },
      { slug: "disaster-safety", title: "재난안전인증" },
      { slug: "nep-net", title: "NEP/NET" },
      { slug: "corp-inc", title: "법인설립(신규,합작)" },
      { slug: "gmp", title: "GMP" },
      { slug: "patent", title: "특허" },
      { slug: "re-100", title: "RE 100" },
      { slug: "esg", title: "ESG" },
      { slug: "health-food", title: "건강기능식품 인증" },
      { slug: "haccp", title: "HACCP 인증" },
      { slug: "radio", title: "전파인증" },
      { slug: "gs", title: "GS인증" },
      { slug: "gap", title: "GAP 인증" },
      { slug: "gov-funding", title: "정부지원사업" },
    ],
  },

  {
    slug: "public-procurement",
    title: "공공조달",
    description: "조달 등록부터 우수·혁신제품, MAS, 나라장터까지",
    children: [
      { slug: "procurement-consult", title: "조달등록/컨설팅" },
      { slug: "procurement-excellent-products", title: "조달우수제품" },
      { slug: "joint-brand-cert", title: "우수조달공동상표인증" },
      { slug: "innov-product-prototype", title: "혁신제품/시제품" },
      { slug: "venture-nara", title: "벤처나라등록" },
      { slug: "mas-contract", title: "다수공급자계약(MAS)" },
      { slug: "narajangteo", title: "나라장터" },
    ],
  },

  {
    slug: "immigration-trade",
    title: "출입국·수출입업무",
    description: "출입국관리, 비자·체류, 국적 관련 절차",
    children: [
      { slug: "immigration-control", title: "출입국관리" },
      { slug: "visa", title: "비자" },
      { slug: "foreign-residency", title: "외국인체류" },
      { slug: "naturalization", title: "귀화" },
      { slug: "nationality-recovery", title: "국적회복" },
      { slug: "ok-status-change", title: "재외동포자격변경" },
    ],
  },

  {
    slug: "licensing",
    title: "인허가업무",
    description: "공장·시설 등록, 영업허가/신고, 기타 인허가",
    children: [
      { slug: "factory-facility-reg", title: "공장/시설등록" },
      { slug: "business-permit-report", title: "영업허가/신고" },
      { slug: "other-licenses", title: "기타인허가" },
    ],
  },

  {
    slug: "other-admin",
    title: "기타행정업무",
    description: "부동산 컨설팅, 법인/단체 설립, 공익법인",
    children: [
      { slug: "realestate-dev-consult", title: "부동산개발컨설팅" },
      { slug: "realestate-mgmt-consult", title: "부동산관리컨설팅" },
      { slug: "realestate-change-consult", title: "부동산변경컨설팅" },
      { slug: "land-compensation", title: "토지보상" },
      { slug: "street-housing-maintenance", title: "가로주택정비사업" },
      { slug: "nonprofit-establishment", title: "비영리단체 설립" },
      { slug: "incorporated-association", title: "사단법인 설립" },
      { slug: "foundation-establishment", title: "재단법인 설립" },
      { slug: "public-interest-corp", title: "공익법인(지정기부금단체)" },
    ],
  },
];
