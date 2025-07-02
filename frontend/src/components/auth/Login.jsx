import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-5"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full my-4">
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
