"use client";
// 新規投稿画面
import styles from "@/app/prototype/new/page.module.css";
import { CreatePrototypeAction } from "@/lib/actions/cratatePrototypeAction";
import { useActionState } from "react";

export default function Newprototype() {
  const [state, formAction, isPending] = useActionState(
    CreatePrototypeAction,
    null,
  );

  return (
    <div className={styles.container}>
      <form action={formAction}>
        {/* {全体エラー} */}
        {state?.error && (
          <p role="alert" className={styles.error_alert}>
            {state.error}
          </p>
        )}
        <div className={styles.form_group}>
          <label htmlFor="title" className={styles.label}>
            プロトタイプの名称
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className={styles.input}
            defaultValue={state?.title || ""}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="catchCopy" className={styles.label}>
            キャッチコピー
          </label>
          <input
            id="catchCopy"
            name="catchCopy"
            type="text"
            className={styles.textarea}
            defaultValue={state?.catchCopy || ""}
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
            defaultValue={state?.concept || ""}
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
            accept="image/*"
            className={styles.file_input}
          />
        </div>

        <button
          type="submit"
          className={styles.submit_btn}
          disabled={isPending}
        >
          {isPending ? "保存中..." : "保存する"}
        </button>
      </form>
    </div>
  );
}
