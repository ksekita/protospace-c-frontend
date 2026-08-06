import styles from "./page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import SerachForm from "@/components/prototypeList/SearchForm";
import { Suspense } from "react";
// type HomeProps = {
//   searchParams: Promise<{ keyword?: string; sort?: string }>;
// };

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  return (
    <div className={styles.container}>
      <Suspense>
        <Greeting />
      </Suspense>
      <Suspense>
        <SerachForm searchParams={searchParams} />
        <PrototypeList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
