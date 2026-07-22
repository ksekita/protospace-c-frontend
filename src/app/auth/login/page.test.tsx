import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect } from "vitest";
import LoginPage from "./page";
import { loginAction } from "@/lib/actions/authActions";

// mockにしたいファイルを設定
vi.mock("@/lib/actions/authActions", () => ({
  loginAction: vi.fn(),
}));

// テストと認識させる
describe("ログイン画面のてすと", () => {
  // 失敗したときのテスト
  test("ログインに失敗したとき、エラーメッセージが表示され、入力したメッセージが残ること", async () => {
    // testcase
    // 偽物のloginActionが、今回は「エラーのオブジェクト」を返すように設定
    vi.mocked(loginAction).mockResolvedValueOnce({
      email: "wrong@example.com",
      error: "メールアドレスまたはパスワードが違います",
    });

    // 仮想ブラウザ上にログイン画面を表示する
    render(<LoginPage />);

    // 画面操作
    // screen関数を使用し、ラベルからそれに紐づいているinputタグなどを取得
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const submitButton = screen.getByRole("button", { name: /ログイン/i });

    // userEvent関数を使用し、人間の振る舞いを疑似的に表現
    await userEvent.type(emailInput, "wrong@example.com");
    await userEvent.type(passwordInput, "wrong-password");
    await userEvent.click(submitButton);

    // loginActionが実行されたかのチェック
    expect(loginAction).toHaveBeenCalled();

    // 想定しているエラーメッセージが表示されたか
    // エラーメッセージを出してるロールを取得
    const errorMsg = await screen.findByRole("alert");
    // expect(期待する) errorMsgがtoHaveTextContentで指定した文字と合致している
    expect(errorMsg).toHaveTextContent(
      "メールアドレスまたはパスワードが違います",
    );

    // inputタグの中にログインボタンを押して失敗してもメールアドレスが残ってるか検証
    expect(emailInput).toHaveValue("wrong@example.com");
  });

  // 成功したときのテスト
  test("正しい情報を入力したとき、エラーが出ずにLoginActionが実行されること", async () => {
    vi.mocked(loginAction).mockResolvedValueOnce({});

    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const submitButton = screen.getByRole("button", { name: /ログイン/i });

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    expect(loginAction).toHaveBeenCalled();

    // queryByRole画面に存在しないこと nullを返す
    const errorMsg = screen.queryByRole("alert");
    //ドキュメント（画面）の中に（InTheDocument）存在する（toBe）状態ではない（not）ことを期待する（expect）
    expect(errorMsg).not.toBeInTheDocument();
  });
});
