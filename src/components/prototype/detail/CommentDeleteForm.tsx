"use client";
import { commentDelete } from "@/lib/actions/commentActions";
import styles from "./CommentForm.module.css";

interface Props {
  commnetId: number;
}

export default function CommentDeleteForm(props: Props) {
  return (
    <div className={styles.delete_comment}>
      <button
        className={styles.commentdelete_btn}
        onClick={() => commentDelete(props.commnetId)}
      >
        コメント削除
      </button>
    </div>
  );
}
