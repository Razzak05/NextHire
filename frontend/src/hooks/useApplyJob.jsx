import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useApplyJob = (id) => {
  const queryClient = useQueryClient();

  const applyJob = async () => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/application/apply-job/${id}`
    );
    return response.data;
  };

  const { mutate: apply, isPending } = useMutation({
    mutationKey: ["applyJob", id],
    mutationFn: applyJob,
    onSuccess: (data) => {
      toast.success(data.message || "Applied successfully!");
      queryClient.invalidateQueries({ queryKey: ["job", id] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  return { apply, isPending };
};

export default useApplyJob;
