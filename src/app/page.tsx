import styles from "./page.module.css";
import Greeting from "@/components/greeting/Greeting";
import PrototypeList from "@/components/prototypeList/PrototypeList";
// import Prototype from "@/src/types/Prototype";
import { mockPrototypes } from "@/types/MockPrototype";
// ① 型定義
type Prototype = {
  id: string;
  title: string;
  concept: string;
  author: string;
  imageUrl?: string;
};

//  ページ本体（asyncを付けて非同期処理に対応）
export default async function Home() {
  const prototypes = await mockPrototypes;
  const userName = "テストユーザー";

  return (
    <div className={styles.container}>
      <Greeting userName={userName} />
      <PrototypeList prototypes={prototypes} />
    </div>
  );
}
