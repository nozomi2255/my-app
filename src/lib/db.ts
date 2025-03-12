// src/lib/db.ts
export async function getUserInfo(): Promise<{ user: { name: string; email: string } }> {
    // 仮のユーザー情報を返す例
    return { user: { name: "John Doe", email: "john@example.com" } };
  }