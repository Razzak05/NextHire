import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useCreateCompany from "@/hooks/useCreateCompany";
import { toast } from "sonner";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const { create, isPending } = useCreateCompany();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!companyName || !description) {
      return toast.error("Please fill in all fields");
    }

    create({ name: companyName, description });
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-10">
        <h1 className="bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">
          What would you like to name your company ?
        </p>
      </div>
      <Label>Company Name</Label>
      <Input
        type="text"
        className="mt-3 mb-4"
        placeholder="NextHire, Microsoft etc."
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Label>Company Description</Label>
      <textarea
        type="text"
        className="mt-3 mb-4 h-1/3 w-full p-1.5 border-2 resize-none"
        placeholder="Describe your company."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Creating..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default CompanyCreate;
