import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useApplyJob = (jobId) => {
  const queryClient = useQueryClient();

  const applyJob = async () => {
    const response = await axiosInstance.post(
      `/application/apply-job/${jobId}`
    );
    return response.data;
  };

  const { mutate: apply, isPending } = useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      toast.success(data.message || "Applied successfully!");
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  return { apply, isPending };
};

export default useApplyJob;
