"use client";
import { useState } from 'react';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>カウンター: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}