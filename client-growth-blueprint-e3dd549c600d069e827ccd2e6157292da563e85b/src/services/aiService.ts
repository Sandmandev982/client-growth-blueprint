
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
    
    // Parse the blueprint text into structured data
    const structuredOutput = parseGeneratedBlueprint(blueprintText);
    
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

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error saving lead data:", error);
    throw error;
  }
};
