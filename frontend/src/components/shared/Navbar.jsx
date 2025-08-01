import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import getInitials from "@/utils/getInitials";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => await axiosInstance.post("/user/logout");

  const { mutate } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      dispatch(logout());
      navigate("/login");
    },
  });

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-[#6A38C2] font-semibold"
      : "text-gray-700 hover:text-[#6A38C2]";

  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/jobs" className={linkStyle}>
          Jobs
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkStyle}>
          About Us
        </NavLink>
      </li>
    </>
  );

  const recruiterLinks = (
    <>
      <li>
        <NavLink to="/admin" className={linkStyle}>
          Companies
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/jobs" className={linkStyle}>
          Jobs
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold">
            Next<span className="text-[#f83002]">Hire</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 font-medium">
          <ul className="flex gap-6">
            {user?.role === "recruiter" ? recruiterLinks : commonLinks}
          </ul>
        </nav>

        {/* Auth Buttons or Profile */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile?.image?.url} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar>
                    <AvatarImage src={user.profile?.image?.url} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.profile.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-600">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 className="w-4 h-4" />
                      <NavLink to="/profile" className="text-sm">
                        View Profile
                      </NavLink>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <Button
                      onClick={() => mutate()}
                      variant="link"
                      className="p-0 h-auto text-sm"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-medium mt-4">
            {user?.role === "recruiter" ? recruiterLinks : commonLinks}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <NavLink to="/profile" className={linkStyle}>
                    View Profile
                  </NavLink>
                )}
                <Button
                  onClick={() => mutate()}
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
