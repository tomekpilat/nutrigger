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

  const nudgeMe = () => {
    fetch('http://69522cbc3c88.ngrok.io/api/proactive')
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={onChangeHandler} />
        <button onClick={() => add(value)}>Post event</button>

        <button onClick={nudgeMe}>Nudge me</button>
      </header>
    </div>
  );
}

export default App;
