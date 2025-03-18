import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // createServerClient と supabase.auth.getUser() の間にコードを実行しないでください。
  // 簡単なミスが原因で、ユーザーがランダムにログアウトされる問題をデバッグするのが非常に難しくなる可能性があります。

  // 重要: auth.getUser() を削除しないでください。

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login')

  ) {
    // ユーザーがいない場合、ログインページにリダイレクトすることで応答する可能性があります。
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 重要: supabaseResponse オブジェクトをそのまま返す必要があります。
  // NextResponse.next() で新しいレスポンスオブジェクトを作成する場合は、次のことを確認してください:
  // 1. リクエストを渡すこと: 
  //    const myNewResponse = NextResponse.next({ request })
  // 2. クッキーをコピーすること: 
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. myNewResponse オブジェクトを必要に応じて変更しますが、クッキーは変更しないでください！
  // 4. 最後に:
  //    return myNewResponse
  // これが行われないと、ブラウザとサーバーが同期しなくなり、ユーザーのセッションが早期に終了する可能性があります！

  return supabaseResponse
}