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
      { slug: "innobiz", title: "이노비즈" },
      { slug: "mainbiz", title: "메인비즈" },
      { slug: "rnd-dept", title: "연구전담부서" },
      { slug: "iso", title: "ISO 인증" },
      { slug: "nep-net", title: "NEP/NET" },
      { slug: "green", title: "녹색 인증" },
      { slug: "epc", title: "성능 인증" },
      { slug: "kc", title: "KC 인증" },
      { slug: "gs", title: "GS인증" },
      { slug: "gr", title: "GR인증" },
      { slug: "ks", title: "KS인증" },
      { slug: "kmark", title: "K마크 인증" },
      { slug: "smark", title: "S마크 인증" },
      { slug: "lisence", title: "업허가" },
      { slug: "prd-cert", title: "품목인증" },
      { slug: "gmp", title: "GMP 인증" },
      { slug: "haccp", title: "HACCP 인증" },
      { slug: "etc-cert", title: "기타 인증" },
    ],
  },

  {
    slug: "public-procurement",
    title: "공공조달",
    description: "조달 등록부터 우수·혁신제품, MAS, 나라장터까지",
    children: [
      { slug: "narajangteo", title: "나라장터" },
      { slug: "self-production", title: "직접생산 확인 증명서" },
      { slug: "compet-bid", title: "경쟁입찰 참가자격 등록" },
      { slug: "mas-contract", title: "다수 공급자 계약 (MAS)" },
      { slug: "venture-nara", title: "벤처나라 등록" },
      { slug: "innov-product-prototype", title: "혁신ㆍ시제품 지정 신청" },      
    ],
  },

  {
    slug: "immigration-trade",
    title: "출입국·수출입업무",
    description: "출입국관리, 비자·체류, 국적 관련 절차",
    children: [
      { slug: "visa", title: "비자" },
      { slug: "foreign-residency", title: "외국인 체류 업무" },
      { slug: "naturalization", title: "귀화 업무" },
      { slug: "rights-protection", title: "기타 권익보호 및 행정심판 업무" },
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
