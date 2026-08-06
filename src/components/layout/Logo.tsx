import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default async function Logo() {
  "use cache";

  return (
    <Link href={"/prototype"} className={styles.image_box}>
      <Image
        src={"/images/logo.png"}
        width={200}
        height={40}
        alt="logo"
        priority
        className={styles.image}
      />
    </Link>
  );
}
