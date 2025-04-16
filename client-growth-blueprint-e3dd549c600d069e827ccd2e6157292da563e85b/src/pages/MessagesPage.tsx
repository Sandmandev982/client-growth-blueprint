
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import MillionDollarMessageCard from "../components/MillionDollarMessageCard";
import { useData } from "../context/DataContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileDown } from "lucide-react";

const MessagesPage = () => {
  const { generatedOutput, formData, isDataGenerated } = useData();
  const navigate = useNavigate();

  const goToExport = () => {
    navigate("/export");
  };
  
  const goToProfile = () => {
    navigate("/");
  };

  if (!isDataGenerated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <div className="container mx-auto py-8 px-4 flex-grow flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-bold text-vbf-blue mb-4">No Data Generated Yet</h2>
            <p className="text-gray-600 mb-6">
              Please generate your client profile first to see your million dollar messages.
            </p>
            <Button
              onClick={goToProfile}
              className="bg-vbf-purple hover:bg-vbf-purple-light"
            >
              Create Client Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-vbf-blue">
              {formData?.brandName}'s Million Dollar Messages
            </h2>
            <Button
              onClick={goToExport}
              className="bg-vbf-purple hover:bg-vbf-purple-light"
            >
              Export All <FileDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="font-semibold text-vbf-blue mb-2">Marketing Angle</h3>
            <p className="text-lg italic text-gray-700 border-l-4 border-vbf-purple pl-4 py-2">
              {generatedOutput?.jobsToBeDone.marketingAngle}
            </p>
          </div>
          
          <MillionDollarMessageCard messages={generatedOutput!.millionDollarMessages} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
