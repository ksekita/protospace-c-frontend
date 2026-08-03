import Link from "next/link";
import styles from "./PrototypeDetail.module.css";
import Image from "next/image";
import { Button } from "./Button";
import { imageBaseUrl } from "@/lib/api/imageBaseUrl";
import { prototypeDetail } from "@/lib/api/prototypeDetail";
import { Suspense } from "react";

interface Props {
  prototypeId: Promise<{ id: string }>;
}

export default async function PrototypeDetail(props: Props) {
  const { id } = await props.prototypeId;
  const prototypeId = Number(id);
  const responseProtodetail = await prototypeDetail(prototypeId);
  return (
    <>
      {/* タイトル */}
      <p className={styles.title}>{responseProtodetail.title}</p>
      {/* ユーザー名 */}
      <Link
        href={`/users/${responseProtodetail.userId}`}
        className={styles.prototype_user}
      >
        by {responseProtodetail.name}
      </Link>
      <Suspense>
        <Button
          prototypeId={prototypeId}
          prototypeUseeId={responseProtodetail.userId}
        />
      </Suspense>
      {/* 画像 */}
      <div className={styles.prototype_image}>
        <Image
          src={`${imageBaseUrl}/images/${responseProtodetail.image}`}
          width={300}
          height={300}
          alt={responseProtodetail.title}
        />
      </div>
      <div>
        <div className={styles.prototype_detail}>
          <p className={styles.detail_title}>キャッチコピー</p>
          {/* キャッチコピー */}
          <p>{responseProtodetail.catchCopy}</p>
        </div>
        <div className={styles.prototype_detail}>
          <p className={styles.detail_title}>コンセプト</p>
          {/* コンセプト */}
          <p>{responseProtodetail.concept}</p>
        </div>
      </div>
    </>
  );
}
