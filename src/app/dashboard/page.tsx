import React from 'react';
import { createClient } from '@/utils/supabase/server';
import DashboardClient from '../../components/DashboardClient';
import { User } from '@supabase/supabase-js';

export default async function DashboardPage() {
  const supabase = await createClient();

  let tasks = [];
  let userEmail = '';
  let errorMessage = '';
  let userData: User | null = null;

  try {
    // ユーザー情報を取得
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);
    userEmail = user?.email || 'メールアドレスがありません';
    userData = user;
    // tasks テーブルからデータを取得
    const { data, error } = await supabase
      .from('tasks')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    tasks = data || []; // データが存在しない場合は空の配列を設定
  } catch (error: any) {
    errorMessage = error.message; // エラーメッセージを取得
  }

  return (
    <DashboardClient
      user={{ name: 'User', email: userEmail, id: userData?.id || '' }}
      tasks={tasks}
      errorMessage={errorMessage}
    />
  );
}
