import { useEffect, useState } from "react";
import { fetchPosts } from "../api/api";
import "./FetchOld.css";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      if (res) {
        setPosts(res);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  //conditional rendering based on loading, error and posts data
  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="section-accordion-container">
      {" "}
      {/* Box around the list */}
      <ul className="section-accordion">
        {posts?.map((data) => {
          const { id, title, body } = data; // Destructuring the data
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchOld;
