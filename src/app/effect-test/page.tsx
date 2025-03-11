"use client";
import { useEffect, useState } from 'react';

export default function MyComponent() {
    const [count, setCount] = useState(0);

    // コンポーネントがマウントされた最初だけ実行
    useEffect(() => {
        fetch('/api/hello') // サーバーからデータを取得
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error fetching /api/hello:", error);
        });
        console.log("Component Mounted!");
    }, []);

    // count が変わるたびに実行
    useEffect(() => {
        console.log("Count changed!");
    }, [count]);

    return (
        <div>
            <h1>こんにちは、React!</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}