import { useQuery /* , useQueryClient */ } from "@tanstack/react-query";
import axios from "axios";

export const useSuperHeroData = (id: string) => {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["super-hero", id],
    queryFn: () =>
      axios
        .get(`http://localhost:4000/superheroes?id=${id}`)
        .then((res) => res.data[0]),
    /* initialData: () => {
      const heroes = queryClient.getQueryData<SuperHero[]>(["super-heroes"]);
      const hero = heroes?.find((hero) => hero.id === parseInt(id));

      return hero;
    }, */
  });
};
