import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.flex} ${styles.inner}`}>
        <div>
          <Image
            src={"/images/logo.png"}
            width={200}
            height={50}
            alt="Header logo"
            priority
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <div className={styles.margin_reset}>
          <Link href={""} className={styles.nav_link}>
            ログイン
          </Link>
          <Link href={""} className={styles.nav_link}>
            新規登録
          </Link>
        </div>
      </div>
    </header>
  );
}
