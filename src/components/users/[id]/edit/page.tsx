"use client";
import { useActionState } from "react";
import styles from "./page.module.css";
import { editUserAction } from "@/lib/api/editUserAction";

export type FormState = {
  error?: string;
  fieldErrors?: {
    password?: string;
    name?: string;
    profile?: string;
    affiliation?: string;
    position?: string;
  };
} | null;

export default function Useredit({
  userData,
  userId,
}: {
  // 親から渡されるデータの受け皿を定義
  userData: {
    profile?: string;
    affiliation?: string;
    position?: string;
    name?: string;
  };
  userId: number;
}) {
  const editUserWithId = editUserAction.bind(null, userId);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    editUserWithId,
    null,
  );

  return (
    <>
      <form action={formAction}>
        {/* 全体エラー */}
        {state?.error && (
          <p role="alert" className={styles.error_alert}>
            {state.error}
          </p>
        )}

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            ユーザー名
          </label>
          <input
            id="username"
            type="text"
            name="name"
            defaultValue={userData?.name || ""}
            // 親から渡されたデータをdefaultValueに格納　以下同じ
          />
          {state?.fieldErrors?.name && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="profile" className={styles.label}>
            プロフィール
          </label>
          <textarea
            id="profile"
            className={styles.textarea}
            name="profile"
            defaultValue={userData?.profile || ""}
          />
          {state?.fieldErrors?.profile && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.profile}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="affiliation" className={styles.label}>
            所属
          </label>
          <textarea
            id="affiliation"
            className={styles.textarea}
            name="affiliation"
            defaultValue={userData?.affiliation || ""}
          />
          {state?.fieldErrors?.affiliation && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.affiliation}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="position" className={styles.label}>
            役職
          </label>
          <textarea
            id="position"
            className={styles.textarea}
            name="position"
            defaultValue={userData?.position || ""}
          />
          {state?.fieldErrors?.position && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.position}
            </p>
          )}
        </div>

        <button className={styles.button} disabled={isPending} type="submit">
          編集した内容を保存する
        </button>
      </form>
    </>
  );
}
