import Link from "next/link";
import styles from "./Header.module.css";
import { logoutAction } from "@/lib/actions/authActions";

type AuthNavProps = {
  isLoggedIn: boolean;
};

// propsでログインしてるかどうかの判定を受け取る
export default function AuthNav({ isLoggedIn }: AuthNavProps) {
  if (isLoggedIn) {
    return (
      <>
        <Link href={"/prototype/new"} className={styles.nav_link}>
          New Proto
        </Link>
        <form action={logoutAction} style={{ display: "inline" }}>
          <button type="submit" className={styles.nav_link}>
            ログアウト
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <Link href={"/auth/login"} className={styles.nav_link}>
        ログイン
      </Link>
      <Link href={"/auth/register"} className={styles.nav_link}>
        新規登録
      </Link>
    </>
  );
}
