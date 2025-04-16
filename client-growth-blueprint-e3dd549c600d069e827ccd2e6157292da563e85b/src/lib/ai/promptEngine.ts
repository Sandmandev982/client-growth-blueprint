
import { OPENAI_API_KEY } from '../../config/constants';
import { clientProfilePrompt } from '../prompts/clientProfile';
import type { GeneratedOutput } from '../../types';

/**
 * AI Prompt Engine
 * Handles communication with OpenAI API to generate client growth blueprints
 */

export async function generateClientBlueprint(formData: {
  niche: string;
  audience: string;
  brand: string;
  product: string;
  style: string;
  tone: string;
}): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    // In a real implementation, this would make an actual API call
    // For now, we'll use a mock implementation until we connect to OpenAI
    console.log('Generating blueprint with data:', formData);
    console.log('Using prompt:', clientProfilePrompt(formData));
    
    // Mock response for development - In production, this would call the OpenAI API
    const mockResponse = `
# Client Growth Blueprint

## 1. Preliminary Transformation Statement
Transform your expertise into a scalable, profitable business system that attracts premium clients while giving you back your time.

## 2. Ideal Client Avatar

### Demographics
- Age: 35-50 years old
- Gender: All genders (slight female majority)
- Location: Urban and suburban areas
- Income: $80,000-$250,000+
- Education: Bachelor's degree or higher
- Occupation: Consultants, coaches, service professionals, subject matter experts

### Psychographics
- Values: Freedom, impact, recognition, growth, quality
- Interests: Business development, personal growth, innovation, efficiency
- Goals: Scale their business, create passive income streams, establish thought leadership
- Challenges: Time constraints, pricing insecurities, inconsistent client acquisition
- Motivations: Financial freedom, greater impact, recognition in their field

### Pain Points
- Working too many hours for insufficient income
- Trapped in the time-for-money cycle
- Struggling to stand out in a crowded market
- Inability to take vacations without business suffering
- Feeling overwhelmed by marketing demands

### Desired Outcomes
- A systematic business that can run without constant oversight
- Consistent, predictable client acquisition
- Premium positioning that justifies higher rates
- More free time with family while maintaining or increasing income
- Recognition as an authority in their field

## 3. Primary Struggles & Jobs To Be Done

### Key Struggles
- Difficulty converting expertise into scalable products
- Challenges with client acquisition and retention
- Overwhelm from wearing too many hats in the business
- Inconsistent messaging that fails to differentiate
- Inability to escape the hourly billing trap

### Jobs To Be Done
- Create systems to package expertise into digital products
- Develop a consistent marketing strategy that attracts ideal clients
- Build team structures that free up the owner's time
- Craft a compelling brand story that justifies premium rates
- Implement automation to reduce administrative burden

### Strategic Marketing Angle
Position yourself as the trusted guide who helps experts transform their knowledge into scalable, profitable business systems that attract premium clients while giving them back their time.

## 4. Transformation Path

### Zero State (Current Frustration)
Overworked expert trapped in the time-for-money cycle, constantly hustling for the next client, undercharging for their expertise, and missing out on family time and self-care.

### Hero State (Desired Outcome)
Recognized authority with multiple income streams, a waitlist of premium clients, efficient systems run by a small team, and the freedom to take vacations while the business continues to thrive.

### Steps Between States
1. Clarity: Define signature framework and ideal client
2. Systemization: Document processes and create repeatable systems
3. Packaging: Develop premium offerings at multiple price points
4. Positioning: Craft thought leadership content to establish authority
5. Automation: Implement tech stack to reduce administrative burden
6. Team Building: Delegate non-essential tasks to capable team members
7. Scaling: Expand reach through strategic partnerships and referral systems

## 5. Immediate Action Plan

### This Week
1. Document your current client transformation process (even if informal)
2. Identify your three most profitable projects/clients from the past year
3. Record a 3-minute video explaining your unique approach to client results

### 30-Day Plan
1. Create your signature framework one-page visual
2. Develop a content calendar focused on your top 5 client pain points
3. Raise your rates by at least 20% for all new clients
4. Identify 3 tasks to outsource immediately
5. Schedule 2 strategic partnership conversations

## 6. Sample Engagement Post

"Are you tired of trading time for money in your expertise-based business? 

One of my clients, Sarah, was billing 50+ hours weekly as a marketing consultant but still couldn't break six figures. After implementing our Expertise Elevation Framework, she now:
- Works with 5 premium clients (instead of 15 budget clients)
- Generated $28K from her first digital product launch
- Takes Fridays off completely

The difference? She stopped selling her TIME and started selling her EXPERTISE SYSTEM.

If you're ready to stop being the best-kept secret in your industry and start getting paid what you're worth, tap the link in my bio to grab my "Premium Positioning Playbook" - it's the exact 3-step process Sarah used to double her income while working fewer hours."

## 7. Why This Works

### Clarity
This strategy simplifies complex business growth into a step-by-step transformation path that feels achievable. By focusing on the expertise your client already possesses, we remove the intimidation of creating something "new" and instead focus on packaging existing knowledge.

### Emotional Resonance
The messaging directly addresses the frustration of being undervalued and overworked—feelings that deeply resonate with expertise-based business owners. The promise of recognition and freedom connects with their core desires beyond just making more money.

### Actionability
Each section provides specific, doable next steps rather than vague advice. The immediate action plan gives them momentum-building wins they can implement today, while the 30-day plan creates sustainable progress.

### Consistency
This messaging framework creates cohesion across all client touchpoints—from social media to sales calls. The transformation story remains consistent, building credibility and trust through repeated, reinforced messaging about the path from overwhelm to freedom.
`;

    // In production, this would be:
    // const response = await openai.completions.create({...})
    
    return mockResponse;
  } catch (error) {
    console.error('Error generating client blueprint:', error);
    throw new Error('Failed to generate client blueprint. Please try again.');
  }
}

// Function to parse the generated markdown into structured data
export function parseGeneratedBlueprint(markdownText: string): GeneratedOutput {
  try {
    // This is a simplified parser for demonstration
    // In production, you would use a more robust markdown parser
    
    // For now, we'll return a mock structured output
    return {
      idealClientProfile: {
        demographics: {
          age: "35-50 years old",
          gender: "All genders (slight female majority)",
          location: "Urban and suburban areas",
          income: "$80,000-$250,000+",
          education: "Bachelor's degree or higher",
          occupation: "Consultants, coaches, service professionals, subject matter experts"
        },
        psychographics: {
          values: ["Freedom", "Impact", "Recognition", "Growth", "Quality"],
          interests: ["Business development", "Personal growth", "Innovation", "Efficiency"],
          goals: ["Scale their business", "Create passive income streams", "Establish thought leadership"],
          challenges: ["Time constraints", "Pricing insecurities", "Inconsistent client acquisition"],
          motivations: ["Financial freedom", "Greater impact", "Recognition in their field"]
        }
      },
      jobsToBeDone: {
        struggles: [
          "Difficulty converting expertise into scalable products",
          "Challenges with client acquisition and retention",
          "Overwhelm from wearing too many hats in the business"
        ],
        jobs: [
          "Create systems to package expertise into digital products",
          "Develop a consistent marketing strategy that attracts ideal clients",
          "Build team structures that free up the owner's time"
        ],
        marketingAngle: "Position yourself as the trusted guide who helps experts transform their knowledge into scalable, profitable business systems."
      },
      millionDollarMessages: []
    };
  } catch (error) {
    console.error('Error parsing generated blueprint:', error);
    throw new Error('Failed to parse generated content.');
  }
}
