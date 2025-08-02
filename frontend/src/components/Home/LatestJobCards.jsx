import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer"
    >
      <div className="flex gap-2">
        <div>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={
                job.company?.logo?.url ||
                "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              }
              alt="Company Logo"
            />
          </Avatar>
        </div>
        <div>
          <h1 className="font-medium text-lg">{job.company.name}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">
          {job.description?.slice(0, 100)}...
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
