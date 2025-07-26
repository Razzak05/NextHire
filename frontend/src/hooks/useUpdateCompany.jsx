import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/slices/companySlice";
import { useNavigate } from "react-router-dom";

const useUpdateCompany = (id, resetForm) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateCompanyInfo = async (formData) => {
    const response = await axiosInstance.put(`/company/update/${id}`, formData);
    return response.data;
  };

  return useMutation({
    mutationFn: updateCompanyInfo,
    onSuccess: (data) => {
      dispatch(setSingleCompany(data.company));
      toast.success(data?.message || "Company Setup Successful!");
      queryClient.invalidateQueries({ queryKey: ["companies", id] });
      resetForm?.(); // optional reset callback
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed.");
    },
  });
};

export default useUpdateCompany;
