import Login from "@/components/auth/Login";
import styles from "../auth.module.css";

export default function LoginPage() {
  return (
    <div className="inner">
      <h2 className={styles.page_heading}>ユーザー口グイン</h2>
      <Login />
    </div>
  );
}
