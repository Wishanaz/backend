import axios from 'axios'

// axios instance:
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// to register user
export async function register(username, email, password){
    try{
        const res = await api.post("/api/auth/register", {
            username,
            email,
            password
        })
        return res.data

    }catch(error){
        throw error
    }
}

// to login user
export async function login(username, password){
    try{
        const res = await api.post("/api/auth/login", {
             username,
             password
        })
        return res.data
    
    }catch(error){
        throw error
    }
}

// to get currently loggedin user detail
export async function getMe(){
    try{
        const res = await api.get("/api/auth/get-me")
        return res.data
    }catch(error){
        throw error
    }
}