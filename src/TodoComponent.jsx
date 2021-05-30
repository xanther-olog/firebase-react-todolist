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
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";

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
  const [input, setInput] = useState("");
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
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <h2> Edit current To-Do </h2>
            <Input
              placeholder={props.item.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={() => updateTodo()}> Update </Button>
          </div>
        </Modal>
        <List className="todo_list">
          <ListItem>
            <ListItemText
              primary={props.item.todo}
              secondary="Dummy deadline ⏰⏰"
            />

            <Button onClick={() => handleOpen()}> Edit </Button>

            <DeleteForeverIcon
              onClick={() => db.collection("todos").doc(props.item.id).delete()}
            />
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  );
}
