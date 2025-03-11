import React from 'react';
import { ThemeProvider } from './ThemeContext'; // ThemeContext.tsx のパスに合わせて調整してください

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider>
      <div>
        {children}
      </div>
    </ThemeProvider>
  );
}