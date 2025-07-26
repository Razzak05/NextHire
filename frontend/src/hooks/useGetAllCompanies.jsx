import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllCompanies = () => {
  const fetchAllCompanies = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/company/get-all-companies`
    );
    return res.data.companies;
  };

  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchAllCompanies,
  });
};

export default useGetAllCompanies;
