import React, { useState } from 'react';
import './App.css';

const add = async (value:any) => {
  await fetch('/api/message', {
    method: 'POST',
    body: value
  });
}

function App() {
  const [value, setValue] = useState();
  
  const onChangeHandler = (event:any) => {
    setValue(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={onChangeHandler} />
        <button onClick={() => add(value)}>Post event</button>
      </header>
    </div>
  );
}

export default App;
