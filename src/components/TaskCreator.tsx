// src/components/TaskCreator.tsx
'use client'
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TaskCreator() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const createTask = async () => {
    try {
      // 現在のセッション情報を取得
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setMessage(`セッション取得エラー: ${sessionError.message}`);
        return;
      }
      if (!session || !session.user) {
        setMessage("ログインが必要です");
        return;
      }

      const userId = session.user.id;
      // Supabase クライアントを利用して tasks テーブルにタスクを追加
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, user_id: userId })
        .select(); // 挿入後の行を返すために select() を追加

      if (error) {
        // エラーがある場合、エラーメッセージをセット
        setMessage(`エラー: ${error.message}`);
      } else if (data && data.length > 0) {
        // 成功時は挿入されたタスクのタイトルを表示
        setMessage(`タスク作成成功: ${data[0].title}`);
      } else {
        setMessage("タスク作成に失敗しました。");
      }
    } catch (error) {
      console.error("タスク作成エラー:", error);
      setMessage("ネットワークエラーが発生しました。");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">タスク作成</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスクタイトル"
        className="border p-2"
      />
      <button
        onClick={createTask}
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        作成
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}