import api from "@/lib/api/apiClient";
import styles from "./page.module.css";
import Editprototype from "@/components/prototype/editPrototype/Editprototype";

type PageProps = {
  params: { id: string };
};

export default async function editPrototypePage({ params }: PageProps) {
  const response = await api.get(`prototypes/${params.id}`);
  const prototypeData = response.data;

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>プロトタイプ編集画面</h2>
      <Editprototype initialData={prototypeData} />
    </main>
  );
}
