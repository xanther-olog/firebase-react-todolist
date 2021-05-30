/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import TodoComponent from "./TodoComponent";
import db from "./firebase";
import firebase from "firebase/app";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("deadline", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            deadline: doc.data().deadline,
          }))
        );
      });
  }, []);

  const addTodo = () => {
    event.preventDefault();
    setInput();
    db.collection("todos").add({
      todo: input,
      deadline: selectedDate,
      updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div className="App">
      <h1>Your real-time Todo list</h1>
      <form>
        <Grid container justify="space-evenly" alignContent="center">
          <FormControl>
            <InputLabel> Write a To-Do </InputLabel>
            <Input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Deadline Date"
              format="MM/dd/yyyy"
              minDate={new Date()}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <KeyboardTimePicker
              id="time-picker"
              label="Deadline time"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>

          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={addTodo}
          >
            Add To-Do
          </Button>
        </Grid>
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
