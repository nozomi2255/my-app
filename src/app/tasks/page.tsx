import React from 'react';
import { fetchUserTasks } from './tasksActions';

export default async function TasksPage() {
  let tasks = [];
  let errorMessage = '';

  try {
    tasks = await fetchUserTasks();
  } catch (error: any) {
    errorMessage = error.message;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
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