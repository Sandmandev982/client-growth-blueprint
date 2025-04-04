
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientProfileForm from "../components/ClientProfileForm";
import IdealClientProfileCard from "../components/IdealClientProfileCard";
import JobsToBeDoneCard from "../components/JobsToBeDoneCard";
import NavBar from "../components/NavBar";
import { FormData } from "../types";
import { generateClientProfile } from "../services/aiService";
import { useData } from "../context/DataContext";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setFormData, setGeneratedOutput, generatedOutput, formData, isDataGenerated } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      const result = await generateClientProfile(data);
      setGeneratedOutput(result);
    } catch (error) {
      console.error("Error generating client profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToMessages = () => {
    navigate("/jobs");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="grid grid-cols-1 gap-8">
          {!isDataGenerated && (
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-vbf-blue mb-2">Client Growth Blueprint</h1>
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
                <h2 className="text-2xl font-bold text-vbf-blue">
                  {formData?.brandName}'s Client Growth Blueprint
                </h2>
                <Button
                  onClick={goToMessages}
                  className="bg-vbf-purple hover:bg-vbf-purple-light"
                >
                  View Messages <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <IdealClientProfileCard profile={generatedOutput!.idealClientProfile} />
              <JobsToBeDoneCard data={generatedOutput!.jobsToBeDone} />
            </div>
          )}
        </div>
        
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <Loader2 className="h-8 w-8 text-vbf-purple animate-spin mr-4" />
              <div>
                <h3 className="font-semibold text-lg">Generating your blueprint...</h3>
                <p className="text-gray-500">This may take a moment.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
