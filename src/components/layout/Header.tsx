import Image from "next/image";
import styles from "./Header.module.css";
import AuthNav from "./AuthNav";
import { cookies } from "next/headers";

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return false;

    // Base64URL を Base64 に変換してデコード
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
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
