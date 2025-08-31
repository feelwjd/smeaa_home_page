"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  srcMp4: string;
  srcWebm?: string;
  poster?: string;
  darken?: boolean;
};

export default function RootBackgroundVideo({
  srcMp4,
  srcWebm,
  poster,
  darken = true,
}: Props) {
  const pathname = usePathname();
  const show = pathname === "/";
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (show) v.play().catch(() => {});
    else v.pause();
  }, [show]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-0 -z-10 overflow-hidden transition-opacity duration-300 ${
        show && ready ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <video
        ref={ref}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>
      {darken && <div className="pointer-events-none absolute inset-0 bg-black/30" />}
    </div>
  );
}
