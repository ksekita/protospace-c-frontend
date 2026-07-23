import Image from "next/image";
import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import api from "@/lib/api/apiClient";
import { cookies } from "next/headers";

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    // バックエンドにjwtトークンの問い合わせ
    await api.get("auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // オッケーだったらtrue
    return true;
  } catch (error) {
    return false;
  }
}

export default async function Header() {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwt_token")?.value;

  const isLoggedIn = await verifyToken(token);

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
