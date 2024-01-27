import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchSuperHeroes = async (heroId: number) => {
  const { data } = await axios.get(
    `http://localhost:4000/superheroes?id=${heroId}`
  );
  return data;
};

const RQDynamicParallelQueriesPage = ({
  heroIds = [],
}: {
  heroIds: number[];
}) => {
  const queries = heroIds.map((heroId) => ({
    queryKey: ["super-heroes", heroId],
    queryFn: () => fetchSuperHeroes(heroId),
  }));

  const results = useQueries({ queries });

  return (
    <div>
      {results.map((result, index) => (
        <pre key={index}>{JSON.stringify(result.data, null, 2)}</pre>
      ))}
    </div>
  );
};

export default RQDynamicParallelQueriesPage;
