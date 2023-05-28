import React, { useState } from "react"
import './ToDo.css'

const ToDo = ({onCancel, onSubmit}) => {
  const [error, setError] = useState();

  const addHandler = (event) => {
    event.preventDefault();
    const enteredTitle = document.getElementById('title').value
    const enteredStatus = document.getElementById('status').value
    if (enteredTitle.trim().length === 0) {
      setError('Title is required');
      return;
    }
    onSubmit(enteredTitle, enteredStatus);
  }

  const handleChange = (event) => {
    const enteredTitle = event.target.value
    if (enteredTitle.trim().length !== 0) {
      setError('');
    }
  }

  return (
    <div className="todo-wrapper">
      <div className="todo-container">
        <form className="form">
          <label htmlFor="title" className="todo-title">
            <div className="title-wrapper">
              <p>Title</p>
              <input 
                type="text"
                id="title"
                onChange={handleChange}
              ></input>
            </div>
            {error && (<p className="title-error">{error}</p>)}
          </label>
          
          <label htmlFor="status" className="todo-status">
            <p>Priority</p>
            <select 
              id="status"
            >
              <option value="high" >High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          
          <div className="form-buttons">
            <button className="cncl-btn" onClick={onCancel}>Cancel</button>
            <button className="add-btn" onClick={addHandler}>Add Task</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ToDo;