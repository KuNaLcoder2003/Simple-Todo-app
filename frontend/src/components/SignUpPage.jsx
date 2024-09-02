import React, { useState } from 'react'

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        avatar: "",
    })
    const [response , setResponse] = useState("")
    const [loading , setLoading] = useState(false)
    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            fetch("http://localhost:3000/user/signup", {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        name: formData.name,
                        username: formData.username,
                        password: formData.password,
                        avatar: formData.avatar
                    }
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(async (data) => {
                const json = await data.json()
                console.log(json)
                setFormData({
                    name: "",
                    username: "",
                    password: "",
                    avatar: "",
                })
                setLoading(false)
                setResponse(json.message)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {
                loading ? <div className='loading'>Loading please wait</div> : (
                    !response.length > 0 ? (<form className='signupform' onSubmit={submitHandler}>

                        <div className='form-wrapper'>
        
                            <h2>Create a new Account</h2>
        
                            <div>
                                <p>Name : </p>
                                <input type='text' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} id='name' />
                            </div>
        
                            <div>
                                <p>Username : </p>
                                <input type='text' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} id='username' />
                            </div>
        
                            <div>
                                <p>Password : </p>
                                <input type='text' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} id='password' />
                            </div>
        
                            <div>
                                <p>Profile picture : </p>
                                <input type="file" onChange={(e) => setFormData({
                                    ...formData,
                                    avatar: URL.createObjectURL(e.target.files[0]) || "avatar"
                                })} id='avatar' />
                            </div>
                            <button type="submit">Create Account</button>
                        </div>
                        
                    </form>) : (<div className='response'>{response}</div>)
                )
            }
        </div>
    )
}

export default SignUpPage
