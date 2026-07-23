// middreware.ts
import { isTokenValid } from "@/lib/utils/auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// 未ログイン時でも見れる画面のリスト
const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/", "/prototype"];

export function middleware(request: NextRequest) {
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
