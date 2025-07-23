import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "../Job/AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import getInitials from "@/utils/getInitials";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profile?.image?.url} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user.name}</h1>
            <p>{user.profile?.bio}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="text-right"
          variant="outline"
        >
          <Pen />
        </Button>
      </div>
      <div>
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>{user.phoneNumber}</span>
        </div>
      </div>
      <div className="my-5">
        <h1 className="text-lg my-1.5">Skills</h1>
        <div className="flex items-center gap-1">
          {user?.profile?.skills?.length > 0 ? (
            user?.profile?.skills?.map((item, index) => (
              <Badge className="text-sm" key={index}>
                {item}
              </Badge>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center pag-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user.profile?.resume?.url ? (
            <a
              className="text-blue-500 w-full hover:underline cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile?.resume?.url}
            >
              {user.profile?.resume?.originalName || "Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Application table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
