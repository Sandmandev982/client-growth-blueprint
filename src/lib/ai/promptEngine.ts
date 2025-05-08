
import { clientProfilePrompt } from '../prompts/clientProfile';
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
    
    console.log('Calling Supabase Edge Function...');
    const response = await fetch('https://lrruxjftdzvwlbjfuiew.supabase.co/functions/v1/generate-blueprint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      console.error('Edge Function returned error:', response.status);
      const errorData = await response.text();
      console.error('Error details:', errorData);
      throw new Error(`Edge Function error: ${response.status} - ${errorData || 'Unknown error'}`);
    }
    
    const data = await response.json();
    const generatedText = data.generatedText || data.blueprint || '';
    
    if (!generatedText) {
      throw new Error('No blueprint text returned from Edge Function');
    }
    
    console.log('Edge Function call successful!');
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
    
    // Create a mock response for development/debugging
    console.warn('Using mock blueprint data for testing');
    return `## Preliminary Transformation Statement
Tanita Brunson helps ambitious parents of young children (ages 3-5) develop their child's full potential through proven early cognitive development techniques that prepare them for academic excellence and future leadership roles.

## Ideal Client Avatar

### Demographics
- Age: 30-45
- Gender: All genders, primarily parents and guardians
- Location: Urban and suburban areas with competitive educational environments
- Income: $75,000+ household income
- Education: College educated, often with advanced degrees
- Occupation: Professionals, executives, entrepreneurs, educators

### Psychographics
- Values:
  • Educational excellence and achievement
  • Early childhood development and potential
  • Preparation for future success
  • Structured learning approaches
  • Research-based parenting techniques

- Goals:
  • Ensure their child enters kindergarten ahead of peers
  • Develop their child's full intellectual potential
  • Raise children who will become future leaders
  • Create a structured learning environment at home
  • Balance academic development with emotional intelligence

- Challenges:
  • Limited knowledge about effective early childhood development techniques
  • Uncertainty about age-appropriate learning activities
  • Difficulty balancing work demands with quality parenting time
  • Concerns about pushing too hard versus not challenging enough
  • Comparison anxiety with other children/parents

### Pain Points
- Fear their child might fall behind developmentally
- Overwhelmed by contradictory parenting advice
- Guilt over not doing enough for their child's development
- Uncertainty about which skills to prioritize at ages 3-5
- Difficulty measuring progress in young children

### Desired Outcomes
- A confident child who excels academically and socially
- Clear understanding of developmental milestones and how to achieve them
- Practical, implementable strategies that fit into busy family life
- Evidence of progress and development they can see
- Reduced anxiety about their child's future academic success

## Primary Struggles & Jobs To Be Done

- Identifying which developmental activities will have the greatest impact for their specific child
- Converting limited daily interaction time into maximum developmental benefit
- Understanding the connection between early activities and future leadership capabilities
- Creating a structured learning environment without causing stress or burnout
- Balancing cognitive development with social-emotional growth

### Jobs To Be Done
- Develop a customized learning plan appropriate for their 3-5 year old
- Learn effective teaching techniques they can implement at home
- Establish metrics to track their child's cognitive development
- Create daily routines that incorporate educational activities
- Balance structured learning with play-based development

## Transformation Path

### Zero State (Current Frustration)
Parents feel overwhelmed and anxious about their child's development, randomly trying activities with no clear strategy. They see other children progressing and worry their own child might be falling behind, creating stress for both parent and child. They lack confidence in their ability to effectively foster their child's cognitive development.

### Hero State (Desired Outcome)
Parents confidently implement a structured, age-appropriate development plan tailored to their child's unique needs. They observe measurable progress in cognitive abilities, social skills, and emotional regulation. Their child demonstrates advanced capabilities that prepare them for academic excellence and leadership roles, while maintaining a healthy, balanced childhood experience.

### Steps Between States
1. Assessment and awareness of their child's current developmental stage and unique learning style
2. Mastery of evidence-based techniques specifically designed for ages 3-5
3. Implementation of consistent daily routines that balance structured learning with play
4. Measurement and celebration of specific developmental milestones
5. Adaptation and advancement of techniques as the child grows and develops

## Immediate Action Plan

### This Week
1. Assess your child's current cognitive development using the provided toolkit
2. Implement one 15-minute structured learning activity daily
3. Begin the "Leader's Library" routine with 3 leadership-focused children's books
4. Document observations about your child's learning style and preferences

### 30-Day Plan
1. Establish a consistent morning "brain activation" routine
2. Complete the full developmental assessment and create a personalized learning pathway
3. Master the core teaching techniques through the parent training modules
4. Implement the balanced daily schedule that integrates cognitive, physical, and emotional development
5. Measure and document progress across key developmental metrics

## Sample Engagement Post

📚 PARENTS: Are you raising a future leader or just hoping for the best? 

The truth is, leadership skills don't magically appear in adulthood—they're developed from ages 3-5 when your child's brain is forming crucial neural connections.

I recently worked with Jessica, a busy executive who worried her 4-year-old daughter wasn't being adequately prepared for the competitive school environment ahead. Using our structured development approach, her daughter showed remarkable progress in just 6 weeks:

✅ Vocabulary increased by 35%
✅ Problem-solving abilities advanced 18 months beyond age level
✅ Confidence in group settings dramatically improved

The key wasn't more time (Jessica still works 50+ hours weekly), but STRATEGIC time—15-minute daily activities specifically designed to develop leadership pathways in the developing brain.

Want to learn our 3-step process for turning everyday moments into leadership development opportunities? Comment "LEADER" below and I'll share our quickstart guide that's helped hundreds of parents raise exceptional children while actually REDUCING daily stress.

#RaisingLeaders #ChildDevelopment #ParentingWithPurpose

## Why This Works

- Clarity: The messaging cuts through the noise of generic parenting advice by focusing specifically on cognitive development for ages 3-5 with clear, actionable steps parents can implement immediately.

- Emotional Resonance: The content addresses the deep anxieties parents feel about their child's future success, providing both empathy for their concerns and concrete solutions to alleviate them.

- Actionability: Rather than vague concepts, parents receive specific techniques, schedules, and measurable outcomes they can implement within their existing routines.

- Consistency: The transformation narrative from overwhelmed parent to confident developer of young minds creates a coherent framework that builds trust and demonstrates expertise in early childhood development.`;
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
