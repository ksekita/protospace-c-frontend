import { useState, useEffect } from "react";
import { Prototype } from "@/types/prototype";

export const useGetPrototypes = () => {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrototypes = async () => {
      try {
        setIsLoading(true);
        // Java側のAPIエンドポイントに合わせてURLは指定する
        const response = await fetch("/api/prototypes");

        if (!response.ok) {
          throw new Error("プロトタイプ一覧の取得に失敗しました");
        }

        const data = await response.json();
        setPrototypes(data);
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
