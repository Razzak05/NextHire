import React from "react";
import { useParams } from "react-router-dom"; // to get jobId from URL
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import useUpdateStatus from "@/hooks/useUpdateStatus";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";

const shortListingStatus = [
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const ApplicantsTable = () => {
  const { id: jobId } = useParams(); // 🔑 assuming route is /applicants/:id
  const { mutate } = useUpdateStatus();
  const { data: applicants = [], isLoading } = useGetAllApplicants(jobId);

  const handleStatusChange = (id, newStatus) => {
    mutate({ id, status: newStatus });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Table>
        <TableCaption>A list of recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead>Change Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((application) => (
            <TableRow key={application._id}>
              <TableCell>{application.applicant?.fullName}</TableCell>
              <TableCell>{application.applicant?.email}</TableCell>
              <TableCell>{application.applicant?.contact}</TableCell>
              <TableCell>
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </TableCell>
              <TableCell>
                {new Date(application.appliedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="capitalize">{application.status}</TableCell>
              <TableCell>
                <Select
                  defaultValue={application.status}
                  onValueChange={(val) =>
                    handleStatusChange(application._id, val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pending" />
                  </SelectTrigger>
                  <SelectContent>
                    {shortListingStatus.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
