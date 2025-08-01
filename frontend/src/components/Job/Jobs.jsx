import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Loader2, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const params = Object.fromEntries(searchParams.entries());

  if (!params.page) params.page = 1;

  const { data, isLoading, isError, refetch } = useGetAllJobs(params);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#6A38C2]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center items-center h-96">
        <p className="text-red-500">
          Failed to load jobs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="mb-6 md:hidden border rounded-md p-3">
          <FilterCard onClose={() => setShowFilters(false)} />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5">
        {/* Desktop Filters */}
        <div className="hidden md:block w-[25%]">
          <FilterCard />
        </div>

        <div className="w-full md:w-[75%]">
          <div className="mb-6">
            {params.search && (
              <div className="mb-4">
                <p className="text-lg">
                  Search results for:{" "}
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
