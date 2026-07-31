import api from "@/lib/api/apiClient";
import styles from "./edit.module.css";
import Editprototype from "@/components/prototype/editPrototype/Editprototype";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";

type PageProps = {
  params: { id: string };
};

export default async function EditPrototypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prototypeId = Number(id);
  const response = await api.get(`prototypes/${prototypeId}`);
  const prototypeData = response.data;

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>プロトタイプ編集画面</h2>
      <Editprototype initialData={prototypeData} />
    </main>
  );
}
