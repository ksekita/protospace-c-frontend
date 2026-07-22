import PostDetail from "@/components/detail/PostDetail"
import ProfileDetail from "@/components/detail/ProfileDetail";
import UserDetail from "@/components/detail/UserDetail";
import styles from "./page.module.css"


//全体のレイアウト、余白の配置
//住所パラメータ（Params）やAPIでデータを読み込み（Fetch）、Detailコンポーネントへ転送
//ページの専用スタイルを持つ（page.module.css）
export default function UserDetailPage() {
  return (
    <main>
      <h2 className={styles.titleProfile}>名前さんの情報</h2>
      {/* ユーザーのプロフィール情報 */}
      <ProfileDetail />
      <h2 className={styles.titlePrototypes}>名前さんのプロトタイプ</h2>
      {/* ユーザーのprototypes */}
      <UserDetail />
    </main>
  );
}
