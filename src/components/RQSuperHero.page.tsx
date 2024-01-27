import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

/**
 * Superhero details page
 *
 * @return {JSX.Element} The rendered component
 */
const RQSuperHeroPage = () => {
  const { heroId = "" } = useParams();

  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }
  return (
    <>
      <h2>RQ Super Hero Page</h2>
      <h3>Name: {data?.name}</h3>
      <p>Alter Ego: {data?.alterEgo}</p>
    </>
  );
};

export default RQSuperHeroPage;
