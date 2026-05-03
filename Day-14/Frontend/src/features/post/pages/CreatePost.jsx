import React from "react";
import "../style/createpost.scss";

import { useState, useRef } from "react";
import { usePost } from "../hook/usePost";

import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const postImageInputField = useRef(null);

  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputField.current.files[0]; //pehli file jo user select kre woh lo

    if (!file && !caption.trim()) {
        setError("Please add an image or caption");
        return;
    }

    setError(""); // clear error if valid

    await handleCreatePost(file, caption);
    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Post in Creation...</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}
          <label className="post-image-label" htmlFor="postImage">
            Select Image
          </label>
          <input
            ref={postImageInputField}
            hidden
            type="file"
            name="postImage"
            id="postImage"
          />
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            name="caption"
            id="caption"
            placeholder="Write a caption..."
            rows="1"
          />
          <button className="button primary-button">Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
