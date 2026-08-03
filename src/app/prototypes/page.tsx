import styles from "./page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Suspense>
        <Greeting />
      </Suspense>
      <Suspense>
        <PrototypeList />
      </Suspense>
    </div>
  );
}
