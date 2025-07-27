import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useCreateJob from "@/hooks/useCreateJob";
import { useSelector } from "react-redux";

const jobFields = [
  { label: "Title", name: "title", placeholder: "eg., Software Engineer" },
  {
    label: "Description",
    name: "description",
    placeholder: "Job role and responsibilities",
  },
  {
    label: "Requirements (comma separated)",
    name: "requirements",
    placeholder: "eg., React, Node.js, MongoDB",
  },
  {
    label: "Vacancies",
    name: "vacancies",
    type: "number",
    placeholder: "e.g., 5",
  },
  {
    label: "Salary",
    name: "salary",
    type: "number",
    placeholder: "e.g., 50000",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "e.g., Remote, Bengaluru",
  },
  {
    label: "Job Type",
    name: "jobType",
    placeholder: "e.g., Full-Time, Part-Time",
  },
  {
    label: "Experience Level",
    name: "experience",
    type: "number",
    placeholder: "e.g., Entry, Mid",
  },
  {
    label: "Position",
    name: "position",
    placeholder: "e.g., Frontend Developer",
  },
];

const PostJob = () => {
  const navigate = useNavigate();
  const { allCompanies: companies } = useSelector((state) => state.company);
  const [companyId, setCompanyId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createJob, isPending } = useCreateJob(companyId, () =>
    reset()
  );

  const onSubmit = (data) => {
    if (!companyId) {
      toast.error("Company Id is required");
      return;
    }
    createJob({ ...data, companyId });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="shadow-xl/30 p-5">
        <div className="my-10">
          <h1 className="font-bold text-3xl mb-2">Post a New Job</h1>
          <p className="text-gray-500">
            Fill in the details below to create a job listing
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Select - Full Width */}
          {companies?.length > 0 && (
            <div>
              <Label>Company</Label>
              <Select onValueChange={(val) => setCompanyId(val)}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Job Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobFields.map(({ label, name, type = "text", placeholder }) => (
              <div key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  className="mt-2"
                  {...register(name, { required: `${label} is required` })}
                />
                {errors[name] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
