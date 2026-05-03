import React from 'react'
import "../style/Feed.scss"
import { getTimeAgo } from '../utils/Time'

const Post = ({user, post}) => {
     
  return (
    <div className="post">
    
                {/* header */}
                <div className="post-header">
                    <div className="left">
                        <div className="img-wrapper">
                            <img src={user.profileImage} alt="profile image" />
                        </div>
                        <div className="userInfo">
                            <span className='username'>{user.username}</span>
                            <span className='time'>{getTimeAgo(post.createdAt || new Date())}</span>
                        </div>
                    </div>
    
                    <div className="right">
                        <i className="ri-more-fill"></i>
                    </div>
                </div>
    
                {/* image */}
                <div className="post-image">
                    <img  src={post.imgUrl} alt="post image" />
                </div>
    
                <div className="post-actions">
                    <div className="left">
                        <i className={`ri-heart-line ${post.isLiked ? "liked" : ""}`}></i>
                        <i className="ri-chat-4-line"></i>
                       <i className="ri-share-forward-line"></i>
                    </div>
    
                    <div className="right">
                        <i className="ri-bookmark-line"></i>
                    </div>
                </div>
    
            {/* caption */}
            <div className="post-caption">
                <span className='caption'>{post.caption}</span>
            </div>
    
    
            </div>
  )
}

export default Post