/* eslint-disable no-unused-vars */
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  Input,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TodoComponent(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.item.todo);
  const [selectedDate, setSelectedDate] = useState(
    new Date(props.item.deadline.seconds * 1000)
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.item.id).set(
      {
        todo: input,
        deadline: selectedDate,
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        {/* <Grid container justify="space-evenly" alignContent="center"> */}
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <h2> Edit current To-Do </h2>
            <Input
              placeholder={props.item.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="date-picker-dialog"
                label="Deadline Date"
                format="MM/dd/yyyy"
                minDate={new Date()}
                value={selectedDate}
                onChange={handleDateChange}
                placeholder={props.item.deadline}
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
              onClick={() => updateTodo()}
              disabled={!input || !selectedDate}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </div>
        </Modal>

        <List className="ListStyles">
          <ListItem>
            <ListItemText
              primary={props.item.todo}
              secondary={"" + new Date(props.item.deadline.seconds * 1000)}
            />
            <EditIcon onClick={() => handleOpen()} />
            <DeleteForeverIcon
              onClick={() => db.collection("todos").doc(props.item.id).delete()}
            />
          </ListItem>
        </List>
        {/* </Grid> */}
      </div>
    </React.Fragment>
  );
}
