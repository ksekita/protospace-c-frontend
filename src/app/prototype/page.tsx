"use client";

import styles from "../page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import { useGetPrototypes } from "@/lib/api/useGetPrototype";

export default function Home() {
  const { prototypes, isLoading, error } = useGetPrototypes();
  const userName = "テストユーザー";

  if (isLoading) return <div className={styles.container}>読み込み中...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.container}>
      <Greeting userName={userName} />
      <PrototypeList prototypes={prototypes} />
    </div>
  );
}
