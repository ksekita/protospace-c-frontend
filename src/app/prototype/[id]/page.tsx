import PrototypeDetail from "@/components/prototype/detail/PrototypeDetail";
import styles from "./PrototypeDetailPage.module.css";
import CommentForm from "@/components/prototype/detail/CommentForm";
import CommentList from "@/components/prototype/detail/CommentList";
import { prototypeDetail } from "@/lib/api/prototypeDetail";
import { allCommentList } from "@/lib/api/commentList";

export default async function PrototypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const prototypeId = Number(id);

  // 投稿詳細を丸ごとresponseに詰めて持ってくる
  const responseProtodetail = await prototypeDetail(prototypeId);

  // コメントは更新されるので分けておいたほうがいい？かわからないので一応分離する
  const responseCommentList = await allCommentList(prototypeId);

  return (
    <div className="inner">
      <PrototypeDetail
        prototypeDetail={responseProtodetail.responsePrototypeDetail}
        userId={responseProtodetail.responseUserInfo.id}
      />
      <div className={styles.prototype_comments}>
        <CommentForm
          isLoggedIn={responseProtodetail.isLoginCheck}
          prototypeId={responseProtodetail.responsePrototypeDetail.id}
        />
        <CommentList commentList={responseCommentList} />
      </div>
    </div>
  );
}
