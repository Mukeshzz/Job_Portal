import React from "react";
import { Button } from "./ui/button";
import { Badge, Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Job = () => {
  return (
    <div className="p-5 rounded-medium shadow-xl bg-white border-gray-200">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src="" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse necessitatibus reiciendis id cumque omnis magnam sint pariatur alias voluptatem blanditiis!</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Postions</Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">Part Time</Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">24 LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#346af5]">Save for later </Button>
      </div>
    </div>
  );
};

export default Job;
