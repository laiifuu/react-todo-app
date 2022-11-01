import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';

const TodoContainer = () => {
  const getInitialTodos = () => {
    // getting stored items
    const temp = localStorage.getItem('todos');
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  const [todos, setTodos] = useState(getInitialTodos());

  useEffect(() => {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, [setTodos]);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => todo.id !== id),
    ]);
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        const newTodo = todo;
        if (todo.id === id) {
          newTodo.title = updatedTitle;
        }
        return newTodo;
      }),
    );
  };

  function Home() {
    return (
      <>
        <InputTodo addTodoProps={addTodoItem} />
        <TodosList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={delTodo}
          setUpdate={setUpdate}
        />
      </>
    );
  }

  function About() {
    const changeContent = (button) => {
      const aboutApp = 'In this app, you can add, delete, submit and edit items. To edit items, simply double click on it. Once you are done, press the enter key to resubmit. This app will persist your data in the browser local storage. So whether you reload, close your app or reopened it, you still have access to your to-dos items.';
      const aboutAuthor = 'This app was developed by Ibas Majid, a self taught web developer and a technical writer. He is opened to freelance Gig. So go ahead and connect with ibas on Twitter @ibaslogic.';

      const h1 = document.querySelector('.about-header');
      const div = document.querySelector('.about-txt');

      if (button === 'app') {
        h1.innerHTML = 'About the app';
        div.innerHTML = aboutApp;
      } else {
        h1.innerHTML = 'About the author';
        div.innerHTML = aboutAuthor;
      }
    };
    return (
      <>
        <div className="about-container">
          <div className="abt-btns">
            <button type="button" onClick={() => changeContent('app')}>About App</button>
            <button type="button" onClick={() => changeContent('author')}>About Author</button>
          </div>
          <div className="about-text">
            <h1 className="about-header">What would you like to know ?</h1>
            <div className="about-txt" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default TodoContainer;
