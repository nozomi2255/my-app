"use client";
import { useState } from 'react';

// 子コンポーネント
type CounterProps = {
    message: string;
};

function Counter({ message }: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>{message}</h2>
      <h1>カウンター: {count}</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2"
        onClick={() => setCount(count + 1)}
      >
        +1
      </button>
    </div>
  );
};

// 親コンポーネント
export default function CounterPage() {
  return (
    <div className="p-8">
      <Counter message="Hello Counter" />
    </div>
  );
}