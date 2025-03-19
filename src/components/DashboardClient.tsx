'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useCallback } from 'react'
import { Task, User } from '../app/types'

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [editTaskId, setEditTaskId] = useState<number | null>(null)
  const [editTaskTitle, setEditTaskTitle] = useState<string>('')

  // 🚀 **ログイン状態のチェック**
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth')
        const result = await response.json()

        if (!response.ok || !result.user) {
          router.push('/login')
        } else {
          setUser(result.user)
        }
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error)
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  // 🚀 **タスク一覧の取得関数**
  const fetchTasks = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch('/api/tasks', { cache: 'no-store' })

      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      setTasks(result.tasks || [])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '不明なエラーが発生しました')
    }
  }, [user])

  // 🚀 **タスク一覧の取得**
  useEffect(() => {
    if (!user) return
    fetchTasks()
  }, [fetchTasks, user])

  // タスク追加処理を実行し、追加後にページデータを再取得
  const handleNewTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newTaskTitle.trim() || !user) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _title: newTaskTitle.trim(),
          _user_id: user.id,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'タスク追加に失敗しました')
      }

      console.log('✅ タスク追加成功:', result.message)
      // ✅ 追加後に最新のタスクを取得
      await fetchTasks()
    } catch (error) {
      console.error('タスク追加エラー:', error)
    }

    setNewTaskTitle('')
  }

  // 🚀 **タスクを編集するモードを開始**
  const startEditing = (task: Task) => {
    setEditTaskId(task.id)
    setEditTaskTitle(task.title)
  }

  // 🚀 **タスクの更新**
  const handleUpdateTask = async () => {
    if (!editTaskTitle.trim() || editTaskId === null) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editTaskId, title: editTaskTitle }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'タスク更新に失敗しました')

      await fetchTasks()
      setEditTaskId(null)
      setEditTaskTitle('')
    } catch (error) {
      console.error('タスク更新エラー:', error)
    }
  }

  // 🚀 **タスクの削除**
  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'タスク削除に失敗しました')

      await fetchTasks()
    } catch (error) {
      console.error('タスク削除エラー:', error)
    }
  }

  // 🚀 **ログアウト**
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
  
      if (!response.ok) {
        throw new Error("ログアウトに失敗しました");
      }
  
      // ログアウト後、ログインページへリダイレクト
      router.push('/login');
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
      {user ? (
        <div className="mt-4 p-4 border rounded">
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
        </div>
      ) : (
        <p>ログイン情報を取得中...</p>
      )}
      {errorMessage && <p className="text-red-500">エラー: {errorMessage}</p>}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">タスク一覧</h2>
        {tasks.length > 0 ? (
          <ul>
            {/* タスクリストをマップして各タスク要素を生成 */}
            {tasks.map((task) => (
              <li key={task.id} className="mb-2 flex items-center">
                {/* 編集中のタスクの場合、入力フィールドを表示 */}
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  <span>{task.title}</span>
                )}

                {/* 操作ボタングループ: 編集モードか通常モードで表示が変わる */}
                {editTaskId === task.id ? (
                  <>
                    <button
                      onClick={handleUpdateTask}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditTaskId(null)}
                      className="ml-2 px-2 py-1 bg-gray-500 text-white rounded"
                    >
                      キャンセル
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(task)}
                      className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    >
                      削除
                    </button>
                  </>
                )}
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
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
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
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          ログアウト
        </button>
      </div>
    </div>
  )
}
