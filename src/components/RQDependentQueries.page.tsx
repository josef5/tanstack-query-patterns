import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Asynchronously fetches a user by email.
 *
 * @param {string} email - The email of the user to fetch
 * @return {Promise<any>} The user data returned from the API
 */
const fetchUserByEmail = async (email: string) => {
  const { data } = await axios.get(`http://localhost:4000/users?id=${email}`);

  return data[0];
};

/**
 * Fetches courses by channel ID.
 *
 * @param {string} channelId - The ID of the channel
 * @return {Array} The courses associated with the channel ID
 */
const fetchCoursesByChannelId = async (channelId: string) => {
  const { data } = await axios.get(
    `http://localhost:4000/channels?id=${channelId}`
  );

  return data[0].courses;
};

/**
 * Renders the RQDependentQueriesPage component, which fetches user data and courses based on the email provided.
 *
 * @param {string} email - The email of the user to fetch data for
 * @return {JSX.Element} - The component rendering the courses data in a preformatted JSON string
 */
const RQDependentQueriesPage = ({ email }: { email: string }) => {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  const channelId = user?.channelId;

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId, // fetch conditionally
  });

  return <pre>{JSON.stringify(courses, null, 2)}</pre>;
};

export default RQDependentQueriesPage;
