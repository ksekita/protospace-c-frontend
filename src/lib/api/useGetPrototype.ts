import { useState, useEffect } from "react";
// import axios from "axios"; バックエンド接続時にコメント解除
import { Prototype } from "@/types/prototype";

// TODO: バックエンドAPI完成後、以下のダミーデータを削除して実際のAPI（/api/prototypes）から取得する処理に切り替える
const dummyPrototypes = [
  {
    id: 1,
    title: "テストプロトタイプ",
    catchphrase: "テスト用のキャッチコピー",
    concept: "テスト用のコンセプト",
    userId: 1,
    user: { name: "テストユーザー" },
  },
];

export const useGetPrototypes = () => {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrototypes = async () => {
      try {
        setIsLoading(true);
        // TODO: バックエンド疎通時にコメント解除する
        // const response = await axios.get<Prototype[]>("/api/prototypes");
        // setPrototypes(response.data);

        // バックエンド疎通前はダミーデータをセット
        setPrototypes(dummyPrototypes);
      } catch (err) {
        console.error(err);
        setError("データの読み込みに失敗しました。再読み込みしてください。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrototypes();
  }, []);

  return {
    prototypes,
    isLoading,
    error,
  };
};
