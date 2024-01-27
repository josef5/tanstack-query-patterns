import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddSuperHeroData } from "../hooks/useSuperHeroesData";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

/* const fetchSuperHeroes = async () => {
  const { data } = await axios.get("http://localhost:4000/superheroes");
  return data;
}; */

/**
 * A React component for the Super Heroes page using React Query.
 * Fetches and mutates data using the useSuperHeroesData hook.
 *
 * @return {JSX.Element} The Super Heroes page component
 */
export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { isLoading, data, isError, error } = useSuperHeroesData();

  /* const { isLoading, data, isError, error, isFetching } = useQuery<SuperHero[]>(
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
  ); */

  // console.log({ isFetching, isLoading });

  const { mutate } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };

    mutate(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
