React Query & API Integration

This project demonstrates how to use React Query (TanStack Query) with React Router and Axios to fetch, update, and delete posts from an API.

📌 Project Overview

This project uses:

React Router for navigation

React Query for fetching, caching, and updating data

Axios for API requests

JSONPlaceholder API as a mock backend

📂 File Structure

/src
 ├── components
 │   ├── layout
 │   │   └── MainLayout.jsx
 │   |   └── Footer.jsx
 │   |   └── Header.jsx
 │   └── ui
 │       └── FetchIndv.jsx
 ├── pages
 │   ├── Home.jsx
 │   ├── FetchOld.jsx
 │   ├── FetchRQ.jsx
 ├── api
 │   └── api.js
 ├── App.jsx
 ├── index.jsx

🚀 Setup Instructions

1️⃣ Install Dependencies

npm install react-router-dom @tanstack/react-query axios @tanstack/react-query-devtools

2️⃣ Start the Project

npm run dev

🏗 Components Breakdown

1️⃣ App Component (App.jsx)

The main entry point that sets up React Query and React Router.

🔹 Features:

Configures React Query Client

Provides routing for different pages

Enables ReactQueryDevtools for debugging

📌 Code Summary:

const queryClient = new QueryClient();

return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

🔹 Routes:

Path

Component

Description

/

Home

Home Page

/trad

FetchOld

Traditional Fetching

/rq

FetchRQ

React Query Fetching

/rq/:id

FetchIndv

Fetch Individual Post

2️⃣ FetchRQ Component (FetchRQ.jsx)

A React Query-based component that fetches, updates, and deletes posts.

🔹 Features:

Fetches paginated posts using useQuery

Deletes a post using useMutation

Updates a post title using useMutation

Implements pagination

📌 Key Hooks Used:

const { data, isPending, isError, error } = useQuery({
  queryKey: ["posts", pageNumber],
  queryFn: () => fetchPosts(pageNumber),
  placeholderData: keepPreviousData,
});

const deleteMutation = useMutation({
  mutationFn: (id) => deletePost(id),
  onSuccess: (data, id) => {
    queryClient.setQueryData(["posts", pageNumber], (curElem) => {
      return curElem?.filter((post) => post.id !== id);
    });
  },
}); and more...

🔹 Pagination Controls:

<button onClick={() => setPageNumber((prev) => prev - 3)} disabled={pageNumber === 0}>Prev</button>
<h2>{pageNumber / 3 + 1}</h2>
<button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>

3️⃣ API Service (api.js)

Handles all API requests using Axios.

🔹 Fetch All Posts (Paginated)

export const fetchPosts = async (pageNumber) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=3`).then(res => res.data);
};

🔹 Fetch Individual Post

export const fetchInvPost = async (id) => {
  return api.get(`/posts/${id}`).then(res => res.data);
};

🔹 Delete Post

export const deletePost = async (id) => {
  return api.delete(`/posts/${id}`);
};

🔹 Update Post Title

export const updatePost = async (id) => {
  return api.patch(`/posts/${id}`, { title: "I have updated" });
};

🎯 Summary

React Query efficiently fetches, updates, and deletes posts.

Mutation functions handle API updates with useMutation.

Pagination is implemented with useState and useQuery.

Error handling ensures a smooth user experience.

🔗 Additional Resources

TanStack Query Docs

React Router Docs

Axios Docs

🎉 Happy Coding! 🚀

