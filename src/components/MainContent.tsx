import { createClient } from '@supabase/supabase-js'; // Supabaseクライアントをインポート
import Dashboard from '../../components/DashboardClient'; // ユーザー情報を表示する子コンポーネント
import TaskCreator from '../../components/TaskCreator'; // TaskCreatorをインポート
import TaskList from '../../components/TaskList'; // TaskListをインポート

// SupabaseのURLと公開鍵を設定
const supabaseUrl = 'YOUR_SUPABASE_URL'; // ここにあなたのSupabaseのURLを入力
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // ここにあなたのSupabaseの公開鍵を入力

// Supabaseクライアントを作成
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function DashboardPage() {
    // SSR のタイミングでセッションからユーザー情報を取得する
    const { data: session } = await supabase.auth.getSession(); // Supabaseを使用してセッションを取得
    // セッションが存在すれば user、存在しなければデフォルトのユーザー情報を設定
    const user = session?.user || { name: "Default User", email: "default@example.com" };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Dashboard user={user as { name: string; email: string }} />
        <TaskCreator /> {/* TaskCreatorを表示 */}
        <TaskList /> {/* TaskListを表示 */}
      </div>
    );
}
