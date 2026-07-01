import {register, login, getMe, logout} from "../services/auth.api"

import {useContext} from "react"

import {authContext} from "../auth.context"


export const useAuth = () => {
    const context = useContext(authContext)
    const {user, setUser, loading, setLoading} = context

    // function for handle register
    async function handleRegister({username, email, password}){
        setLoading(true)
        const data = await register({username, email, password})
        setUser( data.user)
        setLoading(false)
    }

    //function for handle login
    async function handleLogin({identifier, password}){
    setLoading(true)

    const data = await login({
        identifier,
        password
    })

    setUser(data.user)
    setLoading(false)

    return data
}

    // function for handle getme
    async function handleGetMe(){
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    //function for handle logout
    async function handleLogout(){
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return ({user, loading, handleRegister, handleLogin, handleLogout, handleGetMe})
}