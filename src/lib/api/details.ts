import { UserProfileData } from "@/types/users";
import { Prototype } from "@/types/prototypes";

const MOCK_USERS_DB: Record<number, UserProfileData> = {
  1: {
    id: 1,
    name: "田中 太郎",
    profile: "フロントエンド開発者です。ReactとNext.jsが好きです。",
    affiliation: "開発部",
    position: "エンジニア",
  },
  2: {
    id: 2,
    name: "佐藤 花子",
    profile: "UI/UXデザイナーです。",
    affiliation: "デザイン部",
    position: "デザイナー",
  },
};

const MOCK_PROTOTYPES_DB: Prototype[] = [
  {
    id: 1,
    userId: 1,
    email: "user123@example.com",
    title: "ウェブアプリ１",
    catchCopy: "キャッチコピー１",
    concept: "テストコンセプト１",
    imageUrl: "https://picsum.photos/400/300?random=1",
    name: "田中 太郎",
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    userId: 1,
    email: "user123@example.com",
    title: "ウェブアプリ２",
    catchCopy: "キャッチコピー２",
    concept: "テストコンセプト２",
    imageUrl: "https://picsum.photos/400/300?random=2",
    name: "田中 太郎",
    createdAt: "2026-03-02",
  },
  {
    id: 3,
    userId: 2,
    email: "user456@example.com",
    title: "デザイン ツール",
    catchCopy: "キャッチコピー３",
    concept: "UI/UXテストツール",
    imageUrl: "https://picsum.photos/400/300?random=3",
    name: "佐藤 花子",
    createdAt: "2026-03-03",
  },
];

export async function fetchUserProfile(id: number): Promise<UserProfileData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS_DB[id];
      if (user) {
        resolve(user);
      } else {
        reject(new Error("ユーザーが存在しません。"));
      }
    }, 100);
  });
}

export async function fetchUserPrototypes(
  userId: number,
): Promise<Prototype[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS_DB[userId];
      if (!user) {
        resolve([]);
        return;
      }
      const userPrototypes = MOCK_PROTOTYPES_DB.filter(
        (proto) => proto.userId === user.id,
      );
      resolve(userPrototypes);
    }, 100);
  });
}

export async function fetchPrototypeDetail(id: number): Promise<Prototype> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const prototype = MOCK_PROTOTYPES_DB.find((item) => item.id === id);
      if (prototype) {
        resolve(prototype);
      } else {
        reject(new Error("プロトタイプが存在しません。"));
      }
    }, 100);
  });
}
