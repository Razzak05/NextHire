import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/login`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      dispatch(loginSuccess(response?.data?.user));
      const message = response?.data?.user?.name
        ? `${response?.data?.user?.name.split(" ")[0]} Welcome back !`
        : response?.data?.message;
      toast.success(message);

      navigate("/");

      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-5"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>

        {/* Display mutation error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error.response?.data?.message || "Login failed. Please try again."}
          </div>
        )}

        <div className="mb-4">
          <Label className="text-sm mb-2 block">Email</Label>
          <Input
            type="email"
            className="mb-1"
            placeholder="example@gmail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label className="text-sm mb-2 block">Password</Label>
          <Input
            type="password"
            className="mb-1"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters are required",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label className="text-sm mb-2 block">Role</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="student"
                value="student"
                className="cursor-pointer"
                {...register("role", { required: "Role is required" })}
              />
              <Label htmlFor="student" className="cursor-pointer">
                Student
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="recruiter"
                value="recruiter"
                className="cursor-pointer"
                {...register("role", { required: "Role is required" })}
              />
              <Label htmlFor="recruiter" className="cursor-pointer">
                Recruiter
              </Label>
            </div>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full my-4" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>

        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
