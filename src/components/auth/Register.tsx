"use client";
import { useActionState } from "react";
import styles from "./Auth.module.css";
import { registerAction } from "@/lib/actions/authActions";

export default function Register() {
  /**
   * useActionState
   * 左辺
   * - 第一引数...状態(state)
   * - 第二引数...reducerを実行する関数
   * - 第三引数...reducerが進行中かどうかを知らせる状態
   * 右辺
   * - 第一引数...reducerを呼び出している関数
   * - 第二引数...初期値
   */

  const [state, formAction, isPending] = useActionState(registerAction, null);

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
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            name="email"
            defaultValue={state?.email || ""}
          />
          {state?.fieldErrors?.email && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            パスワード (6文字以上)
          </label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={""}
          />
          {state?.fieldErrors?.password && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.password}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password-conf" className={styles.label}>
            パスワード再入力
          </label>
          <input
            id="password-conf"
            type="password"
            name="password_confirmation"
            defaultValue={""}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            ユーザー名
          </label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state?.username || ""}
          />
          {state?.fieldErrors?.username && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.username}
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
            defaultValue={state?.profile || ""}
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
            defaultValue={state?.affiliation || ""}
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
            defaultValue={state?.position || ""}
          />
          {state?.fieldErrors?.position && (
            <p role="alert" className={styles.error}>
              {state.fieldErrors.position}
            </p>
          )}
        </div>

        <button className={styles.button} disabled={isPending} type="submit">
          新規登録
        </button>
      </form>
    </>
  );
}
