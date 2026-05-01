import React from 'react'

import "remixicon/fonts/remixicon.css";
import "../style/Feed.scss"
import Post from '../components/Post';
import { usePost } from '../hook/usePost';
import { useEffect } from 'react';


const Feed = () => {
    
  const {loading, feed, handleGetFeed} = usePost()

  useEffect(()=>{
    handleGetFeed()
  }, [])

  if(loading || !feed){
    return(
      <main><h1>Feed is loading...</h1></main>
    )
  }

  console.log(feed)

  return (
    
    <main className='feed-page'>
      {feed?.map(post => (
        <Post key={post._id} user={post.user} post={post} />
      ))}
    </main>
  )
}

export default Feed