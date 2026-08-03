import Link from "next/link";
import styles from "./Greeting.module.css";
import { userInfo } from "@/lib/api/useGetPrototype";

export default async function Greeting() {
  const user = await userInfo();
  const userId = user.id;
  const userName = user.name;
  if (userId === null || userId === undefined) {
    return null;
  } else {
    return (
      <div className={styles.greeting}>
        こんにちは、
        <Link href={`/users/${userId}`} className={styles.user_link}>
          {userName}さん
        </Link>
      </div>
    );
  }
}
