import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

export default function TodoItem(props) {
  const [edit, setEdit] = useState({
    editing: false,
  });

  const handleEditing = () => {
    setEdit({ editing: true });
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEdit({ editing: false });
    }
  };

  const { todo } = props;
  const { handleChangeProps, deleteTodoProps, setUpdate } = props;

  const viewMode = {};
  const editMode = {};

  if (edit.editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => handleChangeProps(todo.id)}
        />
        <button onClick={() => deleteTodoProps(todo.id)} type="button">
          Delete
        </button>
        <span className={todo.completed ? styles.completedStyle : null}>
          {todo.title}
        </span>
      </div>
      <input
        type="text"
        value={todo.title}
        style={editMode}
        className={styles.textInput}
        onChange={(e) => {
          setUpdate(e.target.value, todo.id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
}

TodoItem.propTypes = {
  setUpdate: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
