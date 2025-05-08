// This file is no longer needed as we're using the Supabase Edge Function
// It's kept as a placeholder to avoid breaking imports but doesn't contain functional code

export const initializeOpenAI = () => {
  console.warn('initializeOpenAI is deprecated. Using Supabase Edge Function instead.');
  return null;
};

export const generateAIContent = async (
  systemPrompt: string, 
  userPrompt: string,
  options = { temperature: 0.7, maxTokens: 1500 }
): Promise<string> => {
  console.warn('generateAIContent is deprecated. Using Supabase Edge Function instead.');
  throw new Error('Direct OpenAI API access has been replaced with Supabase Edge Function');
};
