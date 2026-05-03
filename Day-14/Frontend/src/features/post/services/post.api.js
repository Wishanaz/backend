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

//create post function
export async function createPost(imageFile, caption){
    //for form data we use:
    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append("caption", caption)

    const res = await api.post("/", formData)
    return res.data
}

//like post
export async function likePost(postId){
    const res = await api.post("/like/" + postId)
    return res.data
}

//unlike post
export async function unLikePost(postId){
    const res = await api.post("/unlike/" + postId)
    return res.data
}
