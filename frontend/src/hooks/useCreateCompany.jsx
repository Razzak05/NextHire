import { setSingleCompany } from "@/redux/slices/companySlice";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCreateCompany = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createCompany = async (companyData) => {
    const response = await axiosInstance.post(`/company/register`, companyData);
    return response.data;
  };

  const { mutate: create, isPending } = useMutation({
    mutationKey: ["createCompany"],
    mutationFn: createCompany,
    onSuccess: (data) => {
      if (data) {
        dispatch(setSingleCompany(data.newCompany));
        toast.success(data.message || "Company created successfully!");
        queryClient.invalidateQueries({ queryKey: ["companies"] });
        navigate("/");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  return { create, isPending };
};

export default useCreateCompany;
