import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useSuperHeroesData } from "../hooks/useSupeHeroesData";

const fetchSuperHeroes = async () => {
  const { data } = await axios.get("http://localhost:4000/superheroes");
  return data;
};

/**
 * Renders the React Query Super Heroes Page.
 *
 * @return {JSX.Element} The rendered React Query Super Heroes Page.
 */
export const RQSuperHeroesPage = () => {
  // const { isLoading, data, isError, error, isFetching } = useSuperHeroesData();

  const { isLoading, data, isError, error, isFetching } = useQuery<SuperHero[]>(
    {
      queryKey: ["super-heroes"],
      queryFn: fetchSuperHeroes,
      // gcTime: 5_000,
      // staleTime: 30_000,
      // refetchOnMount: false,
      // refetchOnWindowFocus: true,
      // refetchOnReconnect: true,
      // refetchInterval: 2_000,
      // select: (data) => data.filter((hero) => parseInt(hero.id) < 2),
    }
  );

  console.log({ isFetching, isLoading });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
