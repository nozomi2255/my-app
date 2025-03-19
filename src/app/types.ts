// タスクの型定義
export type Task = {
  id: number
  title: string
  description?: string
  completed: boolean
  user_id: string
}

// ユーザーの型定義
export type User = {
  id: string
  email: string
  name: string
}
