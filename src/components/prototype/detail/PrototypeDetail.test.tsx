import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PrototypeDetailPage from './PrototypeDetail'; 
import * as detailsApi from '@/lib/api/details';

describe('PrototypeDetailPage コンポーネントテスト', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); 
  });

  it('1. 初期レンダリングのローディング文句', () => {
    vi.spyOn(detailsApi, 'fetchPrototypeDetail').mockReturnValue(new Promise(() => {}));

    render(<PrototypeDetailPage id="1" />);

    expect(screen.getByText('データを読み込み中...')).toBeInTheDocument();
  });

  it('2.  API通信が成功したら、prototypeを詳細内容を表示', async () => {
    vi.spyOn(detailsApi, 'fetchPrototypeDetail').mockResolvedValueOnce({
      id: 1,
      userId:1,
      title: 'ウェブアプリ１',
      catchphrase: 'キャッチコピー１',
      concept: 'コンセプト１',
      name: '田中',
      imageUrl: 'https://example.com/prototype-image.jpg',
      createdAt: '2026-03-01',
    });

    render(<PrototypeDetailPage id="1" />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ウェブアプリ１');

      expect(screen.getByText('by 田中')).toBeInTheDocument();

      expect(screen.getByText('キャッチコピー１')).toBeInTheDocument();
      expect(screen.getByText('コンセプト１')).toBeInTheDocument();

      const image = screen.getByRole('img', { name: 'ウェブアプリ１' });
      expect(image).toHaveAttribute('src', 'https://example.com/prototype-image.jpg');
    });
  });

  it('3. 作成者の名前をクリックすると該当ユーザーの詳細ページへ移動(/users/[userId])', async () => {
    vi.spyOn(detailsApi, 'fetchPrototypeDetail').mockResolvedValueOnce({
      id: 10,
      userId:1,
      title: 'テストアップ',
      catchphrase: 'キャッチコピーです',
      concept: 'コンセプトです',
      name: '砂糖',
      imageUrl: 'https://example.com/test.jpg',
    });

    render(<PrototypeDetailPage id="1" />);

    await waitFor(() => {
      const userLink = screen.getByRole('link', { name: /by 砂糖/i });
      expect(userLink).toHaveAttribute('href', '/users/1');
    });
  });

  it('4. 存在しないプロトタイプにアクセスした時、(role="alert")が表示される', async () => {
    vi.spyOn(detailsApi, 'fetchPrototypeDetail').mockRejectedValueOnce(
      new Error('プロトタイプが存在しません。')
    );

    render(<PrototypeDetailPage id="999" />);

    await waitFor(() => {
      const alertBox = screen.getByRole('alert');
      expect(alertBox).toHaveTextContent('プロトタイプが存在しません。');
    });
  });
});