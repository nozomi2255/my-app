// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// 環境変数から Supabase の URL と匿名キーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Supabase クライアントのインスタンスを作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);