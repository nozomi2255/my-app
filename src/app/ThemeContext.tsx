'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ダークテーマ・ライトテーマの型定義
type Theme = "light" | "dark";

// コンテキストで扱う値の型（現在のテーマとテーマを切り替える関数）
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

// Context の作成。初期値は undefined として、プロバイダー外での利用時にエラーとする
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider の Props 型
type ThemeProviderProps = {
    children: ReactNode;
};

// ThemeProvider コンポーネント：子コンポーネントにテーマ情報とテーマ切り替え関数を提供する
export function ThemeProvider({ children }: ThemeProviderProps) {
    // useState を利用して現在のテーマを管理。初期値は "light" です。
    const [theme, setTheme] = useState<Theme>("light");

    // テーマ切り替え処理：現在が "light" なら "dark" に、"dark" なら "light" に変更
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };

    // ThemeContext.Provider で子コンポーネントにテーマ情報と切り替え関数を提供します。
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

// カスタムフック useTheme を作成。これでどこでも簡単にテーマ情報にアクセス可能
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme は ThemeProvider 内で利用してください");
    }
    return context;
}