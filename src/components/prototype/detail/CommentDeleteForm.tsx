import { commentDelete } from "@/lib/actions/commentActions";
import styles from "./CommentForm.module.css";
import { CommentListType } from "@/types/CommentListType";

interface Props {
  comment: CommentListType;
}

export default function CommentDeleteForm(props: Props) {
  return (
    <div className={styles.delete_comment}>
      <button
        className={styles.commentdelete_btn}
        onClick={() => commentDelete(props.comment.id)}
      >
        コメント削除
      </button>
    </div>
  );
}
