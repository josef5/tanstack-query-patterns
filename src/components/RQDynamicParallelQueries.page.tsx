import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchSuperHeroes = async (heroId: number) => {
  const { data } = await axios.get(
    `http://localhost:4000/superheroes?id=${heroId}`
  );
  return data;
};

/**
 * Renders a page with parallel queries for super-heroes based on their IDs.
 *
 * @param {number[]} heroIds - An array of hero IDs
 * @return {JSX.Element} The rendered page with the results of the parallel queries
 */
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
