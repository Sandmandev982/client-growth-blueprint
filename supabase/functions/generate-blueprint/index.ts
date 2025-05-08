
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { OpenAI } from "https://esm.sh/openai@4.20.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    const openai = new OpenAI({
      apiKey: openAIApiKey,
    });

    const { niche, audience, brand, product, style, tone } = await req.json();

    console.log('Received form data:');
    console.log('Niche:', niche);
    console.log('Audience:', audience);
    console.log('Brand:', brand);
    console.log('Product:', product);
    console.log('Style:', style);
    console.log('Tone:', tone);

    // Generate the prompt
    const prompt = `You are a messaging strategist for ${niche || 'online course creators'}. 
  
    Given the following input:
    
    - Target Audience: ${audience || 'professionals looking to scale their expertise'}
    - Brand: ${brand || 'expert-focused coaching business'}
    - Product/Service: ${product || 'knowledge-based products and services'}
    - Style Preference: ${style || 'professional but approachable'}
    - Tone: ${tone || 'motivational and clear'}
    
    Return a markdown-formatted Client Growth Blueprint with these 7 specific sections:
    
    1. ## Preliminary Transformation Statement
       A concise statement that captures the unique value proposition and transformation you offer.
    
    2. ## Ideal Client Avatar
       ### Demographics
       - Age: [specific age range]
       - Gender: [specific gender if relevant, or "All genders"]
       - Location: [specific locations]
       - Income: [specific income range]
       - Education: [education level]
       - Occupation: [specific occupation or industry]
       
       ### Psychographics
       - Values:
         • [Value 1]
         • [Value 2]
         • [Value 3]
       - Goals:
         • [Goal 1]
         • [Goal 2]
         • [Goal 3]
       - Challenges:
         • [Challenge 1]
         • [Challenge 2]
         • [Challenge 3]
       
       ### Pain Points
       - [Pain point 1]
       - [Pain point 2]
       - [Pain point 3]
       
       ### Desired Outcomes
       - [Desired outcome 1]
       - [Desired outcome 2]
       - [Desired outcome 3]
    
    3. ## Primary Struggles & Jobs To Be Done
       - [Struggle 1]
       - [Struggle 2]
       - [Struggle 3]
       
       ### Jobs To Be Done
       - [Job 1]
       - [Job 2]
       - [Job 3]
    
    4. ## Transformation Path
       ### Zero State (Current Frustration)
       [Description of current state]
       
       ### Hero State (Desired Outcome)
       [Description of desired state]
       
       ### Steps Between States
       1. [Step 1]
       2. [Step 2]
       3. [Step 3]
    
    5. ## Immediate Action Plan
       ### This Week
       1. [Action 1]
       2. [Action 2]
       3. [Action 3]
       
       ### 30-Day Plan
       1. [Milestone 1]
       2. [Milestone 2]
       3. [Milestone 3]
    
    6. ## Sample Engagement Post
       [Sample social media post that encapsulates the transformation]
    
    7. ## Why This Works
       - Clarity: [How the messaging simplifies complex ideas]
       - Emotional Resonance: [How it connects with audience feelings]
       - Actionability: [How it provides clear next steps]
       - Consistency: [How it creates a cohesive messaging strategy]
    
    IMPORTANT: Replace all placeholder text (like [Value 1]) with specific, detailed content based on the target audience and niche. Be detailed and specific rather than generic. Use the exact headers and structure provided above. Make sure to follow the format exactly, as this will be parsed by a system.
    
    Return the output as a complete, human-sounding breakdown that mirrors real-life client language. Use specific, motivational language tailored to the context. Avoid generic terms and speak directly to the specific audience needs.`;

    // Call OpenAI
    console.log('Calling OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are a professional messaging strategist specializing in creating client profiles and marketing blueprints. You provide detailed, structured output following the exact format requested."
        },
        { 
          role: "user", 
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    console.log('OpenAI response received');
    const generatedText = response.choices[0]?.message?.content || '';

    return new Response(
      JSON.stringify({ generatedText }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
