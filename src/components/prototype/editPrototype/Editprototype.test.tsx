import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Editprototype from "./Editprototype";

// Server Action のモック化
vi.mock("@/lib/api/useUpdatePrototype", () => ({
  EditPrototypeAction: vi.fn(),
}));

describe("Editprototype コンポーネント", () => {
  // テスト用のダミー初期データ
  const mockInitialData = {
    id: 10,
    title: "既存のタイトル",
    catchCopy: "既存のキャッチコピー",
    concept: "既存のコンセプト",
    image: "/imagge.png",
  };

  it("親から渡された initialData が各入力欄の初期値（defaultValue）として表示されること", () => {
    render(<Editprototype initialData={mockInitialData} prototypeId={10} />);

    // 各 input / textarea の値を取得して検証
    expect(screen.getByLabelText("プロトタイプの名称")).toHaveValue(
      "既存のタイトル",
    );
    expect(screen.getByLabelText("キャッチコピー")).toHaveValue(
      "既存のキャッチコピー",
    );
    expect(screen.getByLabelText("コンセプト")).toHaveValue("既存のコンセプト");
  });

  it("「保存する」ボタンが表示されていること", () => {
    render(<Editprototype initialData={mockInitialData} prototypeId={10} />);

    const submitButton = screen.getByRole("button", { name: "保存する" });
    expect(submitButton).toBeInTheDocument();
  });
});
