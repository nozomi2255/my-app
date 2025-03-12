// /src/app/dashboard/page.tsx
import { getUserInfo } from '@/lib/db';
import Dashboard from '../../components/DashboardClient'; // ユーザー情報を表示する子コンポーネント

export default async function DashboardPage() {
    // SSR のタイミングでセッションからユーザー情報を取得する
    const session = await getUserInfo();
    // セッションが存在すれば user、存在しなければデフォルトのユーザー情報を設定
    const user = session?.user || { name: "Default User", email: "default@example.com" };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Dashboard user={user as { name: string; email: string }} />
      </div>
    );
  }