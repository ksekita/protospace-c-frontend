import { UserDetailType } from "@/types/UserDetailType";

// 2. コンポーネントやテストで使えるモックデータ
export const mockUserDetailResponse: UserDetailType = {
  responseUserInfo: {
    id: 1,
    name: "山田 太郎",
    profile:
      "フロントエンドエンジニアとして5年の経験があります。ReactとTypeScriptを活用したUI/UXの改善が得意です。",
    affiliation: "株式会社テクノロジー",
    position: "リードエンジニア",
  },
  responsePrototypeList: [
    {
      id: 1,
      title: "タスク管理アプリ TaskSync",
      catchCopy:
        "リアルタイムで同期されるタスク管理ツールです。直感的な操作を目指しました。",
      image: "https://example.com/images/prototype1.jpg",
    },
    {
      id: 2,
      title: "レシピ共有サービス Yummy",
      catchCopy: "冷蔵庫の余り物から最適なレシピを提案するサービスです。",
      image: "https://example.com/images/prototype2.jpg",
    },
  ],
};
