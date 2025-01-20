import { useQuery } from "@tanstack/react-query";
import { fetchInvPost } from "../../api/api";
import { NavLink, useParams } from "react-router-dom";
import "../../pages/FetchOld.css";

const FetchIndv = () => {
  const { id } = useParams();

  //to fetch data from the api useQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id], // doing useState work.. it is unique identifier
    queryFn: () => fetchInvPost(id), // doing useEffect work.. to get individual data
  });

  //conditional rendering based on loading, error and posts data
  if (isPending) return <p>Loading.....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="section-accordion-container">
      <ul className="section-accordion">
        <li>
          <p>ID: {data.id}</p>
          <p>title: {data.title}</p>
          <p>body: {data.body}</p>
        </li>
        <NavLink to={"/rq"}>
          <button>Go Back</button>
        </NavLink>
      </ul>
    </div>
  );
};

export default FetchIndv;
