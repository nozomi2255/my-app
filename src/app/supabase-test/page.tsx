'use client'
import React from 'react';
import TaskCreator from '@/components/TaskCreator';
import TaskList from '@/components/TaskList';

export default function SupabaseTestPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Test Page</h1>
      <TaskCreator />
      <TaskList />
    </div>
  );
}