
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ExportTools from "../components/ExportTools";
import { useData } from "../context/DataContext";
import { Button } from "@/components/ui/button";
import { PanelTop } from "lucide-react";

const ExportPage = () => {
  const { generatedOutput, formData, isDataGenerated } = useData();
  const navigate = useNavigate();

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
              Please generate your client profile first before exporting.
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
          <div>
            <h2 className="text-2xl font-bold text-vbf-blue mb-2">
              Export {formData?.brandName}'s Client Growth Blueprint
            </h2>
            <p className="text-gray-600">
              Download or copy your generated content to use in your marketing materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <ExportTools generatedData={generatedOutput!} formData={formData!} />
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <PanelTop className="h-5 w-5 text-vbf-purple mr-2" />
                  <h3 className="text-lg font-semibold text-vbf-blue">Blueprint Summary</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Brand</h4>
                    <p className="font-semibold">{formData?.brandName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Target Audience</h4>
                    <p className="font-semibold">{formData?.audience}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Primary Product/Service</h4>
                    <p className="font-semibold">{formData?.productOrService}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Content Includes</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      <li>Ideal Client Profile</li>
                      <li>Key Struggles & Jobs To Be Done</li>
                      <li>Marketing Angle</li>
                      <li>3 Million Dollar Messages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
