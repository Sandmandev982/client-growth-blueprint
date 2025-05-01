
import { supabase } from '../integrations/supabase/client';
import { OPENAI_API_KEY } from '../config/constants';
import type { FormData } from '../types';
import { BlueprintData } from '@/types/ClientProfile';
import { generateClientBlueprint, processClientBlueprint } from '../lib/ai/promptEngine';
import { toast } from 'sonner';

// Function to generate client profile using OpenAI
export const generateClientProfile = async (data: FormData): Promise<{ 
  output: BlueprintData; 
  blueprintText: string;
}> => {
  try {
    console.log("=== GENERATING CLIENT PROFILE ===");
    console.log("Input data:", data);
    
    // Check if API key exists and log its status (not the actual key)
    if (!OPENAI_API_KEY) {
      const errorMsg = "OpenAI API key is missing. Please check your Supabase secrets or refresh the page.";
      console.error("CRITICAL ERROR:", errorMsg);
      toast.error(errorMsg);
      throw new Error("OpenAI API key is not configured properly. Please check the Supabase secrets.");
    } else {
      console.log("API key validation:");
      console.log("- API key present: YES");
      console.log("- API key length:", OPENAI_API_KEY.length);
      console.log("- First few chars:", OPENAI_API_KEY.substring(0, 3) + "...");
    }
    
    // Transform form data to the format expected by the prompt engine
    const promptData = {
      niche: data.niche,
      audience: data.audience,
      brand: data.brandName,
      product: data.productOrService,
      style: data.style,
      tone: data.tone,
    };
    
    // Generate the client blueprint text using the prompt engine
    console.log("Calling generateClientBlueprint with input data");
    const blueprintText = await generateClientBlueprint(promptData);
    console.log("Blueprint text generated successfully!");
    console.log("- Text length:", blueprintText.length);
    console.log("- Text preview:", blueprintText.substring(0, 100) + "...");
    
    // Parse the blueprint text into structured data
    console.log("Parsing blueprint text into structured data...");
    const structuredOutput = await processClientBlueprint(blueprintText);
    console.log("Blueprint parsing completed successfully");
    
    return {
      output: structuredOutput,
      blueprintText
    };
  } catch (error) {
    console.error("=== ERROR GENERATING CLIENT PROFILE ===");
    if (error instanceof Error) {
      console.error("Error type: ", error.constructor.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      // More specific error handling
      if (error.message.includes('API key')) {
        toast.error(`API key issue: ${error.message}`);
      } else if (error.message.includes('429')) {
        toast.error("OpenAI rate limit reached. Please try again in a few moments.");
      } else if (error.message.includes('401')) {
        toast.error("Invalid OpenAI API key. Please check your key in Supabase secrets.");
      } else {
        toast.error(`Error: ${error.message}. Please try again.`);
      }
    } else {
      console.error("Unknown error object:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
    
    throw error;
  }
};

// Function to save lead data to Supabase
export const saveLeadToDatabase = async (email: string, generatedOutput: BlueprintData, blueprintText: string) => {
  try {
    console.log("Saving lead data for email:", email);
    
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: email,
          ideal_client_profile: generatedOutput.idealClientProfile,
          jobs_to_be_done: generatedOutput.jobsToBeDone,
          transformation_outputs: { 
            transformationPath: generatedOutput.transformationPath,
            immediateActionPlan: generatedOutput.immediateActionPlan,
            sampleEngagementPost: generatedOutput.sampleEngagementPost,
            whyThisWorks: generatedOutput.whyThisWorks,
            fullBlueprint: blueprintText 
          }
        }
      ]);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    console.log("Lead data saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving lead data:", error);
    toast.error("Failed to save your data. Please try again.");
    throw error;
  }
};
