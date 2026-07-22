import { useState, useEffect } from "react";
import axios from "axios";
import { Prototype } from "@/types/prototype";

export const useGetPrototypes = () => {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrototypes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Prototype[]>("/api/prototypes");
        setPrototypes(response.data);
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
