
import { supabase } from '../integrations/supabase/client';
import { OPENAI_API_KEY } from '../config/constants';
import type { GeneratedOutput, FormData } from '../types';
import { generateClientBlueprint, parseGeneratedBlueprint } from '../lib/ai/promptEngine';
import { toast } from 'sonner';

// Function to generate client profile using OpenAI
export const generateClientProfile = async (data: FormData): Promise<{ 
  output: GeneratedOutput; 
  blueprintText: string;
}> => {
  try {
    console.log("Generating client profile with data:", data);
    
    // Check if API key is available
    if (!OPENAI_API_KEY) {
      toast.error("OpenAI API key is not configured. Please add it to your environment variables.");
      throw new Error("OpenAI API key is not configured");
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
    const blueprintText = await generateClientBlueprint(promptData);
    console.log("Generated blueprint text:", blueprintText);
    
    // Parse the blueprint text into structured data
    const structuredOutput = parseGeneratedBlueprint(blueprintText);
    console.log("Parsed structured output:", structuredOutput);
    
    return {
      output: structuredOutput,
      blueprintText
    };
  } catch (error) {
    console.error("Error generating client profile:", error);
    toast.error("Failed to generate client profile. Please try again.");
    throw error;
  }
};

// Function to save lead data to Supabase
export const saveLeadToDatabase = async (email: string, generatedOutput: GeneratedOutput, blueprintText: string) => {
  try {
    console.log("Saving lead data for email:", email);
    
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: email,
          ideal_client_profile: generatedOutput.idealClientProfile,
          jobs_to_be_done: generatedOutput.jobsToBeDone,
          transformation_outputs: { fullBlueprint: blueprintText }
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
