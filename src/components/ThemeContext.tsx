// components/ThemeContext.tsx
'use client'
import React, { createContext, useState } from 'react'

// ダークテーマ・ライトテーマの型定義
type Theme = 'light' | 'dark'

// コンテキストで扱う値の型（現在のテーマとテーマを切り替える関数）
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

// Context の作成。初期値は undefined として、プロバイダー外での利用時にエラーとする
export const ThemeContext = createContext<ThemeContextType | null>(null)

// ThemeProvider コンポーネント：子コンポーネントにテーマ情報とテーマ切り替え関数を提供する
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
