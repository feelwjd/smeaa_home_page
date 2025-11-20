export type Section =
  | { type: 'text'; title?: string; html?: string; markdown?: string }
  | { type: 'image'; src: string; caption?: string; layout?: 'full'|'left'|'right'|'center' }
  | { type: 'step-list'; title?: string; steps: string[] }
  | { type: 'list'; title?: string; items: string[] }
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'download'; title?: string; files: { name: string; href: string }[] }
  | { type: 'custom'; name: string; props?: Record<string, any> };
