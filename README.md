# Protospace C (Frontend)

このリポジトリは、Protospace C のフロントエンド・アプリケーション（開発環境）です。
Docker (Dev Containers) を使用して、誰でも一瞬で同じ開発環境を構築できるように設計されています。

## 🛠️ 技術スタック

- **Next.js:** 16.2.10 (App Router)
- **React:** 19.2.4
- **TypeScript:** 5.x
- **Package Manager:** pnpm (v10対応 / `pnpm-workspace.yaml` によるビルド制限管理)

---

## 🚀 開発環境の立ち上げ手順

### 1. 前提条件の確認

お使いのPCに以下がインストールされていることを確認してください。

- Docker Desktop (起動しておくこと)
- Visual Studio Code
- VS Code 拡張機能: **Dev Containers**

### 2. 共通ネットワークの作成 (初回のみ)

バックエンド（Spring Boot）のコンテナと安全に通信を行うため、ホストPC（WSL / Mac等）のターミナルで以下のコマンドを一度だけ実行してください。
_(※バックエンド側の手順で作成済みの場合は、この手順はスキップして構いません)_

```bash
docker network create shared-net
```

### 3. コンテナの起動

1. 本リポジトリを任意のディレクトリにクローンします。

2. VS Code でクローンしたフォルダを開きます。

3. 画面右下に **「Reopen in Container (コンテナで開き直す)」** というポップアップが出たらクリックします。  
   ポップアップが出ない場合は、`Ctrl + Shift + P` (Mac: `Cmd + Shift + P`) を押し、`Dev Containers: Reopen in Container` を選択します。
4. コンテナのビルドと起動が完了するまでしばらく待ちます。初回起動時、pnpm install が自動的に実行されます。

### 4. 環境変数の設定

バックエンドAPIと正しく通信するために、プロジェクトのルート直下（package.json と同じ階層）に .env.local ファイルを新規作成し、以下の内容を貼り付けて保存してください。

ブラウザ（クライアント側）からバックエンドAPIを叩くときのURL

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Next.jsサーバー側（Server Components等）から直接叩くときのURL（Dockerネットワーク内通信）

```bash
SERVER_API_URL=http://app:8080
```

### 5. アプリケーションの起動

VS Code内のターミナルを開き、以下の開発サーバー起動コマンドを実行します。

```bash
pnpm dev
```
