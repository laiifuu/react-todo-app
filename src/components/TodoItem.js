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
    if (event.key === "Enter") {
      setEdit({ editing: false });
    }
  }

  const { completed, id, title } = props.todo;

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
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
        />
        <button onClick={() => props.deleteTodoProps(id)}>
          Delete
        </button>
        <span className={completed ? styles.completedStyle : null}>
          {title}
        </span>
      </div>
      <input
        type="text"
        value={title}
        style={editMode}
        className={styles.textInput}
        onChange={(e) => {
          props.setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
}
