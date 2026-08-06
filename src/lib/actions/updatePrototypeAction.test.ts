import { describe, it, expect, vi, beforeEach } from "vitest";
import { editPrototypeAction } from "@/lib/actions/updatePrototypeAction"; // アクション関数のパス
import api from "../api/layout/apiClient";
import { redirect } from "next/navigation";
import axios from "axios";

// 1. 外部モジュールのモック化
vi.mock("@/lib/api/layout/apiClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Next.js のサーバー側機能のモックを追加
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue({ value: "mocked-token" }),
  }),
}));

vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
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

describe("editPrototypeAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("バリデーションの検証", () => {
    it("未入力の項目がある場合、エラーとfieldErrorsを返すこと", async () => {
      // タイトルのみ入力し、キャッチコピーとコンセプトを空にする
      const id = 1;
      const formData = createFormData({
        title: "テストタイトル",
        catchCopy: "",
        concept: "",
        image: "",
      });

      const result = await editPrototypeAction(id, null, formData);

      expect(result).toEqual({
        id: 1, // 数値型（number）に修正
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
      expect(api.put).not.toHaveBeenCalled();
    });
  });

  describe("正常系の検証", () => {
    it("入力データが正常な場合、APIが呼ばれてリダイレクトされること", async () => {
      const id = 10;
      const formData = createFormData({
        title: "新しいタイトル",
        catchCopy: "新しいキャッチコピー",
        concept: "新しいコンセプト",
        image: "sample.jpg",
      });

      // api.put の成功をモック
      vi.mocked(api.put).mockResolvedValueOnce({ data: {} });

      await editPrototypeAction(id, null, formData);

      // 正しいURL・FormData・ヘッダーで api.put が呼ばれたか検証
      expect(api.put).toHaveBeenCalledWith(
        "prototypes/10",
        formData,
        expect.objectContaining({
          headers: {
            Authorization: "Bearer mocked-token",
            "Content-Type": "multipart/form-data",
          },
        }),
      );

      // リダイレクト先URLの検証
      expect(redirect).toHaveBeenCalledWith("/prototype/10");
    });
  });

  describe("異常系（APIエラー）の検証", () => {
    it("Axiosエラーが発生した場合、レスポンスのメッセージを返すこと", async () => {
      const id = 10;
      const formData = createFormData({
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

      // api.put がエラーを投げるよう設定
      vi.mocked(api.put).mockRejectedValueOnce(mockError);
      // axios.isAxiosError が true を返すよう設定
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      const result = await editPrototypeAction(id, null, formData);

      expect(result).toEqual({
        id: 10, // 返り値に含まれる id を追加
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
        error: "サーバー側での更新失敗メッセージ",
      });
    });

    it("一般的な通信エラーが発生した場合、デフォルトの通信エラーメッセージを返すこと", async () => {
      const id = 10;
      const formData = createFormData({
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
      });

      vi.mocked(api.put).mockRejectedValueOnce(new Error("Network Error"));
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(false);

      const result = await editPrototypeAction(id, null, formData);

      expect(result).toEqual({
        id: 10, // 返り値に含まれる id を追加
        title: "タイトル",
        catchCopy: "キャッチコピー",
        concept: "コンセプト",
        image: "",
        error: "通信エラーが発生しました",
      });
    });
  });
});
