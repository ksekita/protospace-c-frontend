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
      catchCopy: "チームのタスクをひと目で把握",
      concept:
        "リアルタイムで同期されるタスク管理ツールです。直感的な操作を目指しました。",
      image: "https://example.com/images/prototype1.jpg",
    },
    {
      id: 2,
      title: "レシピ共有サービス Yummy",
      catchCopy: "毎日の献立にもう迷わない",
      concept: "冷蔵庫の余り物から最適なレシピを提案するサービスです。",
      userId: 1,
      user: {
        name: "山田 太郎",
      },
    },
  ],
};
