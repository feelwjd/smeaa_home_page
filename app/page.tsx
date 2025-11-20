import Slider from "@/components/Slider";
import IntroCards from "@/components/IntroCards";
import CategoryCards from "@/components/CategoryCards";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  return (
      <>
      <BackgroundVideo
        srcMp4="/video/office.mp4"
        srcWebm="/video/office.webm"
        poster="/images/hero-1.jpg"
        darken
      />
      <div className="space-y-12">
      <Slider
        slides={[
          {
            src: "/images/hero-1.jpg",
            headline: `SME 행정사 합동사무소에 오신 것을\n진심으로 환영합니다.`,
            subline: "기업 행정 전 과정을 원스톱으로 지원합니다.",
          },
          {
            src: "/images/hero-2.jpg",
            headline: "성공 비즈니스를 위한 최적의\n행정 솔루션을 제공합니다.",
            subline: "기업 행정 전 과정을 원스톱으로 지원합니다.",
          },
          {
            src: "/images/hero-3.jpg",
            headline: "SME 만의 전문성과 문제 해결 능력 그리고\n신뢰할 수 있는 파트너로서의 역할에 최선을 다하겠습니다.",
            subline: "기업 행정 전 과정을 원스톱으로 지원합니다.",
          },
        ]}
        autoMs={7000}
        withOverlayText
        // ↓ 아래 두 prop은 '슬라이드별 텍스트가 없을 때'의 기본값으로만 쓰입니다.
        headline={`SME 행정사 합동사무소에 오신 것을\n진심으로 환영합니다.`}
        subline="다양한 기업 행정 서비스로 성공적인 사업을 위해 함께 고민하겠습니다."
      />
      <IntroCards />
      <CategoryCards />
      <section className="rounded-2xl overflow-hidden shadow">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700" />
          <img src="/images/contact.png" className="w-full h-64 object-cover" alt="bg" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-6xl px-6 w-full">
              <h2 className="text-white text-xl md:text-2xl font-bold">빠른상담신청</h2>
              <p className="text-white/90 text-sm mt-1">이민행정업무와 관련된 모든 분야의 방향성을 제시해 드립니다.</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8">
          <form className="space-y-4 max-w-3xl" action="https://formspree.io/f/xbldvzay" method="POST">
            <div>
              <label className="block text-sm font-medium">이름*</label>
              <input name="name" className="mt-1 w-full rounded-xl border px-3 py-2" required />
            </div>
            <div className="grid md:grid-cols-[120px_1fr] gap-3">
              <div>
                <label className="block text-sm font-medium">연락처*</label>
                <select name="phone_prefix" className="mt-1 w-full rounded-xl border px-3 py-2">
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
              </div>
              <div className="self-end">
                <input name="phone" placeholder="숫자만 입력" className="w-full rounded-xl border px-3 py-2" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">신청내용</label>
              <input name="subject" className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="예: E7 비자 문의" />
              <textarea name="message" className="mt-2 w-full rounded-xl border px-3 py-2 min-h-[120px]" required />
            </div>
            <div className="rounded-xl border p-3 text-sm text-gray-700 bg-gray-50">
              <div className="font-medium">개인정보 수집 및 이용에 관한 안내</div>
              <p className="mt-1">회사는 개인정보보호방침 또는 이용약관의 내용에 대해 ‘동의함’ 버튼을 클릭하시면 개인정보 수집에 동의한 것으로 봅니다.</p>
              <div className="mt-2 flex items-center gap-6">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="agree" value="agree" required /> 동의함
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="agree" value="disagree" /> 동의안함
                </label>
              </div>
            </div>
            <button type="submit" className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">상담신청</button>
          </form>
        </div>
      </section>
    </div>
    </>
  );
}
