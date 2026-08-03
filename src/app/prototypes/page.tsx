import styles from "./page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import { prototypeList, userInfo } from "@/lib/api/useGetPrototype";

type HomeProps = {
  searchParams: Promise<{ search?: string; keyword?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  //URL's query
  const resolvedParams = await searchParams;

  // query's name from Greeting Component
  const keyword = resolvedParams.search || resolvedParams.keyword;

  const prototypes = await prototypeList(keyword);
  const user = await userInfo();

  return (
    <div className={styles.container}>
      <Greeting userId={user.id} userName={user.name} />
      <PrototypeList prototypes={prototypes} />
    </div>
  );
}
