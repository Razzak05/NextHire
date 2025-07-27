import { setAllCompanies } from "@/redux/slices/companySlice";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const fetchAllCompanies = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/company/get-all-companies`
    );
    const companies = res.data.companies;
    dispatch(setAllCompanies(companies));
    return companies;
  };

  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchAllCompanies,
  });
};

export default useGetAllCompanies;
