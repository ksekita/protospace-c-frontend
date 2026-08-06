import { likeAllCount } from "@/lib/api/like/likes";
import { LikeButton } from "./LikeButton";
import styles from "./LikeButton.module.css";
import { userInfo } from "@/lib/api/prototype-list/useGetPrototype";

// propsでprototypeIdを受け取る
export default async function Like({ prototypeId }: { prototypeId: number }) {
  const [user, response] = await Promise.all([
    userInfo(),
    likeAllCount(prototypeId),
  ]);

  if (response.likeCount === undefined || response.isLiked === undefined) {
    return null;
  }

  if (!user?.id) {
    return <div className={styles.result}>♡{response.likeCount}</div>;
  }
  return (
    <div className={styles.btn_wrapper}>
      <LikeButton
        prototypeId={prototypeId}
        count={response.likeCount}
        isLiked={response.isLiked}
      />
      <div className={styles.result}>{response.likeCount}</div>
    </div>
  );
}
