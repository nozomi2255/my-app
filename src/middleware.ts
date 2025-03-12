// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
    // /dashboard を含むパスの場合に認証チェックを行う
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      // Supabase のミドルウェア用クライアントを作成
      const supabase = createMiddlewareClient({ req, res: NextResponse.next() })

      // セッション情報を取得
      const { data: { session } } = await supabase.auth.getSession()
      
      // セッション情報がない、またはユーザー情報が含まれていなければ /login へリダイレクト
      if (!session || !session.user) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    
    // 認証が不要な場合は通常のレスポンスを返す
    return NextResponse.next();
}