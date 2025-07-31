import React, { useEffect } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  // Default to first page if not specified
  if (!params.page) params.page = 1;

  const { data, isLoading, isError, refetch } = useGetAllJobs(params);

  // Refetch when params change
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-[#6A38C2]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-96">
          <p className="text-red-500">
            Failed to load jobs. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex gap-5">
        <div className="w-[25%]">
          <FilterCard />
        </div>

        <div className="w-[75%]">
          <div className="mb-6">
            {/* Show search term if present */}
            {params.search && (
              <div className="mb-4">
                <p className="text-lg">
                  Search results for:
                  <span className="font-bold ml-2">{params.search}</span>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete("search");
                    setSearchParams(newParams);
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}

            <h2 className="text-2xl font-bold">
              {data.totalCount} Job{data.totalCount !== 1 ? "s" : ""} Available
            </h2>
            <p className="text-gray-600">
              Page {data.page} of {data.totalPages}
            </p>
          </div>

          {data.jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <p className="text-gray-500 text-lg mb-4">
                No jobs match your criteria
              </p>
              <Button variant="outline" onClick={() => setSearchParams({})}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.jobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={Number(data.page) === 1}
                onClick={() =>
                  setSearchParams({ ...params, page: Number(data.page) - 1 })
                }
              >
                &laquo; Prev
              </Button>
              <span className="text-sm font-semibold">
                Page {data.page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={Number(data.page) === data.totalPages}
                onClick={() =>
                  setSearchParams({ ...params, page: Number(data.page) + 1 })
                }
              >
                Next &raquo;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
