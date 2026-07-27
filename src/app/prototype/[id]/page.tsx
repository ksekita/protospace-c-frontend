import PrototypeDetail from "@/components/prototype/detail/PrototypeDetail";
import CommentForm from "@/components/prototype/detail/CommentForm";
import CommentList from "@/components/prototype/detail/CommentList";
import styles from "./page.module.css";

export default async function PrototypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <main className={styles.container}>
      <PrototypeDetail  />
      <section className={styles.commentSection}>
        <CommentForm />
        <CommentList />
      </section>
    </main>
  );
}