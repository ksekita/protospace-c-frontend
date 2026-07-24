import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Detail from "./Detail";
import { UserDetailType } from "@/types/UserDetailType";

// テスト用のモックデータ
const mockUser: UserDetailType = {
  name: "山田 太郎",
  profile: "フロントエンドエンジニアです。",
  affiliation: "株式会社テスト",
  position: "リーダー",
};

describe("Detailコンポーネント", () => {
  test("渡されたユーザー情報がすべて画面に表示されること", () => {
    render(<Detail user={mockUser} />);

    // 2. 画面内にテキストが存在するか確認 (Assert)
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.profile)).toBeInTheDocument();
    expect(screen.getByText(mockUser.affiliation)).toBeInTheDocument();
    expect(screen.getByText(mockUser.position)).toBeInTheDocument();
  });
});
