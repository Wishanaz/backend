import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";


export function useAuth(){
    const context = useContext(AuthContext)
    const {user, loading, setUser, setLoading} = context

    

    //function to check authentication on app load
    const checkAuth = async() => {
        try{
            const data =  await getMe() // api se getMe ko call kia h
            setUser(data.user) // response m user ka data mil rha tha woh set krdia user m  

        }catch(error){
            setUser(null) // agar error aata h to user ko null krdo 
            console.log(error) 
        }finally{
            setLoading(false) // chahe error aaye ya na aaye loading false krdo
        }
    }

    // function to login user
    const handleLogin = async (username, password)=>{
        setLoading(true)

        try{
            const res = await login(username, password) //api se login ko call kia h 
            setUser(res.user) // response m user ka data mil rha tha woh set krdia user m

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    // function to register user
    const handleRegister = async(username, email, password)=>{
        setLoading(true)

        try{
            const res = await register(username, email, password)
            setUser(res.user)

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return{user, loading, handleLogin, handleRegister, checkAuth}
}
