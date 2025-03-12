// src/middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * 次のパスで始まるリクエストにはミドルウェアを適用しない:
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化用ファイル)
     * - favicon.ico (ファビコン)
     * 必要に応じて、このパターンを拡張してください。
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}