"use client";

import styles from "./Edit.module.css";

export default function Register() {
  const { handleSubmit, isSubmitting } = upDatePrototype();

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.form_group}>
          <label htmlFor="title" className={styles.label}>
            プロトタイプの名称
          </label>
          <input type="text" id="title" name="title" className={styles.input} />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="catchphrase" className={styles.label}>
            キャッチコピー
          </label>
          <textarea
            id="catchphrase"
            name="catchphrase"
            rows={3}
            className={styles.textarea}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="concept" className={styles.label}>
            コンセプト
          </label>
          <textarea
            id="concept"
            name="concept"
            rows={4}
            className={styles.textarea}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="image" className={styles.label}>
            プロトタイプの画像
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className={styles.file_input}
          />
        </div>

        <button
          type="submit"
          className={styles.submit_btn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "保存中..." : "保存する"}
        </button>
      </form>
    </div>
  );
}
