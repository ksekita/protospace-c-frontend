import styles from "./page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import { Suspense } from "react";
// type HomeProps = {
//   searchParams: Promise<{ keyword?: string; sort?: string }>;
// };

export default function Home() {
  //   const keyword = resolvedParams.keyword;
  // const sort = resolvedParams.sort;
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
