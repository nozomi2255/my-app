// src/lib/auth.ts
import { SessionOptions } from "iron-session";
import type { NextRequest } from "next/server";

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string, // 環境変数に十分な長さのパスワードを設定
  cookieName: "my_app_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// getSession: リクエストからセッションを取得する（実装例は環境に合わせて調整）
export async function getSession(request: NextRequest) {
  // 例: クッキーからセッションを復号するなどの処理
  // 実際は iron-session の withIronSessionApiRoute / withIronSessionSsr を利用することが多いです
  // ここでは仮に、セッションが存在すれば { user: dummyUser } を返す例とします。
  const token = request.cookies.get("token");

  {/*
  if (token) {
    // 仮のユーザー情報（本来はトークンを検証して取得します）
    return { user: { id: 1, name: "John Doe", email: "john@example.com" } };
  }
  return null;
  */}

  // テスト用に、常に dummyUser を返すように変更
  return { user: { id: 1, name: "John Doe", email: "john@example.com" } };
}

// setSession: ユーザー情報をセッションに保存する関数（ログイン時に利用）
export async function setSession(req: any, user: { id: number; name: string; email: string }) {
  req.session.user = user;
  await req.session.save();
}