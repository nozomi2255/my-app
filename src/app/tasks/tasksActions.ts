// src/app/counter/tasksActions.ts
'use server'
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';


/**
 * ユーザー情報を取得する関数
 */
export async function getUserInfo(): Promise<User | null> {
    const supabase = await createClient();
  
    // まず認証済みユーザー情報を取得
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("getUserInfo error:", error);
      throw error;
    }
    if (!user) return null;
    return user;
}

/**
 * ログイン済みユーザーのタスク一覧を取得する関数
 */
export async function fetchUserTasks(): Promise<any> {
    // getUserInfo() を使って認証済みのユーザー情報を取得
    const user: User | null = await getUserInfo();
    if (!user) {
      throw new Error("ユーザーが認証されていません");
    }
  
    // サーバーサイド用の Supabase クライアントを生成
    const supabase = await createClient();
  
    // RPC を呼び出して、get_user_tasks 関数に user_uuid パラメータを渡す
    const { data, error } = await supabase.rpc("get_user_tasks", { user_uuid: user.id });
  
    if (error) {
      throw error;
    }
  
    return data;
}