
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, MessageSquare, FileText } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-lcm-black py-4 px-6 shadow-md w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <BarChart3 className="text-lcm-white h-6 w-6 mr-2" />
          <h1 className="text-lcm-white text-xl font-bold">Client Growth Blueprint</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={isActive("/") ? "secondary" : "ghost"} 
            onClick={() => navigate("/")}
            className="text-lcm-white hover:text-lcm-white hover:bg-lcm-red/20"
          >
            <Users className="h-4 w-4 mr-2" />
            Profile
          </Button>
          
          <Button 
            variant={isActive("/jobs") ? "secondary" : "ghost"} 
            onClick={() => navigate("/jobs")}
            className="text-lcm-white hover:text-lcm-white hover:bg-lcm-red/20"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
          
          <Button 
            variant={isActive("/export") ? "secondary" : "ghost"} 
            onClick={() => navigate("/export")}
            className="text-lcm-white hover:text-lcm-white hover:bg-lcm-red/20"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
