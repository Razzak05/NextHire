import React from "react";
import LatestJobCards from "./LatestJobCards";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  // Only fetch latest 6 jobs
  const { data, isLoading } = useGetAllJobs({
    limit: 6,
    sortBy: "createdAt",
    sortOrder: -1,
  });

  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl p-4 lg:text-4xl  font-bold">
          <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
        </h1>
        <Link to="/jobs" className="text-[#6A38C2] hover:underline">
          View All Jobs →
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-[#6A38C2]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 m-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.jobs?.length > 0 ? (
            data.jobs.map((job) => <LatestJobCards key={job._id} job={job} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No Jobs Available!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
