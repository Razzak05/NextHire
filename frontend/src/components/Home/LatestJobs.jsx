import React from "react";
import LatestJobCards from "./LatestJobCards";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";

const LatestJobs = () => {
  const { data, isLoading } = useGetAllJobs();

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-[#6A38C2]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {data && data.length > 0 ? (
            data
              .slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
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
