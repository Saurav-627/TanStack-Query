import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScrolling = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  //! yeslai arkei xoto tarika le ni garna sakinxa by using react-intersection-observer.
  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 1;

  //     if (bottom && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasNextPage]);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (status === "loading") return <div>Loading....</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Infinite Scroll With React Query</h1>
      {data?.pages?.map((page, index) => {
        return (
          <ul key={index} style={{ display: "flex", flexDirection: "column" }}>
            {page.map((user) => {
              return (
                <li
                  key={user.id}
                  style={{ padding: "10px", border: "1px solid #ccc" }}
                >
                  <p>{user.login}</p>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    width={80}
                    height={80}
                  />
                </li>
              );
            })}
          </ul>
        );
      })}

      {/* {isFetchingNextPage && <div>Loading more...</div>} */}
      <div ref={ref}>{isFetchingNextPage && <div>Loading more...</div>}</div>
    </div>
  );
};

export default InfiniteScrolling;
