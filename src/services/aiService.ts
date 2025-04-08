
import { createClient } from '@supabase/supabase-js';
import { OPENAI_API_KEY } from '../config/constants';
import { supabaseUrl, supabaseKey } from '../integrations/supabase/client';
import type { GeneratedOutput } from '../types';

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample function to generate client profile using OpenAI
export const generateClientProfile = async (data: any): Promise<GeneratedOutput> => {
  try {
    console.log("Generating client profile with data:", data);
    
    // Simulate OpenAI response for development
    return {
      idealClientProfile: {
        demographics: {
          ageRange: "30-50 years old",
          gender: "All genders",
          location: "Urban and suburban areas",
          income: "Middle to upper-middle class",
          education: "College educated",
          occupations: ["Entrepreneurs", "Business Owners", "Professionals"]
        },
        psychographics: {
          values: ["Growth", "Achievement", "Independence"],
          interests: ["Business Development", "Personal Growth", "Innovation"],
          challenges: ["Scaling their business", "Work-life balance", "Standing out in the market"]
        }
      },
      jobsToBeDone: {
        primaryStruggles: [
          "Difficulty converting expertise into scalable products",
          "Challenges with client acquisition and retention",
          "Overwhelm from wearing too many hats in the business"
        ],
        jobsToBeDone: [
          "Create systems to package expertise into digital products",
          "Develop a consistent marketing strategy that attracts ideal clients",
          "Build team structures that free up the owner's time"
        ],
        marketingAngle: "Position yourself as the trusted guide who helps experts transform their knowledge into scalable, profitable business systems."
      },
      millionDollarMessages: []
    };
  } catch (error) {
    console.error("Error generating client profile:", error);
    throw error;
  }
};

// Sample function to generate jobs to be done
export const generateJobsToBeDone = async (data: any) => {
  try {
    console.log("Generating jobs to be done with data:", data);
    
    // This is just for backward compatibility, we now include jobsToBeDone in the main response
    const response = await generateClientProfile(data);
    return response.jobsToBeDone;
  } catch (error) {
    console.error("Error generating jobs to be done:", error);
    throw error;
  }
};
