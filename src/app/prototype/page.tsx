import styles from "../page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
import { useGetPrototypes, userInfo } from "@/lib/api/useGetPrototype";

export default async function Home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prototypes = await useGetPrototypes();
  const user = await userInfo();

  return (
    <div className={styles.container}>
      <Greeting userId={user.id} userName={user.name} />
      <PrototypeList prototypes={prototypes} />
    </div>
  );
}
