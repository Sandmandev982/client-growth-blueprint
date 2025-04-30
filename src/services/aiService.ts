
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
    console.log("Generating client profile with data:", data);
    
    // Check for API key - when using Supabase secret, this should be properly populated
    // from the constants file which gets its value from the environment
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not found");
      toast.error("OpenAI API key is missing. Please add it in your Supabase secrets.");
      throw new Error("OpenAI API key is not configured. Please add the OPENAI_API_KEY to your Supabase secrets.");
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
    console.log("Calling generateClientBlueprint with:", promptData);
    const blueprintText = await generateClientBlueprint(promptData);
    console.log("Generated blueprint text length:", blueprintText.length);
    
    // Parse the blueprint text into structured data
    const structuredOutput = await processClientBlueprint(blueprintText);
    console.log("Parsed structured output completed");
    
    return {
      output: structuredOutput,
      blueprintText
    };
  } catch (error) {
    console.error("Error generating client profile:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        toast.error(`API key issue: ${error.message}`);
      } else if (error.message.includes('429')) {
        toast.error("OpenAI rate limit reached. Please try again in a few moments.");
      } else if (error.message.includes('401')) {
        toast.error("Invalid OpenAI API key. Please check your key and try again.");
      } else {
        toast.error(`Error: ${error.message}. Please try again.`);
      }
    } else {
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
