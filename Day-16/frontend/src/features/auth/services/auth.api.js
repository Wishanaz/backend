import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials: true
})

// function for register
export async function register({username, email, password}){
    const response = await api.post("/api/auth/register", {username, email, password})
    return response.data
}

// function for login
export async function login({identifier, password}){
    const response = await api.post("/api/auth/login", {
        identifier,
        password
    })
    return response.data
}

// fucntion for getMe
export async function getMe(){
    const response = await api.get("/api/auth/get-me")
    return response.data
}

// function for logout
export async function logout(){
    const response = await api.post("/api/auth/logout")
    return response.data
}
