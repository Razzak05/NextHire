import React from "react";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  const { isLoading, error } = useGetAllJobs();

  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      {isLoading ? <p>Loading...</p> : <LatestJobs />}
      {error && <p className="text-red-500">Failed to load jobs.</p>}
    </div>
  );
};

export default Home;
