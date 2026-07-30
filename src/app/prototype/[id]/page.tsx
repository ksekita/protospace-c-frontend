import PrototypeDetail from "@/components/prototype/detail/PrototypeDetail";
import styles from "./PrototypeDetailPage.module.css";
import CommentForm from "@/components/prototype/detail/CommentForm";
import CommentList from "@/components/prototype/detail/CommentList";
import { isTokenValid } from "@/lib/utils/auth";
import { cookies } from "next/headers";
import { prototypeDetail } from "@/lib/api/prototypeDetail";
import { allCommentList } from "@/lib/api/commentList";
import { userInfo } from "@/lib/api/useGetPrototype";

export default async function PrototypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const resultId = resolvedParams.id;
  const prototypeId = Number(resultId);

  // コメントフォーム表示
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  const isLoggedIn = await isTokenValid(token);

  //  投稿詳細
  const detail = await prototypeDetail(prototypeId);
  const user = await userInfo();

  // コメント一覧
  const comment = await allCommentList(prototypeId);

  return (
    <div className="inner">
      <PrototypeDetail prototypeDetial={detail} userId={user.id} />
      <div className={styles.prototype_comments}>
        <CommentForm isLoggedIn={isLoggedIn} prototypeId={prototypeId} />
        <CommentList commentList={comment} />
      </div>
    </div>
  );
}
