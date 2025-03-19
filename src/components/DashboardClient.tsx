'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { createClient } from '../utils/supabase/client'
import { Task, User } from '../app/types'

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

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
  const fetchTasks = async () => {
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
  }

  // 🚀 **タスク一覧の取得**
  useEffect(() => {
    if (!user) return
    fetchTasks()
  }, [user])

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
      </div>
    </div>
  )
}
