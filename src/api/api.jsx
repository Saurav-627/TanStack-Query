import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data

// export const fetchPosts = () => {
//   return api.get("/posts");
// };

export const fetchPosts = async (pageNumber) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

//to fetch individual data:
export const fetchInvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

//to delete the data
export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/posts/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//to update
export const updatePost = async (id) => {
  try {
    const res = await api.patch(`/posts/${id}`, { title: "I have updated" });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//to create post 
export const createPost = async (data) => {
  try {
    const res = await api.post("/posts", data);
    return res;
  } catch (error) {
    console.log(error);
    
  }
}

//infinite scrolling

export const fetchUsers = async ({ pageParams = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParams}`
    );
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};
