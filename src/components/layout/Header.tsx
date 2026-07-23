import Image from "next/image";
import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { cookies } from "next/headers";
import { isTokenValid } from "@/lib/utils/auth";

export default async function Header() {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwt_token")?.value;

  const isLoggedIn = isTokenValid(token);

  return (
    <header className={styles.header}>
      <div className={`${styles.flex} ${styles.inner}`}>
        <div>
          <Image
            src={"/images/logo.png"}
            width={200}
            height={50}
            alt="Header logo"
            priority
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <div className={styles.margin_reset}>
          <AuthNav isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
