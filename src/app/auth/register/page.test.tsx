import { registerAction } from "@/lib/actions/authActions";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import RegisterPage from "./page";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/actions/authActions", () => ({
  registerAction: vi.fn(),
}));

// ベースデータ
export const baseInputState = {
  email: "user@example.com",
  username: "testuser",
  profile: "自己紹介です",
  affiliation: "開発部",
  position: "エンジニア",
};

// フォーム入力を関数化
async function fillRegisterForm(customValues: Record<string, string> = {}) {
  // ベースデータとカスタムしたいデータを入れる
  const data = {
    ...baseInputState,
    password: "password",
    password_confirmation: "password",
    ...customValues,
  };

  // 入力する画面一覧
  const emailInput = screen.getByLabelText(/メールアドレス/i);
  const passwordInput = screen.getByLabelText("パスワード (6文字以上)");
  const passwordConfirmInput = screen.getByLabelText(/パスワード再入力/i);
  const usernameInput = screen.getByLabelText(/ユーザー名/i);
  const profileInput = screen.getByLabelText(/プロフィール/i);
  const affiliationInput = screen.getByLabelText(/所属/i);
  const positionInput = screen.getByLabelText(/役職/i);

  if (data.email) await userEvent.type(emailInput, data.email);
  if (data.password) await userEvent.type(passwordInput, data.password);
  if (data.password_confirmation)
    await userEvent.type(passwordConfirmInput, data.password_confirmation);
  if (data.username) await userEvent.type(usernameInput, data.username);
  if (data.profile) await userEvent.type(profileInput, data.profile);
  if (data.affiliation)
    await userEvent.type(affiliationInput, data.affiliation);
  if (data.position) await userEvent.type(positionInput, data.position);

  return {
    emailInput,
    usernameInput,
    profileInput,
    affiliationInput,
    positionInput,
  };
}

// ボタン押す関数
export async function submitButton() {
  const submitButton = screen.getByRole("button", { name: /新規登録/i });
  await userEvent.click(submitButton);
}

describe("ユーザー登録のてすと", () => {
  // 各テストが実行される前に、モックの呼び出し回数や履歴をリセット
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("ユーザー名が空のときにエラーメッセージが表示され、それぞれの入力欄に入力した値が残ること", async () => {
    // エラーを返すかどうか
    vi.mocked(registerAction).mockResolvedValueOnce({
      ...baseInputState,
      username: "",
      error: "入力内容に不備があります",
      fieldErrors: { username: "ユーザー名を入力してください" },
    });

    render(<RegisterPage />);

    // 入力する項目をあてはめる
    const inputs = await fillRegisterForm({ username: "" });

    await submitButton();

    // pタグのエラー文を探すときはfindByTextがいいらしい
    const errorMsg = await screen.findByText(/ユーザー名を入力してください/i);

    // エラーメッセージが表示されているか確認
    expect(errorMsg).toBeInTheDocument();
    expect(
      await screen.findByText(/ユーザー名を入力してください/i),
    ).toBeInTheDocument();

    // registerAction呼び出し
    expect(registerAction).toHaveBeenCalled();

    // 入力した値が残っている確認
    expect(inputs.emailInput).toHaveValue(baseInputState.email);
    expect(inputs.profileInput).toHaveValue(baseInputState.profile);
    expect(inputs.affiliationInput).toHaveValue(baseInputState.affiliation);
    expect(inputs.positionInput).toHaveValue(baseInputState.position);
  });

  test("メールアドレスが空のときにエラーメッセージが表示され、それぞれの入力欄に入力した値が残ること", async () => {
    // エラーを返すかどうか
    vi.mocked(registerAction).mockResolvedValueOnce({
      ...baseInputState,
      email: "",
      error: "入力内容に不備があります",
      fieldErrors: { email: "メールアドレスを入力してください" },
    });

    render(<RegisterPage />);

    // 入力する項目をあてはめる
    const inputs = await fillRegisterForm({ email: "" });

    await submitButton();

    // pタグのエラー文を探すときはfindByTextがいいらしい
    const errorMsg =
      await screen.findByText(/メールアドレスを入力してください/i);

    // エラーメッセージが表示されているか確認
    expect(errorMsg).toBeInTheDocument();
    expect(
      await screen.findByText(/メールアドレスを入力してください/i),
    ).toBeInTheDocument();

    // registerAction呼び出し
    expect(registerAction).toHaveBeenCalled();

    // 入力した値が残っている確認
    expect(inputs.usernameInput).toHaveValue(baseInputState.username);
    expect(inputs.profileInput).toHaveValue(baseInputState.profile);
    expect(inputs.affiliationInput).toHaveValue(baseInputState.affiliation);
    expect(inputs.positionInput).toHaveValue(baseInputState.position);
  });

  test("パスワードが不一致のときにエラーメッセージが表示され、それぞれの入力欄に入力した値が残ること", async () => {
    // エラーを返すかどうか
    vi.mocked(registerAction).mockResolvedValueOnce({
      ...baseInputState,
      error: "入力内容に不備があります",
      fieldErrors: { password: "確認用パスワードと一致しません" },
    });

    render(<RegisterPage />);

    // 入力する項目をあてはめる
    const inputs = await fillRegisterForm({
      password_confirmation: "wrong_password",
    });

    await submitButton();

    // pタグのエラー文を探すときはfindByTextがいいらしい
    const errorMsg = await screen.findByText(/確認用パスワードと一致しません/i);

    // エラーメッセージが表示されているか確認
    expect(errorMsg).toBeInTheDocument();
    expect(
      await screen.findByText(/確認用パスワードと一致しません/i),
    ).toBeInTheDocument();

    // registerAction呼び出し
    expect(registerAction).toHaveBeenCalled();

    // 入力した値が残っている確認
    expect(inputs.emailInput).toHaveValue(baseInputState.email);
    expect(inputs.usernameInput).toHaveValue(baseInputState.username);
    expect(inputs.profileInput).toHaveValue(baseInputState.profile);
    expect(inputs.affiliationInput).toHaveValue(baseInputState.affiliation);
    expect(inputs.positionInput).toHaveValue(baseInputState.position);
  });

  // テスト成功バージョン
  test("ユーザーが正しい情報を入力したとき、エラーが出ずにregisterActionが実行されること", async () => {
    // エラーを返さないのでなにもなし
    vi.mocked(registerAction).mockResolvedValueOnce({});

    render(<RegisterPage />);

    await fillRegisterForm();

    await submitButton();

    // registerActionにFormDataが渡されたかどうか
    expect(registerAction).toHaveBeenCalledWith(expect.any(FormData));

    const errorMeg = screen.queryByRole("alert");
    expect(errorMeg).not.toBeInTheDocument();

    const globalError = screen.queryByText("入力内容に不備があります");
    expect(globalError).not.toBeInTheDocument();
  });
});
