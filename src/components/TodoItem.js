import React, { useState } from "react";
import styles from "./TodoItem.module.css";

export default function TodoItem(props) {
  const [edit, setEdit] = useState({
    editing: false,
  });

  const handleEditing = () => {
    setEdit({ editing: true });
  };

  const handleUpdatedDone = event => {
    console.log(event.key);
    if (event.key === "Enter") {
      setEdit({ editing: false });
    }
  }

  let viewMode = {};
  let editMode = {};

  if (edit.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={props.todo.completed}
          onChange={() => props.handleChangeProps(props.todo.id)}
        />
        <button onClick={() => props.deleteTodoProps(props.todo.id)}>
          Delete
        </button>
        <span className={props.todo.completed ? styles.completedStyle : null}>
          {props.todo.title}
        </span>
      </div>
      <input
        type="text"
        value={props.todo.title}
        style={editMode}
        className={styles.textInput}
        onChange={(e) => {
          props.setUpdate(e.target.value, props.todo.id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
}
