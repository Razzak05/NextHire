import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import getDaysAgo from "@/utils/getDaysAgo";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md shadow-md bg-white border border-gray-200">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="text-sm text-gray-500">
          {getDaysAgo(job?.createdAt)}
        </span>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-4 items-start mt-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={
              job.company?.logo?.url ||
              "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
            }
            alt="Company Logo"
          />
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold ">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-lg">{job?.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-medium" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-medium" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#5c078f]">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
