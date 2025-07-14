import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileSuccess } from "@/redux/slices/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: Array.isArray(user?.profile?.skills)
        ? user.profile.skills.join(", ")
        : "",
    },
  });

  useEffect(() => {
    if (user && open) {
      reset({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: Array.isArray(user?.profile?.skills)
          ? user.profile.skills.join(", ")
          : "",
      });
    }
  }, [user, open, reset]);

  const updateProfile = async (formData) => {
    const response = await axiosInstance.put("user/update-profile", formData);
    return response;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      dispatch(updateProfileSuccess(response?.data?.user));
      toast.success("Profile Updated !");
      setOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("bio", data.bio);
    formData.append("skills", data.skills);
    if (data.profilePic?.length > 0) {
      formData.append("profilePic", data.profilePic[0]);
    }
    if (data.resume?.length > 0) {
      formData.append("resume", data.resume[0]);
    }
    mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="container">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Edit Your Information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input type="text" className="col-span-3" {...register("name")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                className="col-span-3"
                {...register("email")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                type="tel"
                className="col-span-3"
                {...register("phoneNumber")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input type="text" className="col-span-3" {...register("bio")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                type="text"
                className="col-span-3"
                {...register("skills")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePic" className="text-right">
                Profile Pic
              </Label>
              <Input
                type="file"
                accept="image/*"
                className="col-span-3"
                {...register("profilePic", {
                  validate: {
                    fileType: (value) => {
                      if (!value?.[0]) return true; // Skip validation if no file
                      const file = value[0];
                      const acceptedTypes = [
                        "image/jpg",
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                      ];
                      return (
                        acceptedTypes.includes(file.type) ||
                        "Only jpg, jpeg, png format are allowed"
                      );
                    },
                    fileSize: (value) => {
                      if (!value?.[0]) return true;
                      const file = value[0];
                      const maxSize = 5 * 1024 * 1024; // 5MB
                      return (
                        file.size <= maxSize || "File size exceeds 5MB limit."
                      );
                    },
                  },
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className="col-span-3"
                {...register("resume", {
                  validate: {
                    fileType: (value) => {
                      if (!value?.[0]) return true;
                      const file = value[0];
                      return (
                        file.type === "application/pdf" ||
                        "Only PDF format is allowed"
                      );
                    },
                    fileSize: (value) => {
                      if (!value?.[0]) return true;
                      const file = value[0];
                      const maxSize = 5 * 1024 * 1024;
                      return (
                        file.size <= maxSize || "File size exceeds 5MB limit."
                      );
                    },
                  },
                })}
              />
            </div>
            <Button disabled={isPending} type="submit">
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
