"use client";

import styles from "./Auth.module.css";
import { useActionState } from "react";
import { loginAction } from "@/lib/actions/authActions";

export default function Login() {
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
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction}>
      {state?.error && (
        <p role="alert" className="text-red-500">
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
      </div>
      <button className={styles.button} type="submit" disabled={isPending}>
        ログイン
      </button>
    </form>
  );
}
