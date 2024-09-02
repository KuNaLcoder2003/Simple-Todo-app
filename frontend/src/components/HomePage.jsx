import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import Todos from './Todos'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    let token;
    const [isValidUser, setIsValidUser] = useState(false);
    const [user, setUser] = useState({})
    const [todos, setTodos] = useState([])
    const navigate = useNavigate()
    const [change , setChange] = useState(0)
    useEffect(() => {
        token = localStorage.getItem('token');
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        }).then(async (data) => {
            const response = await data.json();
            if (response.valid) {
                setIsValidUser(true)
                setUser(response.user)
                setTodos(response.tasks)
                console.log(response.tasks)
            }
            else {

                setIsValidUser(false)
                setUser({})
                setTodos([])
                console.log(response)
                navigate('/signin')
            }
        })

    },[change])
    const logoutHandler = ()=>{
        setIsValidUser(false)
        setTodos([])
        localStorage.removeItem('token')
        navigate('/signin')
    }
    console.log(isValidUser)
    return (
        <div className='home'>
            {
                isValidUser ? (<div className='content'>
                    <h2>Hello , <span>{user.name}</span></h2>
                    <div className='add-to-do'>
                        <AddTodo token = {token} setChange={setChange} />
                    </div>
                    <div className='todo-section'>
                        <Todos todos={todos} setChange = {setChange} />
                    </div>
                    <button onClick={logoutHandler} className='logout-btn'>Logout</button>
                    {/* <button onClick={getCompletedTask}>Completed Tasks</button> */}
                </div>) : (<div>Please Login</div>)
            }
        </div>
    )
}

export default HomePage
