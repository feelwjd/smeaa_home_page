import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import PageTransition from "@/components/PageTransition";
import Script from "next/script";
import RootBackgroundVideo from "@/components/RootBackgroundVideo";
import FitViewportMain from "@/components/FitViewportMain";

export const metadata = {
  title: "행정사합동사무소",
  description: "기업 인증·인허가·조달 전문가 홈페이지",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-no-fouc>
      <head>
        {/* 초기 페인트 깜빡임 완전 차단 + 한 번만 페이드인 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* 기본은 보이도록 정의(전환 포함) */
              body{opacity:1;transition:opacity .38s cubic-bezier(.22,1,.36,1)}
              /* SSR~하이드레이션까지는 절대 보이지 않음 */
              html[data-no-fouc] body{opacity:0}
            `,
          }}
        />
        {/* 필요하면 히어로 이미지/포스터 선로드 */}
        {/* <link rel="preload" as="image" href="/images/hero-1.jpg" /> */}
      </head>
      <body className="min-h-screen">
        {/* 전역 배경 비디오: 홈(/)에서만 보이되, 컴포넌트는 언마운트되지 않아 재진입 시 즉시 표시 */}
        <RootBackgroundVideo
          srcMp4="/video/office.mp4"
          srcWebm="/video/office.webm"
          poster="/images/hero-1.jpg"
          darken
        />
        <header className="relative z-10 border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-6">
            <Link href="/" className="flex items-center" aria-label="SME 행정사 합동사무소">
              <img
                src="/logo.png"
                alt="SME 행정사 합동사무소"
                className="h-8 w-auto"   // 높이만 조절하면 반응형으로 깨끗하게 스케일
              />
              <span className="sr-only">SME 행정사 합동사무소</span>
            </Link>
            <nav className="ml-auto flex gap-4 text-sm">
              <Link href="/services">서비스</Link>
              <Link href="/team">대표행정사</Link>
              <Link href="/contact" className="font-semibold">문의</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">
          <FitViewportMain />
          <PageTransition>{children}</PageTransition>
        </main>
        <footer className="relative z-10 mt-20 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
            © {new Date().getFullYear()} 행정사합동사무소
          </div>
        </footer>
        {/* 하이드레이션 직후, 숨김 해제 → 1회 페이드인 */}
        <Script id="reveal-app" strategy="afterInteractive">
          {`
            document.documentElement.removeAttribute('data-no-fouc');
            document.documentElement.setAttribute('data-app-mounted','');
          `}
        </Script>
      </body>
    </html>
  );
}
