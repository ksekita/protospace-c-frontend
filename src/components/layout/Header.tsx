import Image from "next/image";
import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { isTokenValid } from "@/lib/utils/auth";
import Link from "next/link";

export default async function Header() {
  const isLoggedIn = await isTokenValid();

  return (
    <header className={styles.header}>
      <div className={`${styles.flex} ${styles.inner}`}>
        <Link href={"/prototype"} className={styles.image_box}>
          <Image
            src={"/images/logo.png"}
            width={200}
            height={40}
            alt="logo"
            priority
            className={styles.image}
          />
        </Link>
        <div className={styles.margin_reset}>
          <AuthNav isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
