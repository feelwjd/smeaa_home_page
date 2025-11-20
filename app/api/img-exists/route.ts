// app/api/img-exists/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// 허용 루트 안전구역 (team 이미지만 체크)
const PUBLIC_ROOT = path.join(process.cwd(), "public");
const SAFE_ROOT = path.join(PUBLIC_ROOT, "images", "team");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const p = searchParams.get("p"); // 예: /images/team/kim-gitaek.jpg
  if (!p || !p.startsWith("/images/team/")) {
    return NextResponse.json({ ok: false, exists: false }, { status: 400 });
  }

  // 경로 역참조 방지
  const abs = path.normalize(path.join(PUBLIC_ROOT, p));
  if (!abs.startsWith(SAFE_ROOT)) {
    return NextResponse.json({ ok: false, exists: false }, { status: 403 });
  }

  try {
    await fs.access(abs);
    return NextResponse.json({ ok: true, exists: true });
  } catch {
    return NextResponse.json({ ok: true, exists: false });
  }
}
