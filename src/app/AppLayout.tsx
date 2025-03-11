import React from 'react';
import { ThemeProvider } from './ThemeContext'; 

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