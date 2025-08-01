import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useUpdateCompany from "@/hooks/useUpdateCompany";

const CompanySetup = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const { mutate, isPending } = useUpdateCompany(id, reset); // ← use custom hook

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("website", data.website);
    formData.append("location", data.location);
    if (data.companyLogo?.length > 0) {
      formData.append("logo", data.companyLogo[0]);
    }
    mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between p-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl text-center flex-1">
            Company Setup
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label className="mb-2">Company Name</Label>
            <Input
              type="text"
              placeholder={singleCompany?.name || "eg. Google"}
              className="mb-3"
              {...register("name")}
            />
          </div>
          <div>
            <Label className="mb-2">Description</Label>
            <Input
              type="text"
              placeholder={
                singleCompany?.description || "write a description..."
              }
              className="mb-3"
              {...register("description")}
            />
          </div>
          <div>
            <Label className="mb-2">Website</Label>
            <Input
              type="text"
              placeholder={singleCompany?.website || "eg. www.google.com"}
              className="mb-3"
              {...register("website")}
            />
          </div>
          <div>
            <Label className="mb-2">Location</Label>
            <Input
              type="text"
              placeholder={singleCompany?.location || "eg. Mumbai"}
              className="mb-3"
              {...register("location")}
            />
          </div>
          <div>
            <Label className="mb-2">Logo</Label>
            <Input type="file" accept="image/*" {...register("companyLogo")} />
          </div>
        </div>
        <Button className="mt-5 w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default CompanySetup;
