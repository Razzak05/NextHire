import axiosInstance from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/slices/jobSlice";
import { useQuery } from "@tanstack/react-query";

// useGetAllJobs.js
const useGetAllJobs = () => {
  const dispatch = useDispatch();

  const fetchAllJobs = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/job/get-all-jobs`
    );
    const jobs = res.data.jobs;
    dispatch(setAllJobs(jobs));
    return jobs;
  };

  const query = useQuery({
    queryKey: ["allJobs"],
    queryFn: fetchAllJobs,
  });

  return query;
};

export default useGetAllJobs;
