import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreatePrototypeAction } from "./cratatePrototypeAction";
import api from "../api/layout/apiClient";
import { redirect } from "next/navigation";
import axios from "axios";

// 外部モジュールのモック化
vi.mock("./apiClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("axios", () => {
  const mockIsAxiosError = vi.fn();
  return {
    default: {
      isAxiosError: mockIsAxiosError,
    },
    isAxiosError: mockIsAxiosError,
  };
});

function createFormData(data: Record<string, string>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

describe("CreatePrototypeAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("バリデーションの検証", () => {
    it("未入力の項目がある場合、エラーと fieldErrors を返すこと", async () => {
      // 画像やキャッチコピーなどが空の状態
      const formData = createFormData({
        title: "テストタイトル",
        catchCopy: "",
        concept: "",
        image: "",
      });

      const result = await CreatePrototypeAction(null, formData);

      expect(result).toEqual({
        title: "テストタイトル",
        catchCopy: "",
        concept: "",
        image: "",
        error: "未入力の項目があります",
        fieldErrors: {
          title: undefined,
          catchCopy: "キャッチコピーを入力してください",
          concept: "コンセプトを入力してください",
          image: "画像を入力してください",
        },
      });

      expect(api.post).not.toHaveBeenCalled();
    });
  });

  describe("正常系の検証", () => {
    it("全項目が正しく入力されている場合、APIが呼ばれてトップページへリダイレクトされること", async () => {
      const formData = createFormData({
        title: "新規アプリ",
        catchCopy: "便利なアプリです",
        concept: "開発効率化",
        image: "app.png",
      });

      vi.mocked(api.post).mockResolvedValueOnce({ data: {} });

      await CreatePrototypeAction(null, formData);

      expect(api.post).toHaveBeenCalledWith("prototypes/new", {
        title: "新規アプリ",
        catchCopy: "便利なアプリです",
        concept: "開発効率化",
        image: "app.png",
      });

      expect(redirect).toHaveBeenCalledWith("/");
    });
  });

  describe("異常系（APIエラー）の検証", () => {
    it("Axiosエラーが発生した場合、レスポンスメッセージを返すこと", async () => {
      const formData = createFormData({
        title: "新規アプリ",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "app.png",
      });

      const mockError = {
        response: {
          data: {
            message: "投稿処理に失敗しました",
          },
        },
      };

      vi.mocked(api.post).mockRejectedValueOnce(mockError);
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      const result = await CreatePrototypeAction(null, formData);

      expect(result).toEqual({
        title: "新規アプリ",
        catchCopy: "キャッチコピー",
        concept: "投稿処理に失敗しました",
      });
    });
  });
});
