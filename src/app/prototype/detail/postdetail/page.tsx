import PostDetail from "@/components/detail/PostDetail";
import CommentForm from "@/components/detail/CommentForm";
import CommentList from "@/components/detail/CommentList";
import styles from "./page.module.css";

export default function PostDetailPage() {
  return (
    <main className={styles.container}>
      <PostDetail />
      <section className={styles.commentSection}>
        <CommentForm />
        <CommentList />
      </section>
    </main>
  );
}