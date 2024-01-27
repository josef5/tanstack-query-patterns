import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

const addSuperHero = (hero: { name: string; alterEgo: string; id: number }) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
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

    /* onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    }, */

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
    onError: (_err, _newHero, context) => {
      queryClient.setQueryData(["super-heroes"], context?.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
