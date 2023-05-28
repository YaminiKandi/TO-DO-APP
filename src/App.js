import React from 'react';
import './App.css';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return(
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  )
}

export default App;
