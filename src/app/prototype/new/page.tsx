"use client";

import styles from "./page.module.css";
import Newprototype from "@/components/prototype/new/Newprototype";

export default function NewPrototypePage() {
  return (
    <main className={styles.containers}>
      <h2 className={styles.title}>新規プロトタイプ投稿</h2>
      <Newprototype />
    </main>
  );
}
