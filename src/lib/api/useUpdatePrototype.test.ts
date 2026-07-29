import { describe, it, expect, vi, beforeEach } from "vitest";
import { EditPrototypeAction } from "./useUpdatePrototype"; // アクション関数のパス
import api from "./apiClient";
import { redirect } from "next/navigation";
import axios from "axios";

// 1. 外部モジュールのモック化
vi.mock("./apiClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// axios.isAxiosError が確実にモック関数（vi.fn）として認識されるよう修正
vi.mock("axios", () => {
  const mockIsAxiosError = vi.fn();
  return {
    default: {
      isAxiosError: mockIsAxiosError,
    },
    isAxiosError: mockIsAxiosError,
  };
});

// FormData を簡単に作成するためのヘルパー関数
function createFormData(data: Record<string, string>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

describe("EditPrototypeAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("バリデーションの検証", () => {
    it("未入力の項目がある場合、エラーとfieldErrorsを返すこと", async () => {
      // タイトルのみ入力し、キャッチコピーとコンセプトを空にする
      const formData = createFormData({
        id: "1",
        title: "テストタイトル",
        catchCopy: "",
        concept: "",
        image: "",
      });

      const result = await EditPrototypeAction(null, formData);

      expect(result).toEqual({
        id: "1",
        title: "テストタイトル",
        catchCopy: "",
        concept: "",
        image: "",
        error: "未入力の項目があります",
        fieldErrors: {
          title: undefined,
          catchCopy: "キャッチコピーを入力してください",
          concept: "コンセプトを入力してください",
        },
      });

      // API通信が呼ばれていないことを確認
      expect(api.post).not.toHaveBeenCalled();
    });
  });

  describe("正常系の検証", () => {
    it("入力データが正常な場合、APIが呼ばれてリダイレクトされること", async () => {
      const formData = createFormData({
        id: "10",
        title: "新しいタイトル",
        catchCopy: "新しいキャッチコピー",
        concept: "新しいコンセプト",
        image: "sample.jpg",
      });

      // api.post の成功をモック
      vi.mocked(api.post).mockResolvedValueOnce({ data: {} });

      await EditPrototypeAction(null, formData);

      // 正しいURLとデータで api.post が呼ばれたか検証
      expect(api.post).toHaveBeenCalledWith("prototypes/10/edit", {
        title: "新しいタイトル",
        catchCopy: "新しいキャッチコピー",
        concept: "新しいコンセプト",
        image: "sample.jpg",
      });

      // リダイレクトが実行されたか検証
      expect(redirect).toHaveBeenCalledWith("/");
    });
  });

  describe("異常系（APIエラー）の検証", () => {
    it("Axiosエラーが発生した場合、レスポンスのメッセージを返すこと", async () => {
      const formData = createFormData({
        id: "10",
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
      });

      const mockError = {
        response: {
          data: {
            message: "サーバー側での更新失敗メッセージ",
          },
        },
      };

      // api.post がエラーを投げるよう設定
      vi.mocked(api.post).mockRejectedValueOnce(mockError);
      // axios.isAxiosError が true を返すよう設定
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      const result = await EditPrototypeAction(null, formData);

      expect(result).toEqual({
        id: "10",
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
        error: "サーバー側での更新失敗メッセージ",
      });
    });

    it("一般的な通信エラーが発生した場合、デフォルトの通信エラーメッセージを返すこと", async () => {
      const formData = createFormData({
        id: "10",
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
      });

      vi.mocked(api.post).mockRejectedValueOnce(new Error("Network Error"));
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(false);

      const result = await EditPrototypeAction(null, formData);

      expect(result).toEqual({
        id: "10",
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
        error: "通信エラーが発生しました",
      });
    });
  });
});
