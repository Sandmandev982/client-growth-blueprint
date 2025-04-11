
/**
 * Client Growth Blueprint Prompt Schema
 * 
 * This schema defines the structure for generating a comprehensive
 * Client Growth Blueprint with 7 specific sections.
 */

export const clientProfilePrompt = (data: {
  niche: string;
  audience: string;
  brand: string;
  product: string;
  style: string;
  tone: string;
}) => {
  return `You are a messaging strategist for ${data.niche || 'online course creators'}. 
  
Given the following input:

- Target Audience: ${data.audience || 'professionals looking to scale their expertise'}
- Brand: ${data.brand || 'expert-focused coaching business'}
- Product/Service: ${data.product || 'knowledge-based products and services'}
- Style Preference: ${data.style || 'professional but approachable'}
- Tone: ${data.tone || 'motivational and clear'}

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

IMPORTANT: Replace all placeholder text (like [Value 1]) with specific, detailed content based on the target audience and niche. Be detailed and specific rather than generic. Use the exact headers and structure provided above.

Return the output as a complete, human-sounding breakdown that mirrors real-life client language. Use specific, motivational language tailored to the context. Avoid generic terms and speak directly to the specific audience needs.`;
};

export default clientProfilePrompt;
