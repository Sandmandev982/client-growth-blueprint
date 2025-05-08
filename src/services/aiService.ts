
import { FormData, BlueprintData } from '../types';
import { generateClientBlueprint, processClientBlueprint } from '@/lib/ai/promptEngine';
import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a client profile based on form inputs
 */
export async function generateClientProfile(formData: FormData): Promise<{
  output: BlueprintData;
  blueprintText: string;
}> {
  try {
    console.log('Generating client profile with form data:', formData);
    
    // Map form data to the format expected by the prompt engine
    const promptData = {
      niche: formData.niche,
      audience: formData.audience,
      brand: formData.brandName,
      product: formData.productOrService,
      style: formData.style,
      tone: formData.tone
    };
    
    // Generate the blueprint text using the Edge Function
    console.log('Calling generateClientBlueprint...');
    const blueprintText = await generateClientBlueprint(promptData);
    console.log('Blueprint text generated, length:', blueprintText.length);
    
    // Parse the generated text into structured data
    console.log('Processing blueprint text...');
    const output = await processClientBlueprint(blueprintText);
    console.log('Blueprint processing complete');
    
    return { output, blueprintText };
  } catch (error) {
    console.error('Error in generateClientProfile:', error);
    throw new Error(`Failed to generate client profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Saves lead information to the database
 */
export async function saveLeadToDatabase(email: string, generatedOutput: any, blueprintText: string): Promise<void> {
  try {
    console.log('Saving lead to database:', email);
    
    // Save to the leads table in Supabase
    const { error } = await supabase.from('leads').insert({
      email: email,
      ideal_client_profile: generatedOutput.idealClientProfile || {},
      jobs_to_be_done: generatedOutput.jobsToBeDone || {},
      transformation_outputs: {
        preliminaryTransformation: generatedOutput.preliminaryTransformation || '',
        transformationPath: generatedOutput.transformationPath || {},
        immediateActionPlan: generatedOutput.immediateActionPlan || {},
        sampleEngagementPost: generatedOutput.sampleEngagementPost || '',
        whyThisWorks: generatedOutput.whyThisWorks || {},
        rawText: blueprintText
      }
    });
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    console.log('Lead saved successfully');
  } catch (error) {
    console.error('Error in saveLeadToDatabase:', error);
    throw new Error(`Failed to save lead: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
