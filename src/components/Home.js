import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Tabs from './Tabs';
import { addData, deleteData, getData, updateItemData } from './Firestore'
import {useUserAuth} from '../context/UserAuthContext';

function Home() {
  const [todoList, setTodoList] = useState({ high:[], medium: [], low: []})
  const [activeTab, setActiveTab] = useState('high')
  const {user} = useUserAuth();

  const getUserToDoList = async () => {
    try {
      const userToDo = await getData(user);
      const toDoObj = {
        high: userToDo.high || [],
        medium: userToDo.medium || [],
        low: userToDo.low || []
      }
      setTodoList(toDoObj);
    } catch (err) {
      console.error(err.msg);
    }
  };
  
  useEffect(() => {
    getUserToDoList();
  }, []);

  const addTodoItem = async (newItem) => {
    try{
      await addData(newItem, user)
      const updatedList = {...todoList}
      updatedList[newItem.priority].unshift(newItem)
      setTodoList(updatedList)
    } catch (err) {
      console.error(err)
    }
  }
  
  
  const handleTodoDelete = async (id) => {
    try {
      await deleteData(user, id)
      const updatedList = {...todoList}
      const deleteIndex = updatedList[activeTab].findIndex((item) => {
        return item.id === id 
      })
      updatedList[activeTab].splice(deleteIndex,1)
      setTodoList(updatedList)
    } catch (err) {
      console.error(err)
    }
    
  }
  const handleTodoDone = async (id) => {
    try {
      await updateItemData(user, id)
      const updatedList = {...todoList}
      const doneIndex = updatedList[activeTab].findIndex((item) => {
        return item.id === id 
      })
      updatedList[activeTab][doneIndex].status === 'done' ?
        updatedList[activeTab][doneIndex].status = 'pending' :
        updatedList[activeTab][doneIndex].status = 'done'
      setTodoList(updatedList)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="home">
      <div className='todo-header'>
        <h1 className='main-title'>TO-DO LIST</h1>
        <AddTodo addTodoItem={addTodoItem}></AddTodo>
      </div>
      <Tabs 
        activeTab={activeTab}
        updateActiveTab={setActiveTab} 
        todoList={todoList} 
        handleTodoDelete={handleTodoDelete}
        handleTodoDone={handleTodoDone}
      />
    </div>
  );
}

export default Home;
