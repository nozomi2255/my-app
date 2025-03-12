// src/components/TaskCreator.tsx
'use client'
import React, { useState } from 'react';

export default function TaskCreator() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const createTask = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setMessage(`タスク作成成功: ${data.task.title}`);
      } else if (response.status === 400) {
        setMessage("不正なリクエストです。");
      } else if (response.status === 500) {
        setMessage("サーバーエラーが発生しました。");
      } else {
        setMessage("その他のエラーが発生しました。");
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