import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="font-medium">No. 1 Job Hunt Website</span>
        <h1 className="text-5xl ">
          Search, Apply & <br />
          Get Your <span>Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
          quidem cupiditate commodi, recusandae, dolor modi eum iusto, in libero
          aliquid illum nostrum quaerat!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 items-center mx-auto gap-4 rounded-lg pl-3">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full"
          />
          <Button>
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
