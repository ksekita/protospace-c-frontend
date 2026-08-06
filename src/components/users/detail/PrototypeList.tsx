import styles from "./PrototypeList.module.css";
import Link from "next/link";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/api/layout/imageBaseUrl";
import { userDetailProto } from "@/lib/api/user/userDetail";
import Like from "@/components/like/Like";

interface Props {
  userId: Promise<{ id: string }>;
}

export default async function PrototypeList(props: Props) {
  const { id } = await props.userId;
  const userId = Number(id);
  const prototypeList = await userDetailProto(userId);

  if (!prototypeList || prototypeList.length === 0) {
    return <h2>投稿がありません</h2>;
  }

  return (
    <>
      <h2 className={styles.page_heading}>
        {prototypeList[0].name} さんのプロトタイプ
      </h2>
      <div className={styles.grid}>
        {prototypeList.map((proto) => (
          <div key={proto.id} className={styles.card}>
            <div className={styles.image_wrapper}>
              <Link href={`/prototype/${proto.id}`}>
                <div className={styles.image_placeholder}>
                  <Image
                    src={`${imageBaseUrl}/images/${proto.image}`}
                    width={300}
                    height={300}
                    alt={proto.title || "画像"}
                    className={styles.image}
                  />
                </div>
              </Link>
            </div>

            <div className={styles.card_body}>
              <h3 className={styles.card_title}>
                <Link href={`/prototype/${proto.id}`}>{proto.title}</Link>
                {proto.id !== undefined && <Like prototypeId={proto.id} />}
              </h3>
              <p className={styles.card_concept}>{proto.catchCopy}</p>
              <div className={styles.card_author}>
                <Link href={`/users/${userId}`} className={styles.author_link}>
                  by {prototypeList[0].name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
