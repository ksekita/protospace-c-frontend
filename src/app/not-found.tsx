import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.box}>
      <h2 className={styles.h2}>お探しのページは見つかりませんでした。</h2>
      <p className={styles.p}>
        お手数ですが下記のリンクからホーム画面にお戻りください
      </p>
      <div className={styles.link_box}>
        <Link href="/" className={styles.link}>
          ホーム画面
        </Link>
      </div>
    </div>
  );
}
