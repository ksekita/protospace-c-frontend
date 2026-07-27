import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserPrototypeDetail from './UserPrototypeDetail';
import * as prototypesApi from '@/lib/api/details'; 

describe('UserPrototypeDetail 非同期コンポーネントテスト', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('1. 初期レンダリングのロード文句', () => {
    vi.spyOn(prototypesApi, 'fetchUserPrototypes').mockReturnValue(new Promise(() => {}));

    render(<UserPrototypeDetail id="1" />);

    expect(screen.getByText('プロトタイプを読み込み中...')).toBeInTheDocument();
  });

  it('2. API通信が成功したら、ユーザーの名前とprototypeを表示', async () => {
    
    vi.spyOn(prototypesApi, 'fetchUserPrototypes').mockResolvedValueOnce([
      {
        id: 1,
        userId:1,
        email: 'user123@example.com',
        title: 'ウェブアプリ1',
        concept: 'コンセプト2',
        catchphrase: 'キャッチコピー１',
        name: 'ユーザー',
        imageUrl: 'https://example.com/1.jpg',
        createdAt: '2026-03-01',
      },
      {
        id: 2,
        userId:1,
        email: 'user123@example.com',
        title: 'ウェブアプリ2',
        concept: 'コンセプト2',
        catchphrase : 'キャッチコピー2',
        name: 'ユーザー',
        imageUrl: 'https://example.com/2.jpg',
        createdAt: '2026-03-01',
      },
    ]);

    render(<UserPrototypeDetail id="1" />);

    await waitFor(() => {
      // 1. ユーザーの名前が表示されるのか確認
      expect(screen.getByText('ユーザーさんのプロトタイプ')).toBeInTheDocument();

      // 2. プロトタイプの内容確認
      expect(screen.getByText('ウェブアプリ1')).toBeInTheDocument();
      expect(screen.getByText('ウェブアプリ2')).toBeInTheDocument();
    });
  });

  it('3. 詳細リンク(/prototypes/[id])とユーザーリンク(/users/[userId])が正しく設定されている', async () => {
    vi.spyOn(prototypesApi, 'fetchUserPrototypes').mockResolvedValueOnce([
      {
        id: 10,
        userId:1,
        email: 'user123',
        title: 'リンクテスト',
        concept: 'コンセプト',
        name: 'ユーザー',
        catchphrase:'キャッチコピー10',
        imageUrl: 'https://example.com/test.jpg',
      },
    ]);

    render(<UserPrototypeDetail id="1" />);

    await waitFor(() => {
      // 詳細ページのリンク検証
      const detailLink = screen.getByRole('link', { name: /リンクテスト/i });
      expect(detailLink).toHaveAttribute('href', '/prototype/10');

      // ユーザーページのリンク検証
      const userLink = screen.getByRole('link', { name: /by ユーザー/i });
      expect(userLink).toHaveAttribute('href', '/users/1');
    });
  });

  it('4. プロトタイプがない場合のメッセージ表示', async () => {
    vi.spyOn(prototypesApi, 'fetchUserPrototypes').mockResolvedValueOnce([]);

    render(<UserPrototypeDetail id="1" />);

    await waitFor(() => {
      expect(screen.getByText('投稿されたプロトタイプがありません。')).toBeInTheDocument();
    });
  });
});