//app/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { SupabaseClient, User } from '@supabase/supabase-js'

export default async function Home(): Promise<never> {
  const supabase: SupabaseClient = await createClient()
  const { data } = await supabase.auth.getUser()
  const user: User | null = data?.user ?? null

  if (user) {
    return redirect('/login') // `return` を明示
  }
  return redirect('/login') // `return` を明示
}
