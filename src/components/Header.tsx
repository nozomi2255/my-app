'use client'
import React from 'react';
import { ThemeProvider, useTheme } from '../app/ThemeContext'; // ThemeContext.tsx のパスに合わせて変更してください

function HeaderContent() {
  // useTheme フックを使って現在のテーマとテーマ切り替え関数を取得
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4 bg-gray-200 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <button 
        onClick={toggleTheme} // ボタン押下でテーマ切り替え
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  );
}

// Headerコンポーネント：ThemeProviderでHeaderContentをラップしています
export default function Header() {
  return (
    <ThemeProvider>
      <HeaderContent />
    </ThemeProvider>
  );
}