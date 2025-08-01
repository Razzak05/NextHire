import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Design",
  "UI/UX Design",
  "Artificial Intelligence",
  "Cyber Security",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/jobs?industry=${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <Carousel>
        <CarouselContent className="gap-3">
          {categories.map((item, index) => (
            <CarouselItem key={index} className="flex basis-auto ">
              <Button
                variant="outline"
                className="rounded-full px-5 py-2 text-sm"
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
