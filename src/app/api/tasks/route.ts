import { NextResponse } from 'next/server';

// GET: タスク一覧を取得
export async function GET(_request: Request) {
    // ここでは仮のタスク一覧を返す例です
    const tasks = [
      { id: 1, title: 'タスク1', completed: false },
      { id: 2, title: 'タスク2', completed: true },
    ];
    return NextResponse.json({ tasks }, { status: 200 }); // 200は成功
}

// POST: 新規タスクを作成
export async function POST(request: Request) {
    const data = await request.json();
    // 仮のタスク作成処理（ID を現在のタイムスタンプで作成）
    const newTask = { id: Date.now(), ...data };
    // 実際のアプリケーションでは DB に保存する処理などを実施します
    return NextResponse.json({ message: 'タスクが作成されました', task: newTask }, { status: 201 }); // 201は作成成功
}


// PUT: タスクを修正
export async function PUT(request: Request) {
    const data = await request.json();
    // 仮のタスク更新処理
    // data に task の ID と変更内容が含まれている前提
    return NextResponse.json({ message: 'タスクが更新されました', task: data }, { status: 200 }); // 200は更新成功
}

// DELETE: タスクを削除
export async function DELETE(request: Request) {
    const data = await request.json();
    // 仮のタスク削除処理（data.id を使ってタスク削除）
    return NextResponse.json({ message: 'タスクが削除されました', taskId: data.id }, { status: 200 }); // 200は削除成功
}
  