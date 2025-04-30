
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientProfileForm from "../components/ClientProfileForm";
import NavBar from "../components/NavBar";
import { FormData } from "../types";
import { generateClientProfile } from "../services/aiService";
import { useData } from "../context/DataContext";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeneratedClientProfile from "../components/GeneratedClientProfile";
import BlueprintLoadingSkeleton from "../components/BlueprintLoadingSkeleton";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blueprintText, setBlueprintText] = useState("");
  const { setFormData, setGeneratedOutput, generatedOutput, formData } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      const { output, blueprintText } = await generateClientProfile(data);
      setGeneratedOutput(output);
      setBlueprintText(blueprintText);
      toast.success("Your VBF Process has been generated!");
    } catch (error) {
      console.error("Error generating client profile:", error);
      toast.error("Failed to generate profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToExport = () => {
    navigate("/export");
  };

  const isDataGenerated = !!generatedOutput && !!blueprintText;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="grid grid-cols-1 gap-8">
          {!isDataGenerated && (
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-lcm-black mb-2">VBF Process</h1>
              <p className="text-gray-600 max-w-3xl">
                Generate your ideal client profile, identify key struggles and jobs to be done, and create powerful marketing messages that resonate with your audience.
              </p>
            </div>
          )}
          
          {!isDataGenerated ? (
            <ClientProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-lcm-black">
                  {formData?.brandName}'s VBF Process Results
                </h2>
                <Button
                  onClick={goToExport}
                  className="bg-lcm-red hover:bg-lcm-red/80 text-lcm-white"
                >
                  Export Results <FileDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <GeneratedClientProfile 
                generatedOutput={generatedOutput}
                blueprintText={blueprintText}
              />
            </div>
          )}
        </div>
        
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
              <BlueprintLoadingSkeleton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
