import styles from "./PrototypeList.module.css";
import Link from "next/link";
import Image from "next/image";
import { ResponsePrototypeList } from "@/types/UserDetailType";
import { imageBaseUrl } from "@/lib/api/imageBaseUrl";

type PrototypeListProps = {
  prototypes: ResponsePrototypeList[];
  username: string;
  userId: number;
};

export default function PrototypeList({
  prototypes,
  username,
  userId,
}: PrototypeListProps) {
  return (
    <>
      <h2 className={styles.page_heading}>{username} さんのプロトタイプ</h2>
      <div className={styles.grid}>
        {prototypes.map((proto) => (
          <div key={proto.id} className={styles.card}>
            <div className={styles.image_wrapper}>
              <Link href={`/prototype/${proto.id}`}>
                <div className={styles.image_placeholder}>
                  <Image
                    src={`${imageBaseUrl}/images/${proto.image}`}
                    width={300}
                    height={300}
                    alt={proto.title}
                    className={styles.image}
                  />
                </div>
              </Link>
            </div>

            <div className={styles.card_body}>
              <h3 className={styles.card_title}>
                <Link href={`/prototypes/${proto.id}`}>{proto.title}</Link>
              </h3>
              <p className={styles.card_concept}>{proto.catchCopy}</p>
              <div className={styles.card_author}>
                <Link href={`/users/${userId}`} className={styles.author_link}>
                  by {username}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
