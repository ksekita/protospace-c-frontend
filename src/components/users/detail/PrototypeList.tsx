import styles from "./PrototypeList.module.css";
import Link from "next/link";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/api/imageBaseUrl";
import { userDetailProto } from "@/lib/api/userDetail";

interface Props {
  userId: Promise<{ id: string }>;
}

export default async function PrototypeList(props: Props) {
  const { id } = await props.userId;
  const userId = Number(id);
  const prototypeList = await userDetailProto(userId);

  if (prototypeList.length == 0) {
    return null;
  }

  const name = prototypeList[0].name;

  if (name === null || name === undefined || name === "") {
    return null;
  }

  return (
    <>
      <h2 className={styles.page_heading}>{name} さんのプロトタイプ</h2>
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
              </h3>
              <p className={styles.card_concept}>{proto.catchCopy}</p>
              <div className={styles.card_author}>
                <Link
                  href={`/users/${props.userId}`}
                  className={styles.author_link}
                >
                  by {name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
