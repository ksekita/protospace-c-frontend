"use client";
// h編集画面
import styles from "@/app/prototype/new/page.module.css";
import { EditPrototypeAction } from "@/lib/api/useUpdatePrototype";
import { useActionState } from "react";

export type EditPrototypeProps = {
  initialData: {
    id: number;
    title: string;
    catchCopy: string;
    concept: string;
    image?: string;
  };
};

export default function Editprototype({ initialData }: EditPrototypeProps) {
  const [state, formAction, isPending] = useActionState(
    EditPrototypeAction,
    null,
  );

  return (
    <div className={styles.container}>
      <form action={formAction} encType="multipart/form-data">
        <input type="hidden" name="id" value={initialData.id} />
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
            defaultValue={state?.title || initialData.title}
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
            defaultValue={state?.catchCopy || initialData.catchCopy}
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
            defaultValue={state?.concept || initialData.concept}
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
