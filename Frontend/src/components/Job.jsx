import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const Job = ({job}) => {

  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));
  }

  console.log("job",job);
  
  

  return (
    <div className="p-5 rounded-medium shadow-xl bg-white border-gray-200">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Postions</Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.salary}</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#346af5]">Save for later </Button>
      </div>
    </div>
  );
};

export default Job;
