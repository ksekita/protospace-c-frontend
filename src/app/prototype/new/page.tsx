export default function NewPrototypePage() {
  return (
    <main className="container">
      <h1>新規プロトタイプ投稿</h1>

      <form>
        <div>
          <label htmlFor="title">プロトタイプの名称</label>
          <input type="text" id="title" name="title" />
        </div>

        <div>
          <label htmlFor="catchcopy">キャッチコピー</label>
          <input type="text" id="catchphrase" name="catchphrase" />
        </div>

        <div>
          <label htmlFor="concept">コンセプト</label>
          <textarea id="concept" name="concept" rows={4} />
        </div>

        <div>
          <label htmlFor="image">プロトタイプの画像</label>
          <input type="file" id="protoimage" name="protoimage" />
        </div>

        <button type="submit">保存する</button>
      </form>
    </main>
  );
}
