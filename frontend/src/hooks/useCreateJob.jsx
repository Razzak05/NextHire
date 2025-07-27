import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const useCreateJob = (companyId, resetForm) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createJobRequest = async (jobData) => {
    const response = await axiosInstance.post("/job/create-job", {
      ...jobData,
      companyId,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: createJobRequest,
    mutationKey: ["createJob"],
    onSuccess: (data) => {
      toast.success(data?.message || "Job created successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      resetForm?.();
      navigate("/jobs");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create job.");
    },
  });
};

export default useCreateJob;
