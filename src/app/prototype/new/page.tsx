"use client";

import styles from "./page.module.css";
import { useCreatePrototype } from "../../../lib/api/useCreatePrototype";

export default function NewPrototypePage() {
  const { isSubmitting, handleSubmit } = useCreatePrototype();

  return <h2 className={styles.title}>新規プロトタイプ投稿</h2>;
}
