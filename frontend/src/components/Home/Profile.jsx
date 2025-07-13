import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "../Job/AppliedJobTable";

const Profile = () => {
  const skills = ["Javascript", "React", "Node js"];
  const isResume = true;
  const { user } = useSelector((state) => state.auth);
  const getInitials = (name) => {
    const nameSplited = name.trim().split(" ");
    const initials = nameSplited
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join("");
    return initials;
  };
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profile?.profilePic} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user.name}</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laboriosam, quam?
            </p>
          </div>
        </div>
        <Button className="text-right" variant="outline">
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
          <span>{user.contact}</span>
        </div>
      </div>
      <div className="my-5">
        <h1>Skills</h1>
        <div className="flex items-center gap-1">
          {skills.length > 0 ? (
            skills.map((item, index) => <Badge key={index}>{item}</Badge>)
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center pag-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              className="text-blue-500 w-full hover:underline cursor-pointer"
              target="blank"
              href="https://www.google.com"
            >
              google
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
    </div>
  );
};

export default Profile;
