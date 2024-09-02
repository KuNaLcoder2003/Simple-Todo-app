import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const AddTodo = (props) => {

  // const token = props.token;
  const setChange = props.setChange
  let token;

  const[addTodo, setAddTodo] = useState(false)
  

  const[todoData , setTodoData] = useState({
    title : "",
    description : "",
  })
  const AddTodoHandler = ()=>{
    token = localStorage.getItem('token')
    try {
      fetch('http://localhost:3000/addtodo' ,{
        method : "POST",
        body : JSON.stringify({
          todo : {
            title : todoData.title,
            description : todoData.description
          }
        }),
        headers : {
          "Content-Type" : "application/json",
          token : token
        }
      }).then(async(data)=>{
        const response = await data.json()
        console.log(response)
        setChange(prev => prev+1)
        setTodoData({
          title : "",
          description : ""
        })
        setAddTodo(false)
        toast.success(response.message)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Toaster></Toaster>
      {
        addTodo ? (<div className='add-todo-section'>
          <input className='title' placeholder='Title...' type='text' value={todoData.title} onChange={(e)=>setTodoData({...todoData , title : e.target.value})} />
          <textarea className='decription' rows={5} placeholder='Decribe your task...' value={todoData.description} onChange={(e)=>setTodoData({...todoData , description : e.target.value})} />
          <button className='add-to-do-button' onClick={AddTodoHandler}>Add To do</button>
        </div>) :
        (
          <div className='add-btn' onClick={()=>setAddTodo(true)}>Add a new todo</div>
        )
      }
    </div>
  )
}

export default AddTodo
