import React from "react"
import './Tabs.css'
import TodoItem from "./TodoItem"

const Tabs = ({activeTab, updateActiveTab, todoList, handleTodoDelete, handleTodoDone}) => {
  const pendingTodos = () => {
    return todoList[activeTab].filter((item) => {
      return item.status === 'pending'
    })
  }
  const doneTodos = () => {
    return todoList[activeTab].filter((item) => {
      return item.status === 'done'
    })
  }
  return(
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === 'high'? "active" : " "}
          onClick={() => updateActiveTab('high')}
        >
          High
        </li>
        <li 
          className={activeTab === 'medium'? "active" : " "}
          onClick={() => updateActiveTab('medium')} 
        >
          Medium
        </li>
        <li 
          className={activeTab === 'low'? "active" : " "}
          onClick={() => updateActiveTab('low')}
        >
          Low
        </li>
      </ul>
      
      <div className="list-items">
        {todoList[activeTab].length === 0 ? (
            <div className="no-list-item">
              <div className="no-list-img"></div>
              <p>No Todos available in {activeTab} priority</p>
            </div>
          ) : (
            <ul>
              {pendingTodos().map((todo) => (
                <TodoItem 
                  key={todo.id} todo={todo} handleTodoDelete={handleTodoDelete} handleTodoDone={handleTodoDone}/>
              ))}
              {doneTodos().map((todo) => (
                <TodoItem 
                  key={todo.id} todo={todo} handleTodoDelete={handleTodoDelete} handleTodoDone={handleTodoDone}/>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  )
}

export default Tabs;