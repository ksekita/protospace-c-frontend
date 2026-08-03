import styles from "./PrototypeDetailPage.module.css";
import { isTokenValid } from "@/lib/utils/auth";
import CommentForm from "@/components/prototype/detail/CommentForm";
import CommentList from "@/components/prototype/detail/CommentList";

interface Props {
  prototypeId: Promise<{ id: string }>;
}

// コメントのコンポーネント
export async function Comment(props: Props) {
  const { id } = await props.prototypeId;
  const prototypeId = Number(id);
  const isLogginCheck = await isTokenValid();
  return (
    <div className={styles.prototype_comments}>
      {isLogginCheck && <CommentForm prototypeId={prototypeId} />}
      <CommentList prototypeId={prototypeId} />
    </div>
  );
}
