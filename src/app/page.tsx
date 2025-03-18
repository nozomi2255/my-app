// app/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard') // ログイン済みなら /dashboard へ遷移
  } else {
    redirect('/login') // 未ログインなら /login へ遷移
  }
}
