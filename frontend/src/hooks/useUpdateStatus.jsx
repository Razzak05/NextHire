import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      axiosInstance.put(`applicantion/status/${id}/update`, { status }),
    onSuccess: () => {
      toast.success("Status updated successfully!");
      queryClient.invalidateQueries(["applicants"]);
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });
};

export default useUpdateStatus;
