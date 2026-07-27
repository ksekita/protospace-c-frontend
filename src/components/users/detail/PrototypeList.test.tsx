import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PrototypeList from "./PrototypeList";
import { Prototype } from "@/types/prototype";
import { mockUser } from "./Detail.test";

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
    userId: 101,
    user: { name: "山田 太郎" },
  },
];

describe("PrototypeListコンポーネント", () => {
  test("プロトタイプの情報がリストとして表示されること", () => {
    render(
      <PrototypeList username={mockUser.name} prototypes={mockPrototypes} />,
    );

    // アプリAとアプリBのタイトルが表示されているか
    expect(screen.getByText("アプリA")).toBeInTheDocument();
    expect(screen.getByText("アプリB")).toBeInTheDocument();

    // コンセプトが表示されているか
    expect(screen.getByText("コンセプトA")).toBeInTheDocument();
  });

  test("正しいURLのリンクが生成されていること", () => {
    render(
      <PrototypeList username={mockUser.name} prototypes={mockPrototypes} />,
    );

    // タイトルのリンクを取得して、href属性をチェック
    const titleLink1 = screen.getByRole("link", { name: "アプリA" });
    expect(titleLink1).toHaveAttribute("href", "/prototypes/1");
    const titleLink2 = screen.getByRole("link", { name: "アプリB" });
    expect(titleLink2).toHaveAttribute("href", "/prototypes/2");

    // 作者名のリンク (例: 山田 太郎) を取得して、href属性をチェック
    const authorLinks = screen.getAllByRole("link", { name: "山田 太郎" });
    // すべてのリンクが正しいhref属性を持っているかチェックする
    authorLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/users/101");
    });
  });
});
