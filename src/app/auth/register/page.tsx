import Register from "@/components/auth/Register";
import styles from "../auth.module.css";
export default function RegisterPage() {
  return (
    <div className="inner">
      <h2 className={styles.page_heading}>ユーザー新規登録</h2>
      <Register />
    </div>
  );
}
