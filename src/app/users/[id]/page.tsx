import UserPrototypeDetail from "@/components/user/UserPrototypeDetail"
import UserProfileDetail from "@/components/user/UserProfileDetail";
import Link from "next/link";
import styles from "./page.module.css"


//全体のレイアウト、余白の配置
//住所パラメータ（Params）やAPIでデータを読み込み（Fetch）、Detailコンポーネントへ転送
//ページの専用スタイルを持つ（page.module.css）
export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <UserProfileDetail id={id} />
      <UserPrototypeDetail id={id} />
    </main>
  );
}
