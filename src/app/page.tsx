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

// ② APIからデータ一覧を取得する関数
// async function getPrototypes(): Promise<Prototype[]> {
//   try {
//     const res = await fetch("http://localhost:3000/api/prototypes", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.warn(
//         "APIからデータを取得できませんでした。空リストを表示します。",
//       );
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Fetchエラー:", error);
//     return [];
//   }
// }

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
