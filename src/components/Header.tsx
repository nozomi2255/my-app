// components/Header.tsx
'use client'
import React, { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './ThemeContext';

function HeaderContent() {
  // ThemeContext を利用して現在のテーマとテーマ切り替え関数を取得
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext を利用するには ThemeProvider でラップしてください");
  }
  const { theme, toggleTheme } = context;

  // テーマに応じた背景クラスを決定（light: bg-white, dark: bg-gray-900）
  const bgClass = theme === "light" ? "bg-white" : "bg-gray-900";
  // テキスト色も合わせて切り替え（light: text-black, dark: text-white）
  const textClass = theme === "light" ? "text-black" : "text-white";

  return (
    <header className={`p-4 flex justify-between items-center ${bgClass}`}>
      <h1 className={`text-xl font-bold ${textClass}`}>タスク管理アプリ</h1>
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
      <HeaderContent />
  );
}