
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
    console.log('Generating blueprint with data:', formData);
    
    // Generate the prompt using the template and user's input
    const prompt = clientProfilePrompt(formData);
    console.log('Using prompt template with input data');
    
    // Call OpenAI API with the generated prompt
    const generatedText = await generateAIContent(
      "You are a strategic messaging expert generating a comprehensive client growth blueprint.",
      prompt,
      { temperature: 0.7, maxTokens: 1500 }
    );
    
    console.log('Blueprint generated successfully, length:', generatedText.length);
    return generatedText;
  } catch (error) {
    console.error('Error generating client blueprint:', error);
    throw error;
  }
}

/**
 * Processes the raw generated text and returns structured blueprint data
 */
export async function processClientBlueprint(generatedText: string): Promise<BlueprintData> {
  try {
    console.log('Processing generated blueprint text into structured data');
    
    // Parse the generated text into structured data using the parser
    const parsedData = parseGPTResponse(generatedText);
    
    console.log('Blueprint parsing complete');
    return parsedData;
  } catch (error) {
    console.error('Error processing client blueprint:', error);
    throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Re-export the parser function for convenience
export { parseGPTResponse };
