import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Todos = (props) => {
  const todos = props.todos
  const navigate = useNavigate()
  const setChange = props.setChange;

  const deleteHandler = (id)=>{
    let token = localStorage.getItem('token')
    try {
      fetch(`http://localhost:3000/delete/${id}` , {
        method : 'DELETE',
        headers:{
          "Content-Type" : "application/json",
          token : token
        }
      }).then(async(data)=>{
        const response = await data.json();
        console.log(response)
        setChange(prev => prev + 1);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const completeHandler = (id)=>{
    let token = localStorage.getItem('token')
    try {
      fetch(`http://localhost:3000/complete/${id}`, {
        method : 'PUT',
        headers :{
          "Content-Type" : "application/json",
          token : token
        }
      }).then(async(data)=>{
        const response = await data.json();
        console.log(response)
        setChange(prev => prev +1)
      })
    } catch (error) {
      console.log(response)
    }
}
  return (
    <div>
      {
        !(todos.length > 0) ? <div className='no-todo-to-show'>No todos to show </div> : (
          <div className='todos'>
            {
              todos.map(todo => {
                return (
                  <div className='todo'>
                    <h3>{todo.title}</h3>
                    <div className='btn-grp'>
                      {todo.completed ? (null) : <button onClick={()=>completeHandler(todo._id)}>Mark as Completed</button>}
                      <button onClick={()=>navigate(`/editTodo/:${todo._id}`)}>Edit</button>
                      <button onClick={()=>deleteHandler(todo._id)} >Delete</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Todos
