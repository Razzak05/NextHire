import React from "react";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Loader2 } from "lucide-react";

const AppliedJobTable = () => {
  const { data: applications = [], isLoading, isError } = useGetAppliedJobs();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load applications. Please try again later.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption className="mb-4">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-medium text-gray-500 mb-2">
                    No applications found
                  </p>
                  <p className="text-gray-400">
                    You haven't applied to any jobs yet
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell className="font-medium">
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">
                  {application.job?.title || "Position not available"}
                </TableCell>
                <TableCell>
                  {application.job?.company?.name || "Company not available"}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      application.status === "accepted"
                        ? "success"
                        : application.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {application.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
