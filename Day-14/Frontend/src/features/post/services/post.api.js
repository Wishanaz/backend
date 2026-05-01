import axios from "axios";

//axios instance:
const api = axios.create({
    baseURL: "http://localhost:3000/api/post",
    withCredentials: true

})

// get feed function

export async function getFeed() {
    const res = await api.get("/feed")
    return res.data    
}
