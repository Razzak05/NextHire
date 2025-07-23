import React from "react";
import LatestJobCards from "./LatestJobCards";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJobs = () => {
  const { data } = useGetAllJobs();
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {data.length > 0 ? (
          data
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <p className="mx-auto h-3/6">No Jobs Available !</p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
