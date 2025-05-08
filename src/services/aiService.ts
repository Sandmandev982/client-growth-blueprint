
import { FormData, BlueprintData } from '../types';
import { generateClientBlueprint, processClientBlueprint } from '@/lib/ai/promptEngine';

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
    
    // Generate the blueprint text using the Supabase Edge Function
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
