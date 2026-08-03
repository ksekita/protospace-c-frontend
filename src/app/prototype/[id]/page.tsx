import PrototypeDetail from "@/components/prototype/detail/PrototypeDetail";
import { Comment } from "./Comment";
import { Suspense } from "react";

export default async function PrototypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="inner">
      <Suspense fallback={<div>詳細を読み込み中...</div>}>
        <PrototypeDetail prototypeId={params} />
      </Suspense>
      <Suspense fallback={<div>コメントを読み込み中...</div>}>
        <Comment prototypeId={params} />
      </Suspense>
    </div>
  );
}
