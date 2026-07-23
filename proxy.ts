// proxy.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// 未ログイン時でも見れる画面のリスト
const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/", "/prototype"];

// トークンの有効期限をチェックするヘルパー関数 (Edge互換)
function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return false;

    // Base64URL を Base64 に変換してデコード
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    // 有効期限が現在時刻より後なら有効
    return Date.now() < payload.exp * 1000;
  } catch {
    return false; // デコード失敗時は無効扱い
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt_token")?.value;

  // トークンが存在し、かつ有効かどうかを判定
  const isLoggedIn = isTokenValid(token);

  // ログイン済みならログイン・登録画面からはホームにリダイレクト
  if (
    isLoggedIn &&
    (pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isEditPage = /\/edit\/?$/.test(pathname);

  const isPrototypeDetail =
    pathname.startsWith("/prototype/") &&
    pathname !== "/prototype/new" &&
    !isEditPage;

  const isUserPage = pathname.startsWith("/user/") && !isEditPage;

  // 未ログイン時リストに入ってたらクリア
  if (PUBLIC_ROUTES.includes(pathname) || isPrototypeDetail || isUserPage) {
    return NextResponse.next();
  }

  // 未ログイン、またはトークンの期限が切れている場合
  if (!isLoggedIn) {
    // 新規投稿や編集ページならホーム画面に弾く
    if (pathname === "/prototype/new" || isEditPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // それ以外はログイン画面へ強制リダイレクト
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
