import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import NewPrototypePage from "./page";
import { CreatePrototypeAction } from "@/lib/actions/createPrototypeAction";

// Server Action のモック化
vi.mock("@/lib/api/useCreatePrototype", () => ({
  CreatePrototypeAction: vi.fn(),
}));

vi.mock("@/lib/actions/createPrototypeAction", () => ({
  CreatePrototypeAction: vi.fn(),
}));

describe("新規投稿画面 (NewPrototypePage)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("各入力項目と「保存する」ボタンが正しく表示されていること", () => {
    render(<NewPrototypePage />);

    // 各入力欄のラベルが表示されていること
    expect(screen.getByLabelText("プロトタイプの名称")).toBeInTheDocument();
    expect(screen.getByLabelText("キャッチコピー")).toBeInTheDocument();
    expect(screen.getByLabelText("コンセプト")).toBeInTheDocument();
    expect(screen.getByLabelText("プロトタイプの画像")).toBeInTheDocument();

    // 送信ボタンが存在し、初期状態では活性化（押せる状態）していること
    const button = screen.getByRole("button", { name: "保存する" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test("フォームに入力して「保存する」ボタンを押した際、送信処理（CreatePrototypeAction）が呼ばれること", async () => {
    const user = userEvent.setup();
    render(<NewPrototypePage />);

    // ユーザーが入力を模倣
    await user.type(
      screen.getByLabelText("プロトタイプの名称"),
      "新規テストアプリ",
    );
    await user.type(
      screen.getByLabelText("キャッチコピー"),
      "最高のキャッチコピー",
    );
    await user.type(screen.getByLabelText("コンセプト"), "革新的なコンセプト");

    // 保存ボタンをクリック
    const button = screen.getByRole("button", { name: "保存する" });
    await user.click(button);

    // Server Action (CreatePrototypeAction) が実行されたことを検証
    expect(CreatePrototypeAction).toHaveBeenCalled();
  });
});
