import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const registerUser = async (formData) => {
    const response = await axiosInstance.post("/user/register", formData);
    return response;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Registration Successful!");
      navigate("/login");
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Registration failed!");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.profilePic?.length > 0) {
      formData.append("profilePic", data.profilePic[0]);
    }
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl border border-gray-200 rounded-md p-4 my-5 bg-white shadow-sm"
      >
        <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

        <div>
          <Label className="text-sm mb-2">Full Name</Label>
          <Input
            type="text"
            placeholder="e.g Alex"
            className="mb-3"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label className="text-sm mb-2">Email</Label>
          <Input
            type="email"
            className="mb-3"
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

        <div>
          <Label className="text-sm mb-2">Phone Number</Label>
          <Input
            type="tel"
            className="mb-3"
            maxLength={15}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Phone number must be 10-15 digits",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <Label className="text-sm mb-2">Password</Label>
          <Input
            type="password"
            className="mb-3"
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 my-4">
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              id="student"
              value="student"
              {...register("role", { required: true })}
              className="cursor-pointer"
            />
            <Label htmlFor="student">Student</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              id="recruiter"
              value="recruiter"
              {...register("role", { required: true })}
              className="cursor-pointer"
            />
            <Label htmlFor="recruiter">Recruiter</Label>
          </div>
        </div>
        {errors.role && (
          <p className="text-red-500 text-sm">Role is required</p>
        )}

        <div className="flex flex-col gap-2 mb-4">
          <Label>Profile Picture</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("profilePic", {
              required: "Profile picture is required",
            })}
            className="cursor-pointer"
          />
          {errors.profilePic && (
            <p className="text-red-500 text-sm">{errors.profilePic.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full my-4" disabled={isPending}>
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
