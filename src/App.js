import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import VirtualList from './components/Virtual';

function App() {

  const [count, setCount] = useState(0);

  // 构造 1000 个 item
  const items = Array.from({ length: 1000 }, (_, i) => `Item #${i + 1}`);

  return (
    <div className="App">
      <span>虚拟列表</span>
      <div style={{ width: 300, margin: '0 auto' }}>
        <VirtualList items={items} itemHeight={40} height={400} />
      </div>
    </div>
  );
}

export default App;
