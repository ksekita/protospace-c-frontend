import styles from "./Auth.module.css";

export default function Register() {
  return (
    <>
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

        <div className={styles.field}>
          <label htmlFor="password-conf" className={styles.label}>
            パスワード再入力
          </label>
          <input id="password-conf" type="password" />
        </div>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            ユーザー名
          </label>
          <input id="username" type="text" />
        </div>

        <div className={styles.field}>
          <label htmlFor="profile" className={styles.label}>
            プロフィール
          </label>
          <textarea id="profile" className={styles.textarea} />
        </div>

        <div className={styles.field}>
          <label htmlFor="affiliation" className={styles.label}>
            所属
          </label>
          <textarea id="affiliation" className={styles.textarea} />
        </div>

        <div className={styles.field}>
          <label htmlFor="position" className={styles.label}>
            役職
          </label>
          <textarea id="position" className={styles.textarea} />
        </div>

        <button className={styles.button}>新規登録</button>
      </form>
    </>
  );
}
