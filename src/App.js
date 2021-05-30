/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import TodoComponent from "./TodoComponent";
import db from "./firebase";
import firebase from "firebase/app"

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState([""]);

  useEffect(() => {
    db.collection("todos").orderBy("timestamp","desc").onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo})));
    });
  }, []);

  const addTodo = (valueToAdd) => {
    event.preventDefault();
    setInput([""]);
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  };
  return (
    <div className="App">
      <h1>Your real-time Todo list</h1>
      <form>
        <FormControl>
          <InputLabel> Write a To-Do </InputLabel>
          <Input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add To-Do
        </Button>
      </form>

      <ul>
        {todos.map((item) => (
          <TodoComponent item={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;
