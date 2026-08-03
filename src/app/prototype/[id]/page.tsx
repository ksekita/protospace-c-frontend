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
      <Suspense>
        <PrototypeDetail prototypeId={params} />
      </Suspense>
      <Suspense>
        <Comment prototypeId={params} />
      </Suspense>
    </div>
  );
}
