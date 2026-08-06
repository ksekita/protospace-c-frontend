"use client";
import { CommentListType } from "@/types/CommentListType";
import CommentDeleteForm from "./CommentDeleteForm";
import styles from "./CommentList.module.css";
import Link from "next/link";

interface Props {
  commentList: CommentListType[] | null;
  currentUserId: number;
}

export default function CommentList(props: Props) {
  if (props.commentList === null) {
    return null;
  }

  return (
    <>
      {/* コメント一覧 propsを配列で取ってきてmapで回す*/}
      <ul className={styles.comments_lists}>
        {props.commentList.map((comment) => (
          <li key={comment.id} className={styles.comments_list}>
            {comment.content}
            <Link
              href={`/users/${comment.userId}`}
              className={styles.comment_user}
            >
              {comment.name}
            </Link>
            {comment.userId === props.currentUserId && (
              <CommentDeleteForm comment={comment} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
