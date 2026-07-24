import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import UserDetail from "./page";
import { userDetail } from "@/lib/api/userDetail";

vi.mock("@/lib/api/userDetail", () => ({
  userDetail: vi.fn(),
}));

// モックデータ
const mockUserDetailResponse = {
  userDetail: {
    name: "山田 太郎",
    profile: "テストプロフィール",
    affiliation: "テスト会社",
    position: "テスト役職",
  },
  prototypeList: [
    {
      id: 1,
      title: "テストアプリ",
      catchphrase: "テスト",
      concept: "テスト",
      userId: 1,
    },
  ],
};

describe("ユーザー詳細ページ (page.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("APIからデータを取得し、画面全体が正しくレンダリングされること", async () => {
    // APIが呼ばれたらモックデータを返すように設定
    vi.mocked(userDetail).mockResolvedValue(mockUserDetailResponse);

    // paramsをPromiseとして作成（Next.jsの仕様に合わせる）
    const mockParams = Promise.resolve({ id: 1 });

    const pageJsx = await UserDetail({ params: mockParams });
    render(pageJsx);

    // API（userDetail）が「ユーザーID: 1」で正しく呼ばれたか？
    expect(userDetail).toHaveBeenCalledWith(1);

    // 子コンポーネント（DetailやPrototypeList）にデータが渡り、画面に表示されているか？
    // 細かいテストは部品側に任せるので、代表的な文字が出ているかだけチェックすればOK！
    expect(screen.getByText("山田 太郎")).toBeInTheDocument(); // Detailに渡ったか
    expect(screen.getByText("テストアプリ")).toBeInTheDocument(); // PrototypeListに渡ったか
  });
});
