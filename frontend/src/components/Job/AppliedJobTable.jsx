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

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TableRow key={index}>
              <TableCell>17-07-2024</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell className="text-right">
                <Badge>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
