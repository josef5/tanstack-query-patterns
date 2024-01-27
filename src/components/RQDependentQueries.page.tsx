import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = async (email: string) => {
  const { data } = await axios.get(`http://localhost:4000/users?id=${email}`);

  return data[0];
};

const fetchCoursesByChannelId = async (channelId: string) => {
  const { data } = await axios.get(
    `http://localhost:4000/channels?id=${channelId}`
  );

  return data[0].courses;
};

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
