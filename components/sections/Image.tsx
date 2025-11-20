"use client";

export default function ImageSection({ src, caption, layout='center' }: { src: string; caption?: string; layout?: 'full'|'left'|'right'|'center' }) {
  return (
    <figure className={`mb-8 ${layout === 'full' ? '' : 'max-w-3xl'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption || ''} className="w-full rounded-lg border" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none' }} />
      {caption && <figcaption className="text-sm text-gray-600 mt-2">{caption}</figcaption>}
    </figure>
  );
}
