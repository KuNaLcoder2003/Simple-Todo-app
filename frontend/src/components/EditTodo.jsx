import React, { useEffect, useState } from 'react'
import { json, replace, useLocation, useParams, useSearchParams } from 'react-router-dom'

const EditTodo = () => {
    let id;
    let token;
    const path = useLocation()
    let edited = {}
    const [originalData , setOriginalData] = useState({
        title : "",
        description : ""
    })
    const[editedData , setEditedData] = useState({
        title : "",
        description : ""
    })
    useEffect(()=>{
        id = path.pathname.split('/').at(-1)
        console.log(id.split(':')[1])
        token = localStorage.getItem('token');
        fetch(`http://localhost:3000/task/${id.split(':')[1]}` , {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                token : token
            }
        }).then(async(data)=>{
            const response = await data.json()
            setOriginalData({
                title : response.task.title,
                description : response.task.description
            })
            setEditedData({
                title : response.task.title,
                description : response.task.description
            })
        })
    },[path])
    const handleEdit = ()=>{
        if(editedData.title == originalData.title && editedData.description == originalData.description){
            console.log('no data changed')
            alert('No changes were made')
        }
        else {
            if(editedData.title !== originalData.title){
                edited = {
                    ...edited,
                    title : editedData.title
                }
            }
            if(editedData.description !== originalData.description){
                edited = {
                    ...edited,
                    description : editedData.description
                }
            }
        }
        try {
            let id = path.pathname.split('/').at(-1)
            console.log(id)
            // console.log(token)
            let token = localStorage.getItem('token')
            console.log(token)
            fetch(`http://localhost:3000/editTodo/${id.split(':')[1]}` , {
                method : 'PUT',
                body : JSON.stringify({
                    editedTodo : edited
                }),
                headers : {
                    "Content-Type" : "application/json",
                    token : token
                }
            }).then(async(data)=>{
                const response = await data.json();
                console.log(response)
            })
        } catch (error) {
            console.log('err is : ',error )
        }
    }
    return (
        <div className='edit-to-do'>
            <h1>Edit to do</h1>
            <input value={editedData.title} type='text' onChange={(e) => setEditedData({ ...editedData, title: e.target.value })} />
            <textarea value={editedData.description} onChange={(e) => setEditedData({ ...editedData, description: e.target.value })} />
            <button onClick={handleEdit}>Edit data</button>

        </div>
    )
}

export default EditTodo
