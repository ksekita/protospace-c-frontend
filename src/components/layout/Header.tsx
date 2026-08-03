import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { isTokenValid } from "@/lib/utils/auth";
import { Suspense } from "react";
import Logo from "./Logo";

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
        <Logo />
        <Suspense fallback={<div className={styles.margin_reset}></div>}>
          <HeaderAuthAction />
        </Suspense>
      </div>
    </header>
  );
}
