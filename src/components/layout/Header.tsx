import styles from "./Header.module.css";
import { ReactNode } from "react";
import Logo from "./Logo";

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`${styles.flex} ${styles.inner}`}>
        <Logo />
        {children}
      </div>
    </header>
  );
}
