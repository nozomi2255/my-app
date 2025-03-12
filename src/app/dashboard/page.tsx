// /src/app/dashboard/page.tsx
import { getUserInfo } from '../../lib/db'; // 仮の DB 呼び出し関数
import Dashboard from '../../components/DashboardClient'; // ユーザー情報を表示する子コンポーネント

export default async function DashboardPage() {
  // SSR のタイミングで DB からユーザー情報を取得する
  const user = await getUserInfo();

  // 取得したユーザー情報を props として Dashboard コンポーネントに渡す
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Dashboard user={user as { name: string; email: string }} />
    </div>
  );
}