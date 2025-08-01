import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const loginUser = async (formData) => {
    const response = await axiosInstance.post("/user/login", formData);
    return response;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["currentUser"]);
      dispatch(loginSuccess(response?.data?.user));

      const message = response?.data?.user?.name
        ? `${response?.data?.user?.name.split(" ")[0]}, welcome back!`
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
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md border border-gray-200 rounded-md p-6 shadow-sm bg-white"
      >
        <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

        {/* Display mutation error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error.response?.data?.message || "Login failed. Please try again."}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <Label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
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
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <Label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
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
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <Label className="mb-1 block text-sm font-medium">Role</Label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="student"
                {...register("role", { required: "Role is required" })}
              />
              <span>Student</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="recruiter"
                {...register("role", { required: "Role is required" })}
              />
              <span>Recruiter</span>
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>

        {/* Link to Register */}
        <div className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
