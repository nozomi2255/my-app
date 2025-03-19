'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // 便利のために型キャストしています
  // 実際には、入力の検証を行うべきです
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error') // エラーが発生した場合はエラーページにリダイレクト
  }

  revalidatePath('/', 'layout') // レイアウトを再検証
  redirect('/dashboard') // ダッシュボードにリダイレクト
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // 便利のために型キャストしています
  // 実際には、入力の検証を行うべきです
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error') // エラーが発生した場合はエラーページにリダイレクト
  }

  revalidatePath('/', 'layout') // レイアウトを再検証
  redirect('/login') // ログインページにリダイレクト
}
