import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.container}>
      <div className="loading">
        <p>読み込み中...</p>
      </div>
    </main>
  );
}
