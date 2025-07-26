import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllAdminJobs = () => {
  const fetchAllAdminJobs = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/job/my-job`
    );
    return res.data.jobs;
  };

  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchAllAdminJobs,
  });
};

export default useGetAllAdminJobs;
