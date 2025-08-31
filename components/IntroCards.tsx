type IntroCard = { title: string; body: string; img: string; };
const introItems: IntroCard[] = [
  {
    title: "기업 행정 원스톱 지원",
    body: "법인설립부터 각종 신고·변경까지 실무 전 과정을 신속하고 정확하게 대행합니다.",
    img: "/images/intro-1.png",
  },
  {
    title: "인증 · 허가 컨설팅",
    body: "ISO·KC·HACCP 등 필수 인증과 인허가를 전략적으로 설계하고, 준비부터 심사 대응까지 동행합니다.",
    img: "/images/intro-2.png",
  },
  {
    title: "공공조달 · 사업화 지원",
    body: "나라장터 진입, 입찰·계약 지원을 통해 안정적인 매출 채널 확대를 돕습니다.",
    img: "/images/intro-3.png",
  },
  {
    title: "외국인 고용 · 비자",
    body: "출입국·고용허가·비자 변경 등 복잡한 절차를 체계적으로 관리합니다.",
    img: "/images/intro-4.png",
  },
];
export default function IntroCards() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
          <span className="text-white">성장을 돕는 행정 파트너</span>{"-"}
          <span className="text-white">행정 편의와 인증·컨설팅을 원스톱으로 제공합니다.</span>
        </h2>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {introItems.map((it) => (
          <li key={it.title} className="rounded-2xl bg-white overflow-hidden shadow">
            <img src={it.img} alt={it.title} className="w-full h-36 object-cover" />
            <div className="p-4 space-y-2">
              <div className="font-semibold">{it.title}</div>
              <p className="text-sm text-gray-700">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
