import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Asynchronously fetches friends data from the server.
 *
 * @return {Promise<any>} The retrieved friends data.
 */
const fetchFriends = async () => {
  const { data } = await axios.get("http://localhost:4000/friends");
  return data;
};

/**
 * Fetches superheroes data from the specified URL.
 *
 * @return {Promise<any>} The data retrieved from the URL.
 */
const fetchSuperHeroes = async () => {
  const { data } = await axios.get("http://localhost:4000/superheroes");
  return data;
};

/**
 * Renders a page with parallel queries for super-heroes and friends, displaying loading message if data is still being fetched, and rendering the combined data once both queries are complete.
 *
 * @return {JSX.Element} The JSX element representing the rendered page.
 */
const RQParallelQueriesPage = () => {
  const { isLoading: isLoadingSuperHeroes, data: superHeroes } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  const { isLoading: isLoadingFriends, data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  if (isLoadingSuperHeroes || isLoadingFriends) {
    return <h2>Loading...</h2>;
  }

  return <pre>{JSON.stringify({ superHeroes, friends }, null, 2)}</pre>;
};

export default RQParallelQueriesPage;
