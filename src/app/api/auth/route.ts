import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ user: null, error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      name: user.user_metadata.full_name || 'User',
      email: user.email || 'メールアドレスがありません',
      id: user.id,
    },
  })
}
