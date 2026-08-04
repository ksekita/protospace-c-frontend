import {} from "@/types/user/detail.type";

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
      image: "/prototype1.jpg",
    },
    {
      id: 2,
      title: "レシピ共有サービス Yummy",
      catchCopy: "毎日の献立にもう迷わない",
      image: "/prototype2.jpg",
    },
  ],
};
