
import type { GeneratedOutput } from '../../types';
import { extractSection, extractList, extractListFromSection } from './extractors';

/**
 * Parse the generated markdown blueprint into structured data
 */
export function parseGeneratedBlueprint(markdownText: string): GeneratedOutput {
  try {
    console.log('Parsing blueprint text');
    
    // Parse the markdown text to extract structured data
    const output: GeneratedOutput = {
      preliminaryTransformation: extractSection(markdownText, "Preliminary Transformation Statement"),
      idealClientProfile: {
        demographics: {
          age: extractSection(markdownText, "Demographics", "Age") || 
               extractSection(markdownText, "Ideal Client Avatar", "Age") || 
               "Not specified",
          gender: extractSection(markdownText, "Demographics", "Gender") || 
                 extractSection(markdownText, "Ideal Client Avatar", "Gender") || 
                 "Not specified",
          location: extractSection(markdownText, "Demographics", "Location") || 
                   extractSection(markdownText, "Ideal Client Avatar", "Location") || 
                   "Not specified",
          income: extractSection(markdownText, "Demographics", "Income") || 
                 extractSection(markdownText, "Ideal Client Avatar", "Income") || 
                 "Not specified",
          education: extractSection(markdownText, "Demographics", "Education") || 
                    extractSection(markdownText, "Ideal Client Avatar", "Education") || 
                    "Not specified",
          occupation: extractSection(markdownText, "Demographics", "Occupation") || 
                     extractSection(markdownText, "Ideal Client Avatar", "Occupation") || 
                     "Not specified",
        },
        psychographics: {
          values: extractList(markdownText, "Psychographics", "Values") || 
                 extractList(markdownText, "Ideal Client Avatar", "Values") || 
                 ["Not specified"],
          interests: extractList(markdownText, "Psychographics", "Interests") || 
                    extractList(markdownText, "Ideal Client Avatar", "Interests") || 
                    ["Not specified"],
          goals: extractList(markdownText, "Psychographics", "Goals") || 
                extractList(markdownText, "Ideal Client Avatar", "Goals") || 
                ["Not specified"],
          challenges: extractList(markdownText, "Psychographics", "Challenges") || 
                     extractList(markdownText, "Ideal Client Avatar", "Challenges") || 
                     ["Not specified"],
          motivations: extractList(markdownText, "Psychographics", "Motivations") || 
                      extractList(markdownText, "Ideal Client Avatar", "Motivations") || 
                      ["Not specified"],
        },
        painPoints: extractListFromSection(markdownText, "Pain Points", 3) || ["Not specified"],
        desiredOutcomes: extractListFromSection(markdownText, "Desired Outcomes", 3) || ["Not specified"]
      },
      jobsToBeDone: {
        struggles: extractListFromSection(markdownText, "Primary Struggles", 3) || 
                  extractListFromSection(markdownText, "Key Struggles", 3) ||
                  extractListFromSection(markdownText, "Pain Points", 3) ||
                  ["Not specified"],
        jobs: extractListFromSection(markdownText, "Jobs To Be Done", 3) || 
              ["Not specified"],
        marketingAngle: extractSection(markdownText, "Transformation Path") || 
                        extractSection(markdownText, "Strategic Marketing Angle") ||
                        "Not specified"
      },
      transformationPath: {
        zeroState: extractSection(markdownText, "Transformation Path", "Zero State") || "Not specified",
        heroState: extractSection(markdownText, "Transformation Path", "Hero State") || "Not specified",
        steps: extractListFromSection(markdownText, "Steps Between States", 5) || ["Not specified"]
      },
      immediateActionPlan: {
        thisWeek: extractListFromSection(markdownText, "This Week", 3) || ["Not specified"],
        thirtyDayPlan: extractListFromSection(markdownText, "30-Day Plan", 3) || ["Not specified"]
      },
      sampleEngagementPost: extractSection(markdownText, "Sample Engagement Post") || "Not specified",
      whyThisWorks: {
        clarity: extractSection(markdownText, "Why This Works", "Clarity") || "Not specified",
        emotionalResonance: extractSection(markdownText, "Why This Works", "Emotional Resonance") || "Not specified",
        actionability: extractSection(markdownText, "Why This Works", "Actionability") || "Not specified",
        consistency: extractSection(markdownText, "Why This Works", "Consistency") || "Not specified"
      },
      rawText: markdownText
    };
    
    return output;
  } catch (error) {
    console.error('Error parsing generated blueprint:', error);
    throw new Error('Failed to parse generated content. Please try again.');
  }
}
