import Image from "next/image";
import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { cookies } from "next/headers";

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    // トークンの真ん中をBase64デコードして有効期限をチェック
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );

    // 有効期限が現在時刻より後ならOK
    return Date.now() < payload.exp * 1000;
  } catch {
    return false; // デコード失敗＝不正なトークン
  }
}

export default async function Header() {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwt_token")?.value;

  const isLoggedIn = verifyToken(token);

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
