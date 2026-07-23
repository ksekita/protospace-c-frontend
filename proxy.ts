// proxy.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// 未ログイン時でも見れる画面のリスト
const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/", "/prototype"];

export function proxy(request: NextRequest) {
  // リクエストしてるページのurl
  const { pathname } = request.nextUrl;

  // クッキーからトークンを取得
  const token = request.cookies.get("jwt_token")?.value;

  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // prototypeの中ではじくものを決める
  const isPrototypeDetail =
    pathname.startsWith("/prototype/") &&
    pathname !== "/prototype/new" &&
    !pathname.endsWith("/edit"); //

  const isUserPage =
    pathname.startsWith("/user/") && !pathname.endsWith("/edit");

  // 未ログイン時リストに入ってたらクリア
  if (PUBLIC_ROUTES.includes(pathname) || isPrototypeDetail || isUserPage) {
    return NextResponse.next();
  }

  // トークンが無い（未ログイン）状態で、保護されたページにアクセスしようとした場合
  if (!token) {
    // 新規投稿ページは未ログイン時のuserはホーム画面に弾く
    if (pathname === "/prototype/new" || pathname.endsWith("/edit")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ログイン画面（/auth/login）へ強制リダイレクト
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // トークンがあれば、そのまま次の処理（ページ表示）へ進む
  return NextResponse.next();
}

// 認証を適用する設定
export const config = {
  matcher: [
    /*
     * 以下を除くすべてのリクエストパスにマッチさせる:
     * - api (API ルート)
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコン)
     * - images (パブリック画像フォルダーなど)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
