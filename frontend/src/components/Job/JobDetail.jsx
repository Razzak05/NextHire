// src/components/Job/JobDetail.jsx
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById";
import useApplyJob from "@/hooks/useApplyJob";
import getDaysAgo from "@/utils/getDaysAgo";
import { Loader2 } from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { data: job, isLoading, error } = useGetJobById(id);
  const { apply, isPending } = useApplyJob(id);

  const isApplied =
    user &&
    job?.applications?.some(
      (application) =>
        application.applicant?._id?.toString() === user._id?.toString()
    );

  const handleApplyJob = () => {
    if (!isApplied && !isPending) {
      apply();
    }
  };

  if (isLoading) return <Loader2 className="animate-spin mx-auto my-10" />;

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load job: {error.message}
      </div>
    );

  if (!job)
    return <div className="text-center py-10 text-gray-500">Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-bold text-2xl text-gray-800">{job.title}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="bg-blue-100 text-blue-700 font-medium">
              {job.position} Positions
            </Badge>
            <Badge className="bg-red-100 text-red-700 font-medium">
              {job.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-medium">
              {job.salary} LPA
            </Badge>
          </div>
        </div>

        {user && (
          <Button
            onClick={handleApplyJob}
            disabled={isApplied || isPending}
            className={`min-w-[120px] ${
              isApplied
                ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                : isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
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

      <div className="border-t border-gray-200 mt-6 pt-6">
        <h2 className="font-bold text-lg mb-4">Job Details</h2>

        <div className="space-y-3">
          <div className="flex">
            <span className="font-semibold w-32">Role:</span>
            <span className="text-gray-700">{job.title}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Location:</span>
            <span className="text-gray-700">{job.location}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Description:</span>
            <span className="text-gray-700">{job.description}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Experience:</span>
            <span className="text-gray-700">{job.experienceLevel}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Vacancies:</span>
            <span className="text-gray-700">{job.vacancies}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Salary:</span>
            <span className="text-gray-700">{job.salary} LPA</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Total Applicants:</span>
            <span className="text-gray-700">
              {job.applications?.length || 0}
            </span>
          </div>

          <div className="flex">
            <span className="font-semibold w-32">Posted Date:</span>
            <span className="text-gray-700">{getDaysAgo(job.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
