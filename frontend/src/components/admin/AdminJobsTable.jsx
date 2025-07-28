// src/components/AdminJobsTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Loader2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = ({ filter }) => {
  const { data: jobs, isLoading, isError } = useGetAllAdminJobs();
  const navigate = useNavigate();

  const filteredJobs =
    jobs?.filter((job) =>
      job.title.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center text-red-500">Failed to load jobs</div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        job.company?.logo?.url ||
                        "https://via.placeholder.com/40"
                      }
                      alt={job.company?.name || "Company"}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{job.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      <div
                        onClick={() => navigate(`jobs/update/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`${job._id}/applicants`)}
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {jobs?.length > 0
                  ? "No jobs match your search"
                  : "No Jobs Found."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
