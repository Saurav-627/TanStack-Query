# 🚀 React Query & API Integration

This project demonstrates how to use **React Query (TanStack Query)** with **React Router** and **Axios** to fetch, update, and delete posts from an API.

## 📌 Features

✅ **React Router** for navigation  
✅ **React Query** for fetching, caching, and updating data  
✅ **Axios** for API requests  
✅ **JSONPlaceholder API** as a mock backend  


## ⚡ Setup Instructions

### 1️⃣ Install Dependencies

npm install react-router-dom @tanstack/react-query axios @tanstack/react-query-devtools

2️⃣ Start the Project
npm run dev

🏗 Components Breakdown
1️⃣ App Component (App.jsx)

Handles React Query Client and React Router.
const queryClient = new QueryClient();

return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

2️⃣ Routes Setup
Path Component Description
"/Home"    Home.jsx
"/trad"	   FetchOld.jsx	     Traditional Fetching
"/rq"  	   FetchRQ.jsx	     React Query Fetching
"/rq/:id"  FetchIndv	     Fetch Individual Post


3️⃣ FetchRQ Component (FetchRQ.jsx)
Fetches paginated posts using useQuery
Deletes posts using useMutation
Updates post titles using useMutation

const { data, isPending, isError, error } = useQuery({
  queryKey: ["posts", pageNumber],
  queryFn: () => fetchPosts(pageNumber),
  placeholderData: keepPreviousData,
});
and more...

4️⃣ Pagination Controls
<button onClick={() => setPageNumber((prev) => prev - 3)} disabled={pageNumber === 0}>Prev</button>
<h2>{pageNumber / 3 + 1}</h2>
<button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>

🔥 API Services (api.js)
✅ Fetch Paginated Posts
export const fetchPosts = async (pageNumber) => {
  return api.get(`/posts?_start=${pageNumber}&_limit=3`).then(res => res.data);
};

✅ Fetch Individual Post
export const fetchInvPost = async (id) => {
  return api.get(`/posts/${id}`).then(res => res.data);
};

✅ Delete Post
export const deletePost = async (id) => {
  return api.delete(`/posts/${id}`);
};

✅ Update Post Title
export const updatePost = async (id) => {
  return api.patch(`/posts/${id}`, { title: "I have updated" });
};
and more...

🎯 Summary
✔ React Query efficiently fetches, updates, and deletes posts.
✔ Mutation functions handle API updates with useMutation (CRUD-operation).
✔ Pagination is implemented using useState and useQuery.
✔ Error handling ensures a smooth user experience.

🔗 Additional Resources
📌 TanStack Query Docs  https://tanstack.com/query/latest/docs/framework/react/overview
📌 React Router Docs    https://reactrouter.com/home
📌 Axios Docs           https://axios-http.com/docs/intro