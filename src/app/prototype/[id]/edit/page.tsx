export default function PrototypeEditPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main style={{ padding: "20px" }}>
      <h1>プロトタイプ編集ページ (ID: {params.id})</h1>
      {/* ここに新規作成（new）で使ったフォームや、編集用のコンポーネントを配置 */}
    </main>
  );
}
