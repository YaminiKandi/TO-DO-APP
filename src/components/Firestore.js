import {db} from '../firebase'
import { 
  collection,
  setDoc, 
  getDoc, 
  updateDoc,
  doc 
} from 'firebase/firestore'

const dbCollection = collection(db, 'Todo')

const getDocRef = (user) => {
  if (user.email) {
    return doc(dbCollection, user.email)
  } else {
    return null
  }
}

export const addData = async (newData, user) => {
  const docRef = getDocRef(user)
  if (!docRef) { return new Error('User is not logged in')}
  const userDoc = await getDoc(docRef)
  
  if (userDoc.exists()) {
    const data = userDoc.data()
    if(newData.priority === 'high') {
      data.high?.length ? data.high.push(newData) : data.high = [newData]
    } else if (newData.priority === 'medium') {
      data.medium?.length ? data.medium.push(newData) : data.medium = [newData]
    } else if (newData.priority === 'low') {
      data.low?.length ? data.low.push(newData) : data.low = [newData]
    }
    return updateDoc(docRef, data);
  }
  else {
    return setDoc(docRef, {
      [newData.priority]: [newData]
    })
  }
}

export const getData = async (user) => {
  const docRef = getDocRef(user)
  const userDoc = await getDoc(docRef)
  return userDoc.exists() ? userDoc.data() : {
    high: [],
    medium: [],
    low: []
  }
}

export const deleteData = async (user, id) => {
  const docRef = getDocRef(user);
  if (!docRef) {return new Error('User is not logged in')}
  const userDoc = await getDoc(docRef)
  if (userDoc.exists()) {
    const data = userDoc.data()
    const allTodos = [...(data.high || []), ...(data.medium || []), ...(data.low || [])]
    const deleteItem = allTodos.find((todo) => {
      return todo.id === id
    })
    data[deleteItem.priority] = data[deleteItem.priority].filter(todo => todo.id !== id)
    return updateDoc(docRef, data)
  } else {
    return new Error('Document not found')
  }
}

export const updateItemData = async (user, id) => {
  const docRef = getDocRef(user);
  if (!docRef) {return new Error('User is not logged in')}
  const userDoc = await getDoc(docRef)
  if (userDoc.exists()) {
    const data = userDoc.data()
    const allTodos = [...(data.high || []), ...(data.medium || []), ...(data.low || [])]
    const updateItem = allTodos.find((todo) => {
      return todo.id === id
    })
    data[updateItem.priority].forEach(todo => {
      if (todo.id === id) {
        todo.status = todo.status === 'done' ? 'pending' : 'done'
      }
    })
    return updateDoc(docRef, data)
  } else {
    return new Error('Document not found')
  }
}