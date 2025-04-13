
import { clientProfilePrompt } from '../prompts/clientProfile';
import type { GeneratedOutput } from '../../types';
import { generateAIContent } from './openai';
import { parseGeneratedBlueprint } from './blueprintParser';

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
    
    const prompt = clientProfilePrompt(formData);
    console.log('Using prompt template with input data');
    
    const generatedText = await generateAIContent(
      "You are a strategic messaging expert generating a comprehensive client growth blueprint.",
      prompt,
      { temperature: 0.7, maxTokens: 1500 }
    );
    
    return generatedText;
  } catch (error) {
    console.error('Error generating client blueprint:', error);
    throw error;
  }
}

// Re-export the parser function for convenience
export { parseGeneratedBlueprint };
