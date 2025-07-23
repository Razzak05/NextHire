import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById";
import useApplyJob from "@/hooks/useApplyJob";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { data: job, isLoading, error } = useGetJobById(id);
  const { apply, isPending } = useApplyJob(id);

  const isApplied =
    user &&
    job?.applications?.some((application) => application.applicant === user.id);

  const handleApplyJob = () => {
    if (!isApplied) {
      apply();
    }
  };

  if (isLoading) return <p>Loading job details...</p>;
  if (error) return <p>Failed to load job: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{job?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {job.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {job.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {job.salary}
            </Badge>
          </div>
        </div>

        {user && (
          <Button
            disabled={isApplied || isPending}
            onClick={handleApplyJob}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied
              ? "Already Applied"
              : isPending
              ? "Applying..."
              : "Apply Now"}
          </Button>
        )}
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {job.description}
      </h1>

      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">{job.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">{job.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.experienceLevel}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {`${new Date(job?.createdAt).getDate()} days ago`}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDetail;
