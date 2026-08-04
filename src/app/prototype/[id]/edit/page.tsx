import styles from "./edit.module.css";
import Editprototype from "@/components/prototype/editPrototype/Editprototype";
import { redirect } from "next/navigation";
import { prototypeEdit } from "@/lib/api/prototype/prototypeEdit";

export default async function EditPrototypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prototypeId = Number(id);
  const response = await prototypeEdit(prototypeId);

  if (response.prototypeUserId !== response.userId) {
    redirect(`/prototype/${prototypeId}`);
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>プロトタイプ編集画面</h2>
      <Editprototype
        initialData={response.editPrototype}
        prototypeId={prototypeId}
      />
    </main>
  );
}
