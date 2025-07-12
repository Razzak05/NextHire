import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const getInitials = (fullName) => {
    const words = fullName.split(" ");
    const initials = words
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join("");
    return initials;
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Next<span className="text-[#f83002]">Hire</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile?.profilePic} alt="@shadcn" />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar>
                    <AvatarImage src={user.profile?.profilePic} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Username</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-gray-600">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User2 className="w-4 h-4" />
                    <Button variant="link" className="p-0 h-auto text-sm">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
