import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center my-10">
        <div className="flex flex-col gap-10 ">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold text-[#2D336B]">Find Your Dream Job Today</h1>
            <p className="text-black">
              Connecting Talent with Opportunity: Your Gateway to Career Success
            </p>
          </div>
          <div className="flex w-[40%] shadow-lg border border-gray-200 items-center mx-auto gap-4 rounded-lg pl-3">
            <input
              type="text"
              placeholder="Find Your Dream Jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full"
            />
            <Button onClick={searchJobHandler}>
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div>
          <img src="./job_vacancy.jpg" alt="" className="h-[500px] w-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
