
import { clientProfilePrompt } from '../prompts/clientProfile';
import { generateAIContent } from './openai';
import { parseGPTResponse } from './parseGPTResponse';
import { BlueprintData } from '@/types/ClientProfile';

/**
 * Generates a client blueprint based on form data
 */
export async function generateClientBlueprint(formData: {
  niche: string;
  audience: string;
  brand: string;
  product: string;
  style: string;
  tone: string;
}): Promise<string> {
  try {
    console.log('=== GENERATING CLIENT BLUEPRINT ===');
    console.log('Form data received:', formData);
    
    // Generate the prompt using the template and user's input
    const prompt = clientProfilePrompt(formData);
    console.log('Prompt template applied successfully');
    console.log('Generated prompt length:', prompt.length);
    
    // Call OpenAI API with the generated prompt
    console.log('Calling OpenAI API...');
    const generatedText = await generateAIContent(
      "You are a strategic messaging expert generating a comprehensive client growth blueprint.",
      prompt,
      { temperature: 0.7, maxTokens: 1500 }
    );
    
    console.log('OpenAI API call successful!');
    console.log('Response length:', generatedText.length);
    console.log('Response preview:', generatedText.substring(0, 100) + '...');
    
    return generatedText;
  } catch (error) {
    console.error('=== ERROR GENERATING CLIENT BLUEPRINT ===');
    if (error instanceof Error) {
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error object:', error);
    }
    throw error;
  }
}

/**
 * Processes the raw generated text and returns structured blueprint data
 */
export async function processClientBlueprint(generatedText: string): Promise<BlueprintData> {
  try {
    console.log('=== PROCESSING CLIENT BLUEPRINT ===');
    console.log('Processing text length:', generatedText.length);
    
    // Parse the generated text into structured data using the parser
    console.log('Applying parseGPTResponse...');
    const parsedData = parseGPTResponse(generatedText);
    
    console.log('Blueprint parsing completed successfully');
    console.log('Parsed sections:');
    console.log('- Preliminary Transformation:', !!parsedData.preliminaryTransformation);
    console.log('- Ideal Client Profile:', !!parsedData.idealClientProfile);
    console.log('- Jobs To Be Done:', !!parsedData.jobsToBeDone);
    console.log('- Transformation Path:', !!parsedData.transformationPath);
    console.log('- Action Plan:', !!parsedData.immediateActionPlan);
    console.log('- Sample Post:', !!parsedData.sampleEngagementPost);
    console.log('- Why This Works:', !!parsedData.whyThisWorks);
    
    return parsedData;
  } catch (error) {
    console.error('=== ERROR PROCESSING CLIENT BLUEPRINT ===');
    if (error instanceof Error) {
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error object:', error);
    }
    throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Re-export the parser function for convenience
export { parseGPTResponse };
