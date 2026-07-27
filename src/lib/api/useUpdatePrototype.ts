import { useState } from "react";
import axios from "axios";
import { UpdatePrototypeInput } from "@/types/prototype";
import { useRouter } from "next/navigation";

export const useUpdatePrototype = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (id: string, data: UpdatePrototypeInput) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("catchCopy", data.catchCopy);
    formData.append("concept", data.concept);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    try {
      await axios.put(
        `http://localhost:8080/api/prototypes/${id}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("更新エラー:", error);
      alert("エラーが発生しました。再投稿してください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
