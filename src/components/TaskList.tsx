'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Supabase クライアントをインポート

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      // セッション情報（ログインユーザー）を取得
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setError("セッションの取得に失敗しました");
        return;
      }
      if (!session) {
        setError("ユーザーがログインしていません");
        return;
      }

      // ログイン済みユーザーのIDでタスクをフィルタ
      const userId = session.user.id;

      const { data, error: selectError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);

      if (selectError) {
        setError("タスク一覧の取得に失敗しました: " + selectError.message);
      } else {
        setTasks(data as Task[]);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">タスク一覧</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            {task.title} {task.completed ? "(完了)" : "(未完了)"}
          </li>
        ))}
      </ul>
    </div>
  );
}