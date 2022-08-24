import { useEffect, useState } from "react";

import Todo from "./components/Todo";

import { firebase, auth, firestore } from "./firebase";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <h1>TODO App</h1>
      {user === null ? <SignIn /> : <TodoApp />}
    </div>
  );
}

function SignIn(){
  function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign In With Google!</button>
  )
}

async function getList(){
  const listRef = firestore.collection('todos').doc('H35aL1D4S7zxSIMTJup5');
  const doc = await listRef.get();
  const data = doc.data();
  return data.todoList;
}

function TodoApp(){
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() =>{
    getList().then(list => setTodos(list))
  }, [])

  function handleSubmit(e){
    e.preventDefault();
    
    setTodos(prevList => [input, ...prevList])

    setInput('')
  }

  const todoElements = todos.map(todo => 
    <Todo 
      title={todo}
      desc={todo}
    />)

  return (
    <>
      <h2>TODO List</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Make Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">ADD TODO</button>
      </form>
      {todoElements}
    </>
  );
}