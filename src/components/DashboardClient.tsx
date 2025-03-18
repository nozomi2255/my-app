'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type DashboardProps = {
  user: {
    name: string;
    email: string;
    id: string;
  };
  tasks: Task[];
  errorMessage: string;
};



// UserDisplay コンポーネントは、props を受け取って表示し、
// マウント時に useEffect でログを出し、アンマウント時にクリーンアップ処理を実行します。
function UserDisplay({ user }: { user: DashboardProps['user'] }) {
  
    return (
      <div className="mt-4 p-4 border rounded">
        <p>Welcome, {user.name}!</p>
        <p>Your email: {user.email}</p>
      </div>
    );
  }

  export default function Dashboard({ user, tasks, errorMessage }: DashboardProps) {
    const [showUser, setShowUser] = useState(false);
    const router = useRouter(); // useRouter を取得
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const supabase = createClient();

    // ユーザー情報を監視し、ログイン状態が不十分ならログイン画面へリダイレクト
    useEffect(() => {
      if (!user.email) {
        router.push('/login');
      }
    }, [user, router]);

    // ユーザーIDを監視し、ログを出力
    useEffect(() => {
      console.log("Received user.id:", user.id);
    }, [user.id]);

  // RPC を呼び出してタスク追加処理を実行し、追加後にページデータを再取得
  const handleNewTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    // RPC 関数 'insert_task' を呼び出す
    const { error } = await supabase.rpc('insert_task', {
      _title: newTaskTitle.trim(),
      _user_id: user.id,
    });
    if (error) {
      console.error("RPC insert_task error:", error);
    } else {
      // データ挿入後、router.refresh() でサーバー側データの再取得を促す
      router.refresh();
    }
    setNewTaskTitle('');
  };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
        {/* ユーザー情報を常に表示 */}
        <UserDisplay user={user} />
        {errorMessage && <p className="text-red-500">エラー: {errorMessage}</p>}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">タスク一覧</h2>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="mb-2">
                  {task.title} - {task.completed ? '完了' : '未完了'}
                </li>
              ))}
            </ul>
          ) : (
            <p>タスクがありません。</p>
          )}
        </div>
        {/* 新規タスク追加フォーム */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">新規タスク追加</h2>
        <form onSubmit={handleNewTaskSubmit}>
          <input
            type="text"
            placeholder="タスクのタイトルを入力"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            追加する
          </button>
        </form>
         {/* Counter 画面への遷移ボタンを追加 */}
        <button
          onClick={() => router.push('/counter')}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
        >
          カウンター画面へ遷移する
        </button>
      </div>
      </div>
    );
  }