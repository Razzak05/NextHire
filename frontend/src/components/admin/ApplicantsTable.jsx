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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useUpdateStatus from "@/hooks/useUpdateStatus";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";
import { Loader2 } from "lucide-react";

const shortListingStatus = [
  { label: "Pending", value: "pending" },
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

  if (isLoading)
    return (
      <div className="w-12 h-12 animate-spin mx-auto">
        <Loader2 />
      </div>
    );

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
              <TableCell>{application.applicant?.name}</TableCell>
              <TableCell>{application.applicant?.email}</TableCell>
              <TableCell>{application.applicant?.phoneNumber}</TableCell>
              <TableCell>
                <a
                  href={application.applicant?.profile?.resume?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline cursor-pointer"
                >
                  View Resume
                </a>
              </TableCell>
              <TableCell>
                {new Date(application.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="capitalize">{application.status}</TableCell>
              <TableCell>
                <Select
                  value={application.status.toLowerCase()}
                  onValueChange={(val) =>
                    handleStatusChange(application._id, val)
                  }
                >
                  <SelectTrigger className="capitalize">
                    {application.status.toLowerCase()}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {shortListingStatus.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className="capitalize"
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
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
