import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts, updatePost } from "../api/api";
import "./FetchOld.css";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

const FetchRQ = () => {
  //   const getPostsData = async () => {
  //     try {
  //       const res = await fetchPosts();
  //       return res.status === 200 ? res.data : [];
  //     } catch (error) {
  //       console.log(error);
  //       return [];
  //     }
  //   }; // arkei component ma lekhera import garda ni huncha

  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

  //to fetch data from the api useQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], // doing useState work.. it is unique identifier
    // queryFn: fetchPosts, // doing useEffect work..  function ma () don't use
    queryFn: () => fetchPosts(pageNumber),
    // gcTime: 1000,
    // staleTime: 10000, //dont allow to send request to server until this millisecond
    // refetchInterval: 1000, //refetch the data continuously in 1 sec but when gone to another tab the request get paused.
    // refetchIntervalInBackground: true, //arko tab ma jada ni request jancha.
    placeholderData: keepPreviousData, //when we use pagination which keep the old data fetch only new avoiding loading when i click next
  });

  //! mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

  //! mutation function to update the post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      // console.log(apiData, postId);
      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
  });

  //conditional rendering based on loading, error and posts data
  if (isPending) return <p>Loading.....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="section-accordion-container">
      {/* Box around the list */}
      <ul className="section-accordion">
        {data?.map((data) => {
          const { id, title, body } = data; // Destructuring the data
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>{" "}
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>
      <div className="pagination-controls ">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2>{pageNumber / 3 + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
