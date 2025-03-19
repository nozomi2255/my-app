'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
// 子コンポーネント
type CounterProps = {
  message: string
}

function Counter({ message }: CounterProps) {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="text-center mt-8">
      <h2>{message}</h2>
      <h1>カウンター: {count}</h1>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}

// 親コンポーネント
export default function CounterPage() {
  const router = useRouter()
  return (
    <>
      <div className="p-8">
        <Counter message="Hello Counter" />
      </div>
      {/* Counter 画面への遷移ボタンを追加 */}
      <button
        onClick={() => router.push('/dashboard')}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
      >
        ダッシュボード画面へ遷移する
      </button>
    </>
  )
}
