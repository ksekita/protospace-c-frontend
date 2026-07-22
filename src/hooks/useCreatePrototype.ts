import React, { useState } from "react";
import { useRouter } from "next/navigation";

// 新規投稿画面の処理です
export const useCreatePrototype = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 保存ボタンを押したときに動く送信処理
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // フォームの内容（入力テキストやファイル）をFormDataとして取得
    const formData = new FormData(e.currentTarget);

    try {
      // APIのURLはJavaバックエンドのエンドポイントに書き換える👇
      const response = await fetch("/api/prototypes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      alert("投稿が完了しました");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。再試行してください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
