import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

// 新規投稿画面の処理です
export const useCreatePrototype = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // フォームの内容（入力テキストやファイル）をFormDataとして取得
    const formData = new FormData(e.currentTarget);

    try {
      await axios.post("http://localhost:8080/post", formData, {
        headers: {
          "Content-Type": "mul tipart/form-data",
        },
      });
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。再試行してください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  redirect("/");

  return {
    isSubmitting,
    handleSubmit,
  };
};
