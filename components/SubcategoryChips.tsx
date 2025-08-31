"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/data/categories";
import type { Route } from "next";

export default function SubcategoryChips({ category, currentSub }: { category: Category; currentSub?: string; }) {
  const subs = category.children ?? [];
  if (!subs.length) return null;

  const items = [
    { key: "__all__", title: "전체", href: `/services/${category.slug}` },
    ...subs.map(s => ({ key: s.slug, title: s.title, href: `/services/${category.slug}/${s.slug}` })),
  ];

  const router = useRouter();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, left: 0, moved: 0, href: "" });

  const CHIP = "shrink-0 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors select-none";

  const updateEdges = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    setCanLeft(vp.scrollLeft > 0);
    setCanRight(vp.scrollLeft + vp.clientWidth < vp.scrollWidth - 1);
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    updateEdges();
    vp.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    (document as any).fonts?.ready?.then?.(updateEdges);
    return () => {
      vp.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [category.slug]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (vp) { vp.scrollLeft = 0; requestAnimationFrame(updateEdges); }
  }, [category.slug]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const key = currentSub ?? "__all__";
    const el = vp.querySelector<HTMLElement>(`[data-sub="${key}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [currentSub]);

  const step = () => Math.round((viewportRef.current?.clientWidth ?? 0) * 0.9);
  const slideLeft  = () => viewportRef.current?.scrollBy({ left: -step(), behavior: "smooth" });
  const slideRight = () => viewportRef.current?.scrollBy({ left:  step(), behavior: "smooth" });

  // 드래그/스와이프 (뷰포트 내부 스크롤만 변경)
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const vp = viewportRef.current!; const href = (e.target as HTMLElement).closest<HTMLElement>("[data-href]")?.dataset?.href || "";
    drag.current = { x: e.clientX, left: vp.scrollLeft, moved: 0, href };
    setDragging(true);
    vp.setPointerCapture(e.pointerId);
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragging) return;
    const vp = viewportRef.current!;
    const dx = drag.current.x - e.clientX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    vp.scrollLeft = Math.max(0, Math.min(vp.scrollWidth - vp.clientWidth, drag.current.left + dx));
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragging) return;
    const vp = viewportRef.current!;
    setDragging(false);
    vp.releasePointerCapture(e.pointerId);
    if (drag.current.moved < 6 && drag.current.href) router.push(drag.current.href as Route);
  };
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    const vp = viewportRef.current!;
    vp.scrollLeft = Math.max(0, Math.min(vp.scrollWidth - vp.clientWidth, vp.scrollLeft + e.deltaX));
  };

  return (
    <div className="mt-4 relative min-w-0 w-full max-w-full overflow-x-hidden">
      {(canLeft || canRight) && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" />
        </>
      )}

      <div
        ref={viewportRef}
        className="h-scroll clamp-x"
        style={{ touchAction: "pan-y", overscrollBehaviorX: "contain" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onScroll={updateEdges}
      >
        <div className="flex flex-nowrap gap-2 py-1 pr-4 sm:pr-6 md:pr-8">
          {items.map((it) => {
            const active = (currentSub ?? "__all__") === it.key;
            return (
              <button
                key={it.key}
                type="button"
                data-sub={it.key}
                data-href={it.href}
                className={`${CHIP} ${active ? "bg-black text-white border-black" : "bg-white hover:bg-gray-50"}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(it.href as Route);
                  }
                }}
              >
                {it.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 버튼을 컨테이너 안쪽에 고정(음수 translate 제거) */}
      {canLeft && (
        <button
          type="button" aria-label="왼쪽으로" onClick={slideLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border bg-white shadow p-1.5"
        >‹</button>
      )}
      {canRight && (
        <button
          type="button" aria-label="오른쪽으로" onClick={slideRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border bg-white shadow p-1.5"
        >›</button>
      )}
    </div>
  );
}
