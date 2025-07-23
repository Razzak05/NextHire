import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useGetJobById = (id) => {
  const getJobById = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/job/${id}`
    );
    return res.data.job;
  };

  const query = useQuery({
    queryKey: ["job", id],
    queryFn: getJobById,
  });

  return query;
};

export default useGetJobById;
