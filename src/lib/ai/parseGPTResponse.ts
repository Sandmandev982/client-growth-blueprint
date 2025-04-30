
import { BlueprintData, ClientProfile, JobsToBeDone, TransformationPath } from '@/types/ClientProfile';
import { extractSection, extractList, extractListFromSection } from './extractors';

export function parseGPTResponse(markdownResponse: string): BlueprintData {
  try {
    console.log('Parsing GPT response');
    
    // Extract all sections from the markdown response
    const preliminaryTransformation = extractSection(markdownResponse, "Preliminary Transformation Statement");
    
    // Parse Ideal Client Profile
    const idealClientProfile: ClientProfile = {
      demographics: {
        age: extractSection(markdownResponse, "Demographics", "Age") || 
             extractSection(markdownResponse, "Ideal Client Avatar", "Age") || 
             "Not specified",
        gender: extractSection(markdownResponse, "Demographics", "Gender") || 
                extractSection(markdownResponse, "Ideal Client Avatar", "Gender") || 
                "Not specified",
        location: extractSection(markdownResponse, "Demographics", "Location") || 
                  extractSection(markdownResponse, "Ideal Client Avatar", "Location") || 
                  "Not specified",
        income: extractSection(markdownResponse, "Demographics", "Income") || 
                extractSection(markdownResponse, "Ideal Client Avatar", "Income") || 
                "Not specified",
        education: extractSection(markdownResponse, "Demographics", "Education") || 
                   extractSection(markdownResponse, "Ideal Client Avatar", "Education") || 
                   "Not specified",
        occupation: extractSection(markdownResponse, "Demographics", "Occupation") || 
                    extractSection(markdownResponse, "Ideal Client Avatar", "Occupation") || 
                    "Not specified",
      },
      psychographics: {
        values: extractList(markdownResponse, "Psychographics", "Values") || 
                extractList(markdownResponse, "Ideal Client Avatar", "Values") || 
                ["Not specified"],
        interests: extractList(markdownResponse, "Psychographics", "Interests") || 
                   extractList(markdownResponse, "Ideal Client Avatar", "Interests") || 
                   ["Not specified"],
        goals: extractList(markdownResponse, "Psychographics", "Goals") || 
               extractList(markdownResponse, "Ideal Client Avatar", "Goals") || 
               ["Not specified"],
        challenges: extractList(markdownResponse, "Psychographics", "Challenges") || 
                    extractList(markdownResponse, "Ideal Client Avatar", "Challenges") || 
                    ["Not specified"],
        motivations: extractList(markdownResponse, "Psychographics", "Motivations") || 
                     extractList(markdownResponse, "Ideal Client Avatar", "Motivations") || 
                     ["Not specified"],
      },
      painPoints: extractList(markdownResponse, "Ideal Client Avatar", "Pain Points") || 
                  extractList(markdownResponse, "Pain Points", "Pain Points") || 
                  ["Not specified"],
      desiredOutcomes: extractList(markdownResponse, "Ideal Client Avatar", "Desired Outcomes") || 
                       extractList(markdownResponse, "Desired Outcomes", "Desired Outcomes") || 
                       ["Not specified"]
    };
    
    // Parse Jobs To Be Done
    const jobsToBeDone: JobsToBeDone = {
      struggles: extractList(markdownResponse, "Primary Struggles", "Struggles") || 
                 ["Not specified"],
      jobs: extractList(markdownResponse, "Jobs To Be Done", "Jobs") || 
            ["Not specified"],
      marketingAngle: extractSection(markdownResponse, "Transformation Path") || 
                      "Not specified"
    };
    
    // Parse Transformation Path
    const transformationPath: TransformationPath = {
      zeroState: extractSection(markdownResponse, "Transformation Path", "Zero State") || 
                 "Not specified",
      heroState: extractSection(markdownResponse, "Transformation Path", "Hero State") || 
                 "Not specified",
      steps: extractList(markdownResponse, "Steps Between States", "Steps") || 
             ["Not specified"]
    };
    
    // Parse Immediate Action Plan
    const immediateActionPlan = {
      thisWeek: extractList(markdownResponse, "This Week", "Tasks") || 
                ["Not specified"],
      thirtyDayPlan: extractList(markdownResponse, "30-Day Plan", "Tasks") || 
                     ["Not specified"]
    };
    
    // Parse Sample Engagement Post
    const sampleEngagementPost = extractSection(markdownResponse, "Sample Engagement Post") || 
                                 "Not specified";
    
    // Parse Why This Works
    const whyThisWorks = {
      clarity: extractSection(markdownResponse, "Why This Works", "Clarity") || 
               "Not specified",
      emotionalResonance: extractSection(markdownResponse, "Why This Works", "Emotional Resonance") || 
                          "Not specified",
      actionability: extractSection(markdownResponse, "Why This Works", "Actionability") || 
                     "Not specified",
      consistency: extractSection(markdownResponse, "Why This Works", "Consistency") || 
                   "Not specified"
    };
    
    // Return the complete parsed blueprint
    return {
      preliminaryTransformation,
      idealClientProfile,
      jobsToBeDone,
      transformationPath,
      immediateActionPlan,
      sampleEngagementPost,
      whyThisWorks,
      rawText: markdownResponse
    };
  } catch (error) {
    console.error('Error parsing GPT response:', error);
    throw new Error('Failed to parse the AI-generated content');
  }
}
