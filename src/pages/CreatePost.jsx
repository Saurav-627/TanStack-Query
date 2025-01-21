import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/api";
import { useState } from "react";
import "./CreatePost.css";

function CreatePost() {
  const [newlyCreatedPost, setNewlyCreatedPost] = useState(null); // State to store the new post

  // useMutation to handle the POST request
  const mutation = useMutation({
    mutationFn: createPost, // the function that performs the POST request
    onSuccess: (data) => {
      // handle success and update UI with the newly created post data
      //   console.log('Post created:', data);
      alert("Post created successfully!");
      setNewlyCreatedPost(data); // Store the new post in state to display it
    },
    onError: (error) => {
      // handle error
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create new post data
    const newPost = {
      title: "New Post Title",
      body: "This is the content of the new post.",
      userId: 1, // optional, depending on your API
    };

    // Call the mutate function from mutation
    mutation.mutate(newPost);
  };

  return (
    <div style={{margin: "20px"}}>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating Post..." : "Create Post"}
        </button>
        {mutation.isError && (
          <p style={{ color: "red" }}>Error creating post</p>
        )}
        {mutation.isSuccess && (
          <p style={{ color: "green" }}>Post created successfully!</p>
        )}
      </form>

      {/* Conditionally display the newly created post */}
      {newlyCreatedPost && (
        <div className="new-post-container">
          <h3 className="new-post-title">New Post</h3>
          <p className="new-post-content">
            <strong>Title:</strong> {newlyCreatedPost.data.title}
          </p>
          <p className="new-post-content">
            <strong>Body:</strong> {newlyCreatedPost.data.body}
          </p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
