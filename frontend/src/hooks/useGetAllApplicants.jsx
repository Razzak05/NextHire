import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllApplicants = (jobId) => {
  const fetchAllApplicants = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/application/get-applicants/${jobId}`
    );
    return res.data.job.applications;
  };

  return useQuery({
    queryKey: ["applicants", jobId],
    queryFn: fetchAllApplicants,
  });
};

export default useGetAllApplicants;
