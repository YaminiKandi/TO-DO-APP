import React, { useState } from "react";
import './AddTodo.css'
import Button from "./UI/Button";
import ToDo from "./ToDo";

const AddTodo = ({addTodoItem}) => {

  const [showTodo, setShowTodo] = useState()
  const handleShowTodo = () => {
    setShowTodo(!showTodo)
  }
  const handleAdd = (title, priority) => {
    const newTodo = {
      id: Date.now(),
      title,
      priority,
      status: 'pending'
    }
    addTodoItem(newTodo)
    handleShowTodo()
  }
  return(
    <div>
      <Button 
        onClick={handleShowTodo}
        text={'Add'}
      ></Button>
     {showTodo && (<ToDo onCancel={handleShowTodo} onSubmit={handleAdd}></ToDo>)}
    </div>
  )
}

export default AddTodo;