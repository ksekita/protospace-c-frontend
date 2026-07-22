import Link from "next/link";
import styles from "./PostDetail.module.css";

export default function PostDetail() {
  return (
    <article className={styles.postContainer}>
      {/* タイトル */}
      <h1 className={styles.titlePost}>ウェブアプリ１</h1>

      {/* 名前 */}
      <div className={styles.nameWrapper}>
        <Link href={`/users/id`} className={styles.nameLink}>
          by名前
        </Link>
      </div>

      {/* 編集・削除ボタン */}
      <div className={styles.buttonGroup}>
        <button type="button" className={styles.editBtn}>
          編集
        </button>
        <button type="button" className={styles.deleteBtn}>
          削除
        </button>
      </div>

      {/* 画像 */}
      <div className={styles.postImageWrapper}>
        <img
          src="https://picsum.photos/600/300"
          alt="prototype image"
          className={styles.postImage}
        />
      </div>

      {/* キャッチコピー */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>キャッチコピー</h2>
        <p className={styles.sectionContent}>キャッチコピーの内容</p>
      </section>

      {/* コンセプト */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>コンセプト</h2>
        <p className={styles.sectionContent}>コンセプト内容</p>
      </section>
    </article>
  );
}