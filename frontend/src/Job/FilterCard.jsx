import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

// Corrected typos in labels
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
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
    array: ["0-40K", "41K-1 Lakh", "1 Lakh - 5 Lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h1 className="text-xl font-semibold">Filter Jobs</h1>
      <hr className="mt-3 mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-medium mb-2">{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, itemIndex) => {
              const id = `${data.filterType}-${itemIndex}`;
              return (
                <div key={id} className="flex items-center space-x-2 my-1">
                  <RadioGroupItem
                    className="border-[1px] border-black"
                    value={item}
                    id={id}
                  />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
