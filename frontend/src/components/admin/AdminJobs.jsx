import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  return (
    <div className="max-w-6xl mx-auto my-10 p-3">
      <div className="flex items-center justify-between mb-6">
        <Input
          className="w-auto"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => navigate("create")}>Post Job</Button>
      </div>
      <AdminJobsTable filter={filter} />
    </div>
  );
};

export default AdminJobs;
