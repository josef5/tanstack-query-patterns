import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFriends = async () => {
  const { data } = await axios.get("http://localhost:4000/friends");
  return data;
};

const fetchSuperHeroes = async () => {
  const { data } = await axios.get("http://localhost:4000/superheroes");
  return data;
};

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
