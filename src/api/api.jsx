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
    const res = await api.patch(`/posts/${id}`, {title: "I have updated"});
    return res;
  } catch (error) {
    console.log(error);
  }
};