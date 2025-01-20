import { NavLink } from "react-router-dom";
import { fetchPosts } from "../api/api";
import "./FetchOld.css";
import { useQuery } from "@tanstack/react-query";
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

  //to fetch data from the api useQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], // doing useState work.. it is unique identifier
    queryFn: fetchPosts, // doing useEffect work..  function ma () don't use
    // gcTime: 1000,
    // staleTime: 10000, //dont allow to send request to server until this milisecond
    // refetchInterval: 1000, //refetched the data continuouuslt in 1 sec but when gone to another tab the request get paused.
    // refetchIntervalInBackground: true, //arko tab ma jada ni request jancha.
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
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="pagination-controls ">
        <button>Prev</button>
        <h2>{pageNumber}</h2>
        <button>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
