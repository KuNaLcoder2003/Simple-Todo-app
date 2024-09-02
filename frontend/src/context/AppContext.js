import { Children, createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    const [validUser , setValidUser] = useState(false);
    const [todos , setTodos] = useState([]);
    const [user , setUser] = useState({});
    const [token , setToken] = useState(localStorage.getItem("token"));
    async function getTodos(){
        try {
            const response = await fetch('http://localhost:3000/user/todos' , {
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                    token : token
                }
            })
            const data = await response.json();
            setTodos(data.message)
        } catch (error) {
            console.log(error)
        }
    }
}
