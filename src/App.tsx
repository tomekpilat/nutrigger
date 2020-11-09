import React from 'react';
import './App.css';

const add = async () => {
  await fetch('/api/message');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={add}>Add leaf</button>
        <button>Remove leaf</button>
        <button>Send a nudge</button>
      </header>
    </div>
  );
}

export default App;
