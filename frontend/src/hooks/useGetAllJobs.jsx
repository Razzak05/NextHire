import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllJobs = (params = {}) => {
  const fetchAllJobs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/job/get-all-jobs`,
      { params }
    );
    return res.data;
  };

  return useQuery({
    queryKey: ["allJobs", params],
    queryFn: fetchAllJobs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useGetAllJobs;
