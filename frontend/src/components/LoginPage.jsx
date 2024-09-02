import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [formdata, setFormData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        try {
            fetch('http://localhost:3000/user/signin', {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        username: formdata.username,
                        password: formdata.password
                    }
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then(async(data)=>{
                const json = await data.json()
                console.log(json)
                localStorage.setItem('token' , `${json.message}`)
                setFormData({
                    username : "",
                    password : ""
                })
                navigate('/user')
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='login'>
            <form className='signupform' onSubmit={loginHandler}>
                <div className='form-wrapper'>
                <h2>Login</h2>
                <div>
                    <p>Username</p>
                    <input type='text' value={formdata.username} onChange={(e) => setFormData({ ...formdata, username: e.target.value })} />
                </div>

                <div>
                    <p>Password</p>
                    <input type='text' value={formdata.password} onChange={(e) => setFormData({ ...formdata, password: e.target.value })} />
                </div>

                <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
