import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
import { useContext } from "react"
import { PostContext } from "../post.context"

export const usePost = () => {
    const context = useContext(PostContext)

    const {
        loading,
        setLoading,
        post,
        setPost,
        feed,
        setFeed,
        updatePostInFeed
    } = context

    // 🔹 GET FEED
    const handleGetFeed = async () => {
        try {
            setLoading(true)
            const data = await getFeed()
            setFeed(data.posts)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // 🔹 CREATE POST
    const handleCreatePost = async (imageFile, caption) => {
        try {
            setLoading(true)
            const data = await createPost(imageFile, caption)

            setFeed(prev => [data.post, ...prev])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // 🔥 LIKE TOGGLE (OPTIMISTIC UI)
    const toggleLike = async (post) => {
        const isLiked = post.isLiked

        const updatedPost = {
            ...post,
            isLiked: !isLiked
        }

        // ✅ SAFE UI UPDATE
        if (updatePostInFeed) {
            updatePostInFeed(updatedPost)
        }

        try {
            if (!isLiked) {
                await likePost(post._id)
            } else {
                await unLikePost(post._id)
            }
        } catch (err) {
            console.error(err)

            // 🔁 rollback safely
            if (updatePostInFeed) {
                updatePostInFeed(post)
            }
        }
    }

    return {
        loading,
        post,
        feed,
        handleGetFeed,
        handleCreatePost,
        toggleLike
    }
}