import { useEffect, useState } from "react";

import Todo from "./components/Todo";

import { firebase, auth, firestore } from "./firebase";

import { useAuthState } from 'react-firebase-hooks/auth';

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

  function updateList(){
    getList().then(list => setTodos(list));
  }

  useEffect(() => updateList(), [])

  async function addTodo(e){
    e.preventDefault();

    const listRef = firestore.collection('todos').doc('H35aL1D4S7zxSIMTJup5');

    await listRef.set({
      todoList: [input, ...todos]
    })

    updateList();
    setInput('');
  }

  async function deleteTodo(todo){
    const listRef = firestore.collection('todos').doc('H35aL1D4S7zxSIMTJup5');

    var tempArr = todos.filter(item => item !== todo);

    await listRef.set({
      todoList: tempArr
    })

    updateList();
  }

  const todoElements = todos.map(todo => 
    <Todo 
      title={todo}
      desc={todo}
      handleDelete={deleteTodo}
    />)

  return (
    <>
      <h2>TODO List</h2>
      <form onSubmit={(e) => addTodo(e)}>
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