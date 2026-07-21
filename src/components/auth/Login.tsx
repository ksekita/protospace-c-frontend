import styles from "./Auth.module.css";

export default function Login() {
  return (
    <form action="">
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          メールアドレス
        </label>
        <input id="email" type="email" />
      </div>
      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          パスワード (6文字以上)
        </label>
        <input id="password" type="password" />
      </div>
      <button className={styles.button}>ログイン</button>
    </form>
  );
}
