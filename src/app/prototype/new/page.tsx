"use client";

import styles from "./page.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import mockPrototype from "@/types/MockPrototype";

export default function NewPrototypePage() {
  //   const router = useRouter();
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  // e.preventDefault();
  // setIsSubmitting(true);

  // const formData = new FormData(e.currentTarget);

  //     try {
  //       const response = await fetch("/api/prototypes", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) throw new Error("送信失敗です");

  //       alert("投稿が完了しました");
  //       router.push("/");
  //       router.refresh();
  //     } catch (error) {
  //       alert("エラー。再試行してください。");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>新規プロトタイプ投稿</h2>

      <form action="/api/prototypes" encType="multipart/form-data">
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
            className={styles.fileInput}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          保存する
        </button>
      </form>
    </main>
  );
}
