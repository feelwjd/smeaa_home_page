export default function Contact() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">문의</h1>
      <p className="text-gray-600">무료 상담을 요청하시면 빠르게 연락드립니다.</p>
      <form className="space-y-4" action="https://formspree.io/f/xbldvzay" method="POST">
        <div>
          <label className="block text-sm font-medium">성함</label>
          <input name="name" className="mt-1 w-full rounded-xl border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">연락처/이메일</label>
          <input name="contact" className="mt-1 w-full rounded-xl border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">문의 내용</label>
          <textarea name="message" className="mt-1 w-full rounded-xl border px-3 py-2 min-h-[120px]" required />
        </div>
        <button type="submit" className="rounded-xl bg-black text-white px-4 py-2">제출</button>
      </form>
    </div>
  );
}
