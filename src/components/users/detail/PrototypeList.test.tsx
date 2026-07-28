import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PrototypeList from "./PrototypeList";
import { mockUser } from "./Detail.test";
import { ResponsePrototypeList } from "@/types/UserDetailType";
import type { ImageProps } from "next/image";

vi.mock("next/image", () => ({
  default: (props: ImageProps) => {
    const { src, alt, width, height, className } = props;

    // srcがStaticImport（オブジェクト）だった場合はテスト用に適当な文字列にする
    const imgSrc = typeof src === "string" ? src : "static-image-stub";

    // eslint-disable-next-line @next/next/no-img-element
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt || ""}
        width={width}
        height={height}
        className={className}
      />
    );
  },
}));

const mockPrototypes: ResponsePrototypeList[] = [
  {
    id: 1,
    title: "アプリA",
    catchCopy: "キャッチコピー",
    image: "/image.png",
  },
  {
    id: 2,
    title: "アプリB",
    catchCopy: "catchCopu",
    image: "/image.png2",
  },
];

describe("PrototypeListコンポーネント", () => {
  test("プロトタイプの情報がリストとして表示されること", () => {
    render(
      <PrototypeList
        username={mockUser.name}
        prototypes={mockPrototypes}
        userId={mockUser.id}
      />,
    );

    // アプリAとアプリBのタイトルが表示されているか
    expect(screen.getByText("アプリA")).toBeInTheDocument();
    expect(screen.getByText("アプリB")).toBeInTheDocument();

    // キャッチコピーが表示されているか
    expect(screen.getByText("キャッチコピー")).toBeInTheDocument();
  });

  test("正しいURLのリンクが生成されていること", () => {
    render(
      <PrototypeList
        username={mockUser.name}
        prototypes={mockPrototypes}
        userId={mockUser.id}
      />,
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
      expect(link).toHaveAttribute("href", "/users/1");
    });
  });
});
