import styles from "./page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import { prototypeList, userInfo } from "@/lib/api/useGetPrototype";

type HomeProps = {
  searchParams: Promise<{ keyword?: string; sort?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  // Resolve the searchParams promise to get the actual parameters
  const resolvedParams = await searchParams;

  // Extract keyword and sort from the resolved parameters
  const keyword = resolvedParams.keyword;
  const sort = resolvedParams.sort;

  const prototypes = await prototypeList(keyword, sort);
  const user = await userInfo();

  return (
    <div className={styles.container}>
      <Greeting userId={user.id} userName={user.name} />
      <PrototypeList prototypes={prototypes} />
    </div>
  );
}
