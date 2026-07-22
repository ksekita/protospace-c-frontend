import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NewPrototypePage from "./page";

import { useCreatePrototype } from "../../../lib/api/useCreatePrototype";
vi.mock("../../../lib/api/useCreatePrototype");

describe("新規投稿画面 (NewPrototypePage)", () => {
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("各入力項目と「保存する」ボタンが正しく表示されていること", () => {
    vi.mocked(useCreatePrototype).mockReturnValue({
      isSubmitting: false,
      handleSubmit: mockHandleSubmit,
    });

    render(<NewPrototypePage />);

    expect(
      screen.getByRole("heading", { name: "新規プロトタイプ投稿" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("プロトタイプの名称")).toBeInTheDocument();
    expect(screen.getByLabelText("キャッチコピー")).toBeInTheDocument();
    expect(screen.getByLabelText("コンセプト")).toBeInTheDocument();
    expect(screen.getByLabelText("プロトタイプの画像")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "保存する" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("送信中（isSubmitting = true）のとき、ボタンが「保存中...」になり非活性化（押せない）こと", () => {
    vi.mocked(useCreatePrototype).mockReturnValue({
      isSubmitting: true,
      handleSubmit: mockHandleSubmit,
    });

    render(<NewPrototypePage />);

    const button = screen.getByRole("button", { name: "保存中..." });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("フォーム送信時に handleSubmit が呼び出されること", () => {
    vi.mocked(useCreatePrototype).mockReturnValue({
      isSubmitting: false,
      handleSubmit: mockHandleSubmit,
    });

    render(<NewPrototypePage />);

    const button = screen.getByRole("button", { name: "保存する" });
    fireEvent.click(button);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
