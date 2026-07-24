import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import PrototypeEditPage from "./page";

// ① axios をモック化
vi.mock("axios");

// ② useRouter をモック化
const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe("PrototypeEditPage (編集画面)", () => {
  const mockParams = { id: "123" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("画面初期表示時にGETリクエストが走り、取得したデータがフォームに入力されていること", async () => {
    const mockData = {
      title: "既存のタイトル",
      catchCopy: "既存のキャッチコピー",
      concept: "既存のコンセプト",
    };

    // anyを使わず、vi.fn() のモック関数として定義する
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: mockData,
    });

    render(<PrototypeEditPage params={mockParams} />);

    // useEffect の GETリクエスト完了を待ち、フォームに値が入ったか検証
    const titleInput = await screen.findByLabelText("プロトタイプの名称");
    const catchCopyInput = await screen.findByLabelText("キャッチコピー");
    const conceptInput = await screen.findByLabelText("コンセプト");

    expect(titleInput).toHaveValue("既存のタイトル");
    expect(catchCopyInput).toHaveValue("既存のキャッチコピー");
    expect(conceptInput).toHaveValue("既存のコンセプト");
  });

  it("フォームを編集して送信すると、PUTリクエストが送信されトップページへ遷移すること", async () => {
    const user = userEvent.setup();

    // anyを使わないモック返り値
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        title: "旧タイトル",
        catchCopy: "旧コピー",
        concept: "旧コンセプト",
      },
    });

    vi.mocked(axios.put).mockResolvedValueOnce({
      data: {},
    });

    render(<PrototypeEditPage params={mockParams} />);

    // 初期表示の完了を待つ
    const titleInput = await screen.findByLabelText("プロトタイプの名称");

    // フォームに入力して変更
    await user.clear(titleInput);
    await user.type(titleInput, "新タイトル");

    // 保存ボタンをクリック
    const submitButton = screen.getByRole("button", { name: "保存する" });
    await user.click(submitButton);

    // PUTリクエストが正しく呼ばれたか検証
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:8080/api/prototypes/123/edit",
        expect.any(FormData),
        expect.objectContaining({
          headers: { "Content-Type": "multipart/form-data" },
        }),
      );
    });

    // 成功後に画面遷移したか検証
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockRefresh).toHaveBeenCalled();
  });
});
