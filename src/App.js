import { useState } from "react";

export default function App() {
  const [input, setInput] = useState('');
  
  function handleSubmit(e){
    e.preventDefault();
    console.log(input)
  }

  return (
    <div className="App">
      <h1>TODO List</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Make Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">ADD TODO</button>
      </form>
    </div>
  );
}