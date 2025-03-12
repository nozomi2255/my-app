'use client'
import React, { useState, useEffect } from 'react';

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
      try {
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
        } else {
          setError("タスク一覧の取得に失敗しました。");
        }
      } catch (err) {
        console.error(err);
        setError("ネットワークエラーが発生しました。");
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