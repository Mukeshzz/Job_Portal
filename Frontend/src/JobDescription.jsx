import React from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

const JobDescription = () => {

    const isApplied = true;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Frontend Developer</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              12 Postions
            </Badge>
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              Part Time
            </Badge>
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              24 LPA
            </Badge>
          </div>
        </div>
        <Button disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-700 hover:bg-[#5f32ad]'}`}>{isApplied ? 'Already Applied' : 'Apply Now' }</Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div>
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Banglore</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span></h1>
        <h1 className="font-bold my-1">Exprience: <span className="pl-4 font-normal text-gray-800">2 years</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">12LPA</span></h1>
        <h1 className="font-bold my-1">Total Apllication: <span className="pl-4 font-normal text-gray-800">4</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">12-01-2025</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
