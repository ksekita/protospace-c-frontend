// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 未ログイン時でも見れる画面のリスト
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/",
  "/prototype",
  "/prototype/detail",
];

export function proxy(request: NextRequest) {
  // リクエストしてるページのurl
  const { pathname } = request.nextUrl;

  // クッキーからトークンを取得
  const token = request.cookies.get("jwt_token")?.value;

  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 未ログイン時リストに入ってたらクリア
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // トークンが無い（未ログイン）状態で、保護されたページにアクセスしようとした場合
  if (!token) {
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
