import Link from "next/link";
import styles from "./PrototypeDetail.module.css";

export default function PrototypeDetailPage() {
  return (

    <article className={styles.prototypeContainer}>
      <h1 className={styles.titleprototype}>ウェブアプリ１</h1>
      <div className={styles.nameWrapper}>
        <Link href={`/users/id`} className={styles.nameLink}>
          by名前
        </Link>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.editBtn}>
          編集
        </button>
        <button type="button" className={styles.deleteBtn}>
          削除
        </button>
      </div>

      <div className={styles.prototypeImageWrapper}>
        <img
          src="https://picsum.photos/600/300"
          alt="prototype image"
          className={styles.prototypeImage}
        />
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>キャッチコピー</h2>
        <p className={styles.sectionContent}>キャッチコピーの内容</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>コンセプト</h2>
        <p className={styles.sectionContent}>コンセプト内容</p>
      </section>
    </article>
  );
}