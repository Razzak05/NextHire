import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSearchParams } from "react-router-dom";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    key: "industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Artificial Intelligence",
      "Cyber Security",
      "Mobile App Developer",
    ],
  },
  {
    filterType: "Salary",
    key: "salary",
    array: ["0-40K", "41K-1 Lakh", "1 Lakh - 5 Lakh"],
  },
];

const FilterCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md sticky top-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold">Filter Jobs</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-sm text-gray-600"
        >
          Clear All
        </Button>
      </div>
      <hr className="mb-4" />

      {filterData.map((data) => (
        <div key={data.key} className="mb-6">
          <h2 className="font-medium mb-2">{data.filterType}</h2>
          <RadioGroup
            value={searchParams.get(data.key) || ""}
            onValueChange={(value) => handleFilterChange(data.key, value)}
          >
            {data.array.map((item) => (
              <div key={item} className="flex items-center space-x-2 my-1">
                <RadioGroupItem value={item} id={`${data.key}-${item}`} />
                <Label htmlFor={`${data.key}-${item}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
