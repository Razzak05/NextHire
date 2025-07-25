import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between mb-6">
        <Input className="w-auto" placeholder="Filter by name" />
        <Button onClick={() => navigate("companies/create")}>
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
