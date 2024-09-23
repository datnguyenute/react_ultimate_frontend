import TodoData from "./TodoData";
import TodoAdd from './TodoAdd';
import reactLogo from '../../assets/react.svg';
import './todo.css';
import { useState } from 'react';

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    console.log('new todo: ', newTodo);
    setTodoList([...todoList, newTodo]);
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const deleteTodo = (id) => {
    const newTodo = todoList.filter(item => item.id != id);
    setTodoList(newTodo);
  }
  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoAdd
        addNewTodo={addNewTodo}
      />
      {
        todoList.length > 0 ? <TodoData
          name={name}
          todoList={todoList}
          deleteTodo={deleteTodo}
        />
          :
          <div className='todo-image'>
            <img src={reactLogo} className="logo" />
          </div>
      }
    </div>
  )
}

export default TodoApp;