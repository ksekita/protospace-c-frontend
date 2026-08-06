import styles from "./CommentList.module.css";
import Link from "next/link";
import { allCommentList } from "@/lib/api/prototype/comment";
import CommentDeleteForm from "./CommentDeleteForm";
import { userInfo } from "@/lib/api/prototype-list/useGetPrototype";

interface Props {
  prototypeId: number;
}

export default async function CommentList(props: Props) {
  const [commentList, user] = await Promise.all([
    await allCommentList(props.prototypeId),
    await userInfo(),
  ]);

  if (commentList === null) {
    return null;
  }

  return (
    <>
      {/* コメント一覧 propsを配列で取ってきてmapで回す*/}
      <ul className={styles.comments_lists}>
        {commentList.map((comment) => (
          <li key={comment.id} className={styles.comments_list}>
            {comment.content}
            <Link
              href={`/users/${comment.userId}`}
              className={styles.comment_user}
            >
              {comment.name}
            </Link>
            {comment.userId === user.id && (
              <CommentDeleteForm comment={props.prototypeId} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
