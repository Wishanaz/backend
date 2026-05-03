import {getFeed, createPost} from "../services/post.api"
import { useContext } from "react"
import {PostContext} from "../post.context"

export const usePost = ()=>{
    const context = useContext(PostContext)

    const{loading, setLoading, post, setPost, feed, setFeed} = context

    const handleGetFeed = async ()=>{
        setLoading(true)
            const data = await getFeed()
            setFeed(data.posts)
            setLoading(false)
    }

    const handleCreatePost = async(imageFile, caption)=>{
        setLoading(true)

        const data = await createPost(imageFile, caption)
        setLoading(false)
    }

    const handlelike = async (post)=>{
        setLoading(true)
        const data = await likePost(post)
        setLoading(false)
    }

    const handleUnlike = async (post)=>{
        setLoading(true)
        const data = await unLikePost(post)
        setLoading(false)
    }

    return{loading, post, feed, handleGetFeed, handleCreatePost}
}