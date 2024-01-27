import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches superheroes from the specified URL using axios.
 *
 * @return {Promise<any>} The data returned from the API call.
 */
const fetchSuperHeroes = async () => {
  const { data } = await axios.get("http://localhost:4000/superheroes");
  return data;
};

export const useSuperHeroesData = () => {
  return useQuery<SuperHero[]>({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // gcTime: 5_000,
    // staleTime: 30_000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // refetchInterval: 2_000,
    // select: (data) => data.filter((hero) => parseInt(hero.id) < 2),
  });
};

/**
 * Posts a new superhero to the server.
 *
 * @param {Object} hero - The superhero object to be added
 * @return {Promise} A promise that resolves with the response data
 */
const addSuperHero = (hero: { name: string; alterEgo: string; id: number }) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

/**
 * Function to use and add super hero data.
 *
 * @return {MutationFunction} The useMutation function
 */
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * Performs a mutation to add a new super hero to the list.
     *
     * @param {Object} param0 - Object containing the name and alter ego of the hero
     * @return {Object} The added super hero object
     */
    mutationFn: ({ name, alterEgo }: { name: string; alterEgo: string }) => {
      const previousHeroData = queryClient.getQueryData<SuperHero[]>([
        "super-heroes",
      ]);

      return addSuperHero({
        name,
        alterEgo,
        id: (previousHeroData?.length ?? 0) + 1,
      });
    },

    /**
     * onSuccess function to invalidate "super-heroes" query
     *
     * @return {void}
     */
    /* onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    }, */

    /**
     * Asynchronously mutates the data and returns the previous hero data.
     *
     * @param {Object} newHero - The new hero data to be added.
     * @return {Object} An object containing the previous hero data.
     */
    onMutate: async (newHero) => {
      const previousHeroData = queryClient.getQueryData<SuperHero[]>([
        "super-heroes",
      ]);

      // Optimistic update, gets overwritten on success
      queryClient.setQueryData(["super-heroes"], (oldData: SuperHero[]) => [
        ...oldData,
        { ...newHero, id: (oldData?.length ?? 0) + 1 },
      ]);

      return { previousHeroData };
    },

    /**
     * Handle the error and update the query client with previous hero data.
     *
     * @param {any} _err - the error object
     * @param {any} _newHero - the new hero object
     * @param {any} context - the context object containing previous hero data
     * @return {void}
     */
    onError: (_err, _newHero, context) => {
      queryClient.setQueryData(["super-heroes"], context?.previousHeroData);
    },

    /**
     * Executes when the operation has been settled, regardless of success or failure.
     *
     * @return {void} No return value
     */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
