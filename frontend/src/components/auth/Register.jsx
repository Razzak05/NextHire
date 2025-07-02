import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        action=""
        className="w-1/2 border border-gray-200 rounded-md p-4 my-5"
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>
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
            placeholder="example@gmail.com"
            {...register("phone", {
              required: "Phone number is required",
            })}
          />
          {errors.phone && (
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
          <div className="flex items-center gap-4 my-5">
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

        <div className="flex items-center gap-2">
          <Label>Profile Picture</Label>
          <Input
            type="file"
            accept="image/*"
            className="cursor-pointer w-3/4"
          />
        </div>

        <Button type="submit" className="w-full my-4">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
