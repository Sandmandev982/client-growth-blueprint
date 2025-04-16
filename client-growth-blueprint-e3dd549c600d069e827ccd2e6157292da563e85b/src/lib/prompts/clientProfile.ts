
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

1. Preliminary Transformation Statement (Unique Selling Proposition)
2. Ideal Client Avatar
   - Demographics (age, gender, location, income, education, occupation)
   - Psychographics (values, interests, goals, challenges, motivations)
   - Pain Points (specific frustrations and obstacles)
   - Desired Outcomes (tangible and emotional goals)
3. Primary Struggles & Jobs To Be Done
   - Key struggles that prevent progress
   - Specific jobs your client needs done
   - Strategic marketing angle
4. Transformation Path
   - Zero State (Current Frustration)
   - Hero State (Desired Outcome)
   - Steps between these states
5. Immediate Action Plan
   - This Week (3 specific actions)
   - 30-Day Plan (milestone goals)
6. Sample Engagement Post
   - A ready-to-use social media post highlighting transformation
7. Why This Works
   - Clarity (message simplification)
   - Emotional Resonance (connecting with feelings)
   - Actionability (clear next steps)
   - Consistency (cohesive messaging strategy)

Return the output as a complete, human-sounding breakdown that mirrors real-life client language. Do not speak in general terms. Speak with specificity and motivational tone.`;
};

export default clientProfilePrompt;
