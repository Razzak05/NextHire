import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
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
        <Button onClick={() => navigate("companies/create")}>
          New Company
        </Button>
      </div>
      <CompaniesTable filter={filter} />
    </div>
  );
};

export default Companies;
