// data/servicesContent.ts
import type { Section } from './types';

export type SubContent = { subSlug: string; title: string; sections: Section[] };
export type CategoryContent = { categorySlug: string; subs: SubContent[] };

/**
 * 이미지 파일 네이밍 규칙(실제 파일 배치 필요):
 * /public/images/services/{categorySlug}/{subSlug}/{categorySlug}__{subSlug}__slide-{n}.webp
 * 예) /public/images/services/business-admin/innobiz/business-admin__innobiz__slide-1.webp
 *
 * 아래 섹션의 image.src는 위 규칙을 따릅니다.
 */
export const serviceContents: CategoryContent[] = [
  // 1) 기업행정
  {
    categorySlug: "business-admin",
    subs: [
      // 이노비즈
      {
        subSlug: "innobiz",
        title: "이노비즈",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/inobiz/inobiz-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 메인비즈
      {
        subSlug: "mainbiz",
        title: "메인비즈",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/mainbiz/mainbiz-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 벤처기업 확인
      {
        subSlug: "venture-cert",
        title: "벤처기업 확인",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/venture/venture-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 기업부설연구소 / 연구전담부서
      {
        subSlug: "rnd-dept",
        title: "기업부설연구소 / 연구전담부서",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/rnd-dept/rnd-dept-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // ISO 인증
      {
        subSlug: "iso",
        title: "ISO 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/iso/iso-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/iso/iso-2.png", caption: "", layout: "center" 
          }
        ]
      },

      // NEP-NET 인증
      {
        subSlug: "nep-net",
        title: "NEP/NET 인증",
        sections: [
          {
            type: "text",
            title: "NEP",
            html: `<p></p>`
          },
          { 
            type: "image", src: "/images/services/business-admin/nep-net/nep-net-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "NET",
            html: `<p></p>`
          },
          { 
            type: "image", src: "/images/services/business-admin/nep-net/nep-net-2.png", caption: "", layout: "center" 
          }
        ]
      },

      // 녹색 인증
      {
        subSlug: "green",
        title: "녹색 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/green/green-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // EPC 인증
      {
        subSlug: "epc",
        title: "성능 인증(EPC)",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/epc/epc-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // KC 인증
      {
        subSlug: "kc",
        title: "KC 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/kc/kc-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // GS 인증
      {
        subSlug: "gs",
        title: "GS 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/gs/gs-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // GR 인증
      {
        subSlug: "gr",
        title: "GR 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/gr/gr-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // KS 인증
      {
        subSlug: "ks",
        title: "KS 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/ks/ks-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/ks/ks-2.png", caption: "", layout: "center" 
          }
        ]
      },

       // K마크 인증
      {
        subSlug: "kmark",
        title: "K마크 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/kmark/kmark-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // S마크 인증
      {
        subSlug: "smark",
        title: "S마크 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/smark/smark-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 업허가
      {
        subSlug: "lisence",
        title: "의료기기/화장품/의약외품/식품 - 업허가",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/lisence/lisence-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 품목인증
      {
        subSlug: "prd-cert",
        title: "의료기기/화장품/의약외품/식품 - 품목인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/prd-cert/prd-cert-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // GMP
      {
        subSlug: "gmp",
        title: "GMP 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/gmp/gmp-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/gmp/gmp-2.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/gmp/gmp-3.png", caption: "", layout: "center" 
          }
        ]
      },

      // HACCP 인증
      {
        subSlug: "haccp",
        title: "의료기기/화장품/의약외품/식품 - HACCP 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/haccp/haccp-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/haccp/haccp-2.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/haccp/haccp-3.png", caption: "", layout: "center" 
          }
        ]
      },

      // 기타 인증
      {
        subSlug: "etc-cert",
        title: "의료기기/화장품/의약외품/식품 - 기타 인증",
        sections: [
          { 
            type: "image", src: "/images/services/business-admin/etc-cert/etc-cert-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/etc-cert/etc-cert-2.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/business-admin/etc-cert/etc-cert-3.png", caption: "", layout: "center" 
          }
        ]
      },

    ]
  },

  {
    categorySlug: "public-procurement",
    subs: [
      // 나라장터
      {
        subSlug: "narajangteo",
        title: "나라장터",
        sections: [
          { 
            type: "image", src: "/images/services/public-procurement/narajangteo/narajangteo-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/public-procurement/narajangteo/narajangteo-2.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/public-procurement/narajangteo/narajangteo-3.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/public-procurement/narajangteo/narajangteo-4.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/public-procurement/narajangteo/narajangteo-5.png", caption: "", layout: "center" 
          },
          
        ]
      },

      // 직접생산 확인 증명서
      {
        subSlug: "self-production",
        title: "직접생산 확인 증명서",
        sections: [
          { 
            type: "image", src: "/images/services/public-procurement/self-production/self-production-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 경쟁입찰 참가자격 등록
      {
        subSlug: "compet-bid",
        title: "경쟁입찰 참가자격 등록",
        sections: [
          { 
            type: "image", src: "/images/services/public-procurement/compet-bid/compet-bid-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 다수 공급자 계약 (MAS) 
      {
        subSlug: "mas-contract",
        title: "다수 공급자 계약 (MAS)",
        sections: [
          { 
            type: "image", src: "/images/services/public-procurement/mas-contract/mas-contract-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 벤처나라 등록
      {
        subSlug: "venture-nara",
        title: "벤처나라 등록",
        sections: [
          { 
            type: "image", src: "/images/services/public-procurement/venture-nara/venture-nara-1.png", caption: "", layout: "center" 
          }
        ]
      },

      // 혁신-시제품 지정 신청
      {
        subSlug: "innov-product-prototype",
        title: "혁신ㆍ시제품 지정 신청",
        sections: [
          { 
            type: "image", src: "/images/services/public-procurement/innov-product-prototype/innov-product-prototype-1.png", caption: "", layout: "center" 
          }
        ]
      },

    ]
  },

  {
    categorySlug: "immigration-trade",
    subs: [
      // VISA 업무
      {
        subSlug: "visa",
        title: "비자 업무",
        sections: [
          { 
            type: "image", src: "/images/services/immigration-trade/visa/visa-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "비자 발급 및 초정 업무",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/immigration-trade/visa/visa-2.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          
        ]
      },

      // 외국인 체류 업무
      {
        subSlug: "foreign-residency",
        title: "외국인 체류 업무",
        sections: [
          {
            type: "text",
            title: "국내 체류 관리 업무",
            html: `<p></p>`
          },
          { 
            type: "image", src: "/images/services/immigration-trade/foreign-residency/foreign-residency-1.png", caption: "", layout: "center" 
          }
          
        ]
      },

      // 귀화 업무
      {
        subSlug: "naturalization",
        title: "귀화 업무",
        sections: [
          {
            type: "text",
            title: "영주권 및 국적취득 업무",
            html: `<p></p>`
          },
          { 
            type: "image", src: "/images/services/immigration-trade/naturalization/naturalization-1.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/immigration-trade/naturalization/naturalization-2.png", caption: "", layout: "center" 
          },
          {
            type: "text",
            title: "",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/immigration-trade/naturalization/naturalization-3.png", caption: "", layout: "center" 
          }
          
        ]
      },

      // 기타 권익보호 및 행정심판 업무
      {
        subSlug: "rights-protection",
        title: "기타 권익보호 및 행정심판 업무",
        sections: [
          {
            type: "text",
            title: "기타 권익보호 및 행정심판 업무",
            html: `<br></br>`
          },
          { 
            type: "image", src: "/images/services/immigration-trade/rights-protection/rights-protection-1.png", caption: "", layout: "center" 
          }
          
        ]
      },

    ]
  },

];
