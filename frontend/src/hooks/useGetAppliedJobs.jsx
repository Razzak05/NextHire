import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAppliedJobs = () => {
  const getAppliedJob = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/application/get-applied-jobs`
    );
    return res.data.applications;
  };

  return useQuery({
    queryKey: ["appliedJobs"],
    queryFn: getAppliedJob,
  });
};

export default useGetAppliedJobs;
