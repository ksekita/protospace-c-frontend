import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { isTokenValid } from "@/lib/utils/auth";

export async function HeaderAuthAction() {
  const isLoggedIn = await isTokenValid();
  return (
    <div className={styles.margin_reset}>
      <AuthNav isLoggedIn={isLoggedIn} />
    </div>
  );
}
