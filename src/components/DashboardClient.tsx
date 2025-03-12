'use client'
import React, { useState, useEffect } from 'react';


type DashboardProps = {
  user: {
    name: string;
    email: string;
  };
};

// UserDisplay コンポーネントは、props を受け取って表示し、
// マウント時に useEffect でログを出し、アンマウント時にクリーンアップ処理を実行します。
function UserDisplay({ user }: DashboardProps) {
    useEffect(() => {
      console.log("UserDisplay mounted. Received props:", user);
      // クリーンアップ処理：アンマウント時に実行され、props の受け取りを遮断する意図を示します
      return () => {
        console.log("UserDisplay unmounted. Props reception stopped.");
      };
    }, [user]);
  
    return (
      <div className="mt-4 p-4 border rounded">
        <p>Welcome, {user.name}!</p>
        <p>Your email: {user.email}</p>
      </div>
    );
  }

  // Dashboard コンポーネントでは、ボタンを押すと UserDisplay コンポーネントのマウント／アンマウントを切り替えます。
export default function Dashboard({ user }: DashboardProps) {
    const [showUser, setShowUser] = useState(false);
  
    return (
      <div className="p-4">
        <button 
          onClick={() => setShowUser(prev => !prev)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showUser ? "Hide User Info" : "Show User Info"}
        </button>
        {showUser && <UserDisplay user={user} />}
      </div>
    );
  }