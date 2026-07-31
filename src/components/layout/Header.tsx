import Image from "next/image";
import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { isTokenValid } from "@/lib/utils/auth";
import Link from "next/link";
import { Suspense } from "react";

export async function HeaderAuthAction() {
  const isLoggedIn = await isTokenValid();
  return (
    <div className={styles.margin_reset}>
      <AuthNav isLoggedIn={isLoggedIn} />
    </div>
  );
}

export async function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.flex} ${styles.inner}`}>
        <Link href={"/prototypes"} className={styles.image_box}>
          <Image
            src={"/images/logo.png"}
            width={200}
            height={40}
            alt="logo"
            priority
            className={styles.image}
          />
        </Link>
        <Suspense fallback={<div className={styles.margin_reset}></div>}>
          <HeaderAuthAction />
        </Suspense>
      </div>
    </header>
  );
}
