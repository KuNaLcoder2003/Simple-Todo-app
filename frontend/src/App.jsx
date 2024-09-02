
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import { useEffect } from 'react'
import Todos from './components/Todos'
import HomePage from './components/HomePage'
import EditTodo from './components/EditTodo'

function App() {

  let token;
  
  useEffect(()=>{
    token = localStorage.getItem("token")
  },[])

  return (
   <div>
    <Routes>
      <Route path='/signup' element = {<SignUpPage/>} />
      <Route path='/signin' element = {<LoginPage/>} />
      <Route path='/user' element= {<HomePage/>} />
      <Route path='/editTodo/:taskId' element = {<EditTodo/>} />
    </Routes>
   </div>
  )
}

export default App
