// src/app/api/tasks/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  // URL から必要なパラメータ（例: token_hash, type）を抽出
  const url = new URL(request.url)
  const token_hash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type')

  if (token_hash || type) {
    console.log('Received query params:', { token_hash, type })
  }

  // ユーザー情報を取得
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  // tasks テーブルからデータを取得
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // ユーザー情報と tasks を一緒に返す
  return NextResponse.json({
    user, // セッションから取得したユーザー情報
    tasks: data || [],
  })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { _title, _user_id } = await request.json()

  if (!_title || !_user_id) {
    return NextResponse.json(
      { error: 'タイトルまたはユーザーIDが不足しています。' },
      { status: 400 }
    )
  }

  const { error } = await supabase.rpc('insert_task', {
    _title,
    _user_id,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'タスク追加成功' }, { status: 200 })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { id, title } = await request.json()

  if (!id || !title) {
    return NextResponse.json({ error: 'ID またはタイトルが不足しています。' }, { status: 400 })
  }

  const { error } = await supabase.from('tasks').update({ title }).eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'タスク更新成功' }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ error: 'ID が不足しています。' }, { status: 400 })
  }

  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'タスク削除成功' }, { status: 200 })
}
