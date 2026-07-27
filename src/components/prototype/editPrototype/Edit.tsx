"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { useUpdatePrototype } from "@/lib/api/useUpdatePrototype";

type EditProps = {
  id: string;
};

export default function Edit({ id }: EditProps) {
  const { handleSubmit, isSubmitting } = useUpdatePrototype();

  const [formData, setFormData] = useState({
    title: "",
    catchCopy: "",
    concept: "",
    image: null as File | null,
  });

  useEffect(() => {
    const fetchPrototype = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${id}/update`,
        );

        setFormData({
          title: response.data.title,
          catchCopy: response.data.catchCopy,
          concept: response.data.concept,
          image: null,
        });
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };

    if (id) {
      fetchPrototype();
    }
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(id, formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>投稿編集ぺージ</h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className={styles.form_group}>
          <label htmlFor="title" className={styles.label}>
            プロトタイプの名称
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.input}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="catchCopy" className={styles.label}>
            キャッチコピー
          </label>
          <textarea
            id="catchCopy"
            name="catchCopy"
            rows={3}
            className={styles.textarea}
            value={formData.catchCopy}
            onChange={(e) =>
              setFormData({ ...formData, catchCopy: e.target.value })
            }
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
            value={formData.concept}
            onChange={(e) =>
              setFormData({ ...formData, concept: e.target.value })
            }
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="image" className={styles.label}>
            プロトタイプ画像
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className={styles.file_input}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFormData({ ...formData, image: e.target.files[0] });
              }
            }}
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
