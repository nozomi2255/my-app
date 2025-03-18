import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  let tasks = [];
  let userEmail = '';
  let errorMessage = '';

  try {
    // ユーザー情報を取得
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);
    userEmail = user?.email || 'メールアドレスがありません';

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
      <p>ユーザーのメールアドレス: {userEmail}</p>
      {errorMessage ? (
        <p className="text-red-500">エラー: {errorMessage}</p>
      ) : (
        <>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task: any) => (
                <li key={task.id} className="mb-2">
                  {task.title} - {task.completed ? '完了' : '未完了'}
                </li>
              ))}
            </ul>
          ) : (
            <p>タスクがありません。</p>
          )}
        </>
      )}
    </div>
  );
}
