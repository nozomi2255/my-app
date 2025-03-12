// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // /dashboard を含むパスの場合に認証チェックを行う
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      // セッション情報を取得（ここでは getSession がリクエストを受け取ってセッション情報を返すと仮定）
      const session = await getSession(request);
      
      // セッション情報がない、またはユーザー情報が含まれていなければ /login へリダイレクト
      if (!session || !session.user) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    
    // 認証が不要な場合は通常のレスポンスを返す
    return NextResponse.next();
  }