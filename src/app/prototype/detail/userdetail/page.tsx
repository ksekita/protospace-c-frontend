import UserPostsDetail from "@/components/detail/UserPostsDetail"
import UserProfileDetail from "@/components/detail/UserProfileDetail";
import Link from "next/link";
import styles from "./page.module.css"


//全体のレイアウト、余白の配置
//住所パラメータ（Params）やAPIでデータを読み込み（Fetch）、Detailコンポーネントへ転送
//ページの専用スタイルを持つ（page.module.css）
export default function UserDetailPage() {
  return (
    <main>
      {/* ユーザーのプロフィール情報 */}
      <UserProfileDetail />
      {/* ユーザーのprototypes */}
      <UserPostsDetail />
    </main>
  );
}
