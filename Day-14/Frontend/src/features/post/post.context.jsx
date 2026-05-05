import { createContext, useState } from "react";

export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [feed, setFeed] = useState([])

    // 🔥 ADD THIS
   const updatePostInFeed = (updatedPost) => {
    setFeed(prev =>
        prev.map(p => p._id === updatedPost._id ? updatedPost : p)
    )
}

    return (
        <PostContext.Provider value={{
              loading,
    setLoading,
    post,
    setPost,
    feed,
    setFeed,
    updatePostInFeed   
        }}>
            {children}
        </PostContext.Provider>
    )
}