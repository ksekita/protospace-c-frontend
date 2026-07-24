import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PrototypeList from "./PrototypeList";
import { Prototype } from "@/types/prototype";

const mockPrototypes: Prototype[] = [
  {
    id: 1,
    title: "アプリA",
    catchphrase: "キャッチA",
    concept: "コンセプトA",
    userId: 101,
    user: { name: "山田 太郎" },
  },
  {
    id: 2,
    title: "アプリB",
    catchphrase: "キャッチB",
    concept: "コンセプトB",
    userId: 102,
    user: { name: "佐藤 花子" },
  },
];

describe("PrototypeListコンポーネント", () => {
  test("プロトタイプの情報がリストとして表示されること", () => {
    render(<PrototypeList prototypes={mockPrototypes} />);

    // アプリAとアプリBのタイトルが表示されているか
    expect(screen.getByText("アプリA")).toBeInTheDocument();
    expect(screen.getByText("アプリB")).toBeInTheDocument();

    // コンセプトが表示されているか
    expect(screen.getByText("コンセプトA")).toBeInTheDocument();
  });

  test("正しいURLのリンクが生成されていること", () => {
    render(<PrototypeList prototypes={mockPrototypes} />);

    // タイトルのリンク (例: アプリA) を取得して、href属性をチェック
    const titleLink = screen.getByRole("link", { name: "アプリA" });
    expect(titleLink).toHaveAttribute("href", "/prototypes/1");

    // 作者名のリンク (例: 山田 太郎) を取得して、href属性をチェック
    const authorLink = screen.getByRole("link", { name: "山田 太郎" });
    expect(authorLink).toHaveAttribute("href", "/users/101");
  });
});
