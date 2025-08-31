const members = [
  { name: "김기택", role: "대표행정사", bio: "전체 총괄" },
  { name: "모영주", role: "행정사", bio: "기업행정/인허가/조달 전문" },
  { name: "안일선", role: "행정사", bio: "기업인증·정부지원사업" },
  { name: "이진일", role: "행정사", bio: "식약처 인증·HACCP" },
  { name: "박용갑", role: "행정사", bio: "ISO/ESG/RE100" },
  { name: "유하진", role: "행정사", bio: "특허·기술인증" },
  { name: "조휘철", role: "행정사", bio: "공공조달·입찰" },
  { name: "홍재필", role: "행정사", bio: "수출입·전파인증" },
];
export default function Team() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">대표행정사</h1>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {members.map(m => (
          <li key={m.name} className="rounded-2xl bg-white p-6 shadow">
            <div className="text-lg font-semibold">{m.name}</div>
            <div className="text-sm text-gray-600">{m.role}</div>
            <p className="mt-2 text-sm text-gray-700">{m.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
