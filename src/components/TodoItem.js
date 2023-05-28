import React, { useState } from "react"
import {AiOutlineDelete} from 'react-icons/ai'
import './Tabs.css'
import { TiTick } from 'react-icons/ti';

const TodoItem = ({handleTodoDelete, todo, handleTodoDone}) => {

  const handleChecked = () => {
    handleTodoDone(todo.id)
  }

  const listClass = () => {
    if (todo.status === 'done') {
      return 'todo-done-item'
    }
    return 'todo-pending-item'
  }

  return(
    <li className={listClass()}>
      <div className="checkbox" onClick={handleChecked}>
        {todo.status === 'done' && (<TiTick className="checkbox-tick" />)}
      </div>
      <p>{todo.title}</p>
      <AiOutlineDelete
        title="Delete?"
        className="icon"
        onClick={() => handleTodoDelete (todo.id)}
      />
    </li>
  )
}

export default TodoItem;
