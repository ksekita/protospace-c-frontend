import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from './UserProfileDetail';
import * as detailsApi from '@/lib/api/details';

describe('UserProfileDetail コンポーネントテスト', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('1. 初期レンダリングのローディング文句', () => {
    vi.spyOn(detailsApi, 'fetchUserProfile').mockReturnValue(new Promise(() => {}));
    render(<UserProfile id="1" />);
    //ローディング文句の確認
    expect(screen.getByText('データを読み込み中...')).toBeInTheDocument();
  });

  it('2. API データロードが成功したらユーザー情報の表示', async () => {
    // API 関数のMocking
    vi.spyOn(detailsApi, 'fetchUserProfile').mockResolvedValueOnce({
      id: 1,
      name: '田中 太郎',
      profile: 'フロントエンド開発者です。',
      affiliation: '開発部',
      position: 'エンジニア',
    });

    render(<UserProfile id="1" />);

    // 非同期 データロードが完了されるまで待機
    await waitFor(() => {
      expect(screen.getByText('田中 太郎さんの情報')).toBeInTheDocument();
      expect(screen.getByText('フロントエンド開発者です。')).toBeInTheDocument();
      expect(screen.getByText('開発部')).toBeInTheDocument();
      expect(screen.getByText('エンジニア')).toBeInTheDocument();
    });
  });

  it('3. 存在しないユーザーのIDが転送されたら、 エラーメッセージ表示', async () => {
    // エラー発生
    vi.spyOn(detailsApi, 'fetchUserProfile').mockRejectedValueOnce(
      new Error('ユーザーが存在しません。')
    );

    render(<UserProfile id="999" />);

    // エラー画面の検証
    await waitFor(() => {
      const alertBox = screen.getByRole('alert');
      expect(alertBox).toHaveTextContent('ユーザーが存在しません。');
    });
  });
});