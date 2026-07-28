import styles from "./PrototypeList.module.css";
import Link from "next/link";
import Image from "next/image";
import { ResponsePrototypeList } from "@/types/UserDetailType";

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
  const url = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <h2 className={styles.page_heading}>{username} さんのプロトタイプ</h2>
      <div className={styles.grid}>
        {prototypes.map((proto) => (
          <div key={proto.id} className={styles.card}>
            <div className={styles.image_wrapper}>
              <Link href={`/prototypes/${proto.id}`}>
                <div className={styles.image_placeholder}>
                  <Image
                    src={`${url}${proto.image}`}
                    width={300}
                    height={300}
                    alt="Picture of the author"
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
                  {username}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
