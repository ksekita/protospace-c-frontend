import { UserDetailResponse } from "@/types/UserDetailResponse";

// 2. コンポーネントやテストで使えるモックデータ
export const mockUserDetailResponse: UserDetailResponse = {
  userDetail: {
    name: "山田 太郎",
    profile:
      "フロントエンドエンジニアとして5年の経験があります。ReactとTypeScriptを活用したUI/UXの改善が得意です。",
    affiliation: "株式会社テクノロジー",
    position: "リードエンジニア",
  },
  prototypeList: [
    {
      id: 1,
      title: "タスク管理アプリ TaskSync",
      catchphrase: "チームのタスクをひと目で把握",
      concept:
        "リアルタイムで同期されるタスク管理ツールです。直感的な操作を目指しました。",
      imageUrl: "https://example.com/images/prototype1.jpg",
      userId: 1,
      user: {
        name: "山田 太郎",
      },
      createdAt: "2026-07-24T10:00:00Z",
    },
    {
      id: 2,
      title: "レシピ共有サービス Yummy",
      catchphrase: "毎日の献立にもう迷わない",
      concept: "冷蔵庫の余り物から最適なレシピを提案するサービスです。",
      userId: 1,
      user: {
        name: "山田 太郎",
      },
    },
  ],
};
