
import { FormData, GeneratedOutput, IdealClientProfile, JobsToBeDone, MillionDollarMessage } from "../types";
import { supabase } from "../integrations/supabase/client";

// Currently using mock data until we connect to the actual AI service
export const generateClientProfile = async (formData: FormData): Promise<GeneratedOutput> => {
  console.log("Generating client profile with data:", formData);
  
  // In a real implementation, this would be an API call to an AI service
  // For now, we'll return mock data
  
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Mock data response
  const idealClientProfile: IdealClientProfile = {
    demographics: {
      age: "35-50",
      gender: "Mixed (60% Female, 40% Male)",
      location: "Urban areas, primarily in North America",
      education: "Bachelor's degree or higher",
      income: "$75,000 - $150,000 annually",
      occupation: "Entrepreneurs, business owners, or senior managers"
    },
    psychographics: {
      values: ["Growth", "Excellence", "Innovation", "Impact", "Freedom"],
      interests: ["Business development", "Personal growth", "Technology", "Networking", "Industry trends"],
      goals: ["Scale their business", "Increase their market reach", "Improve work-life balance", "Be recognized as a leader in their field"],
      challenges: ["Limited time", "Market saturation", "Finding quality talent", "Standing out from competitors"],
      motivations: ["Financial freedom", "Making a difference", "Recognition", "Building a legacy"]
    }
  };
  
  const jobsToBeDone: JobsToBeDone = {
    struggles: [
      "Difficulty attracting high-quality clients consistently",
      "Unclear messaging that fails to differentiate from competitors",
      "Ineffective marketing strategies that waste time and money"
    ],
    jobs: [
      "Create a clear, compelling brand message that resonates with ideal clients",
      "Develop a systematic approach to generate qualified leads",
      "Establish themselves as the go-to authority in their niche"
    ],
    marketingAngle: "Position yourself as the expert who helps ambitious entrepreneurs attract premium clients through strategic messaging, without resorting to pushy tactics or constant content creation."
  };
  
  const millionDollarMessages: MillionDollarMessage[] = [
    {
      headline: "From Invisible to In-Demand: How Established Experts Can Attract Premium Clients",
      problem: "You've built valuable expertise and deliver excellent results, but you're still struggling to attract the right clients consistently. Generic marketing advice doesn't work for your specialized business, leaving you frustrated and your potential untapped.",
      solution: `${formData.brandName}'s ${formData.productOrService} helps you develop a crystal-clear message that resonates with your ideal clients and positions you as the obvious choice in your market.`,
      differentiation: `Unlike general marketing strategies, our approach is specifically designed for ${formData.niche} professionals who want to attract serious, committed clients without compromising their integrity or following trends that don't fit their business.`,
      cta: `Book a Strategy Call: Discover how ${formData.brandName} can help you transform your client acquisition process and build a sustainable pipeline of ideal clients.`,
      whyItWorks: "This message directly addresses the frustration of having expertise but lacking visibility, while emphasizing both the emotional (recognition, confidence) and practical (more clients, better income) benefits of solving this problem."
    },
    {
      headline: "Stop Chasing Clients: Become the Go-To Authority in Your Field",
      problem: "Despite your expertise and track record of results, you find yourself constantly hunting for new business opportunities. You're tired of competing on price and explaining why your services are worth the investment.",
      solution: `${formData.brandName}'s proven ${formData.productOrService} transforms how potential clients see you, creating a positioning strategy that naturally attracts the right clients to you.`,
      differentiation: `We don't offer generic marketing tactics. Our approach is built specifically for ${formData.audience} who want to build a reputation that does their marketing for them, creating demand instead of chasing it.`,
      cta: `Download Our Free Guide: "The Authority Advantage" and discover the first steps to positioning yourself as the clear choice in your market.`,
      whyItWorks: "This message taps into the desire for recognition and respect while addressing the frustration of having to constantly prove your value. It promises a fundamental shift from pursuing clients to attracting them naturally."
    },
    {
      headline: "The Client Attraction Blueprint: Build a Business That Generates Demand",
      problem: "You've mastered your craft but not the art of attracting clients. Your current marketing feels inconsistent and your message gets lost in the noise, leaving potential clients unclear about why they should choose you.",
      solution: `${formData.brandName}'s ${formData.productOrService} provides a clear framework to articulate your unique value and create messaging that resonates deeply with your ideal clients.`,
      differentiation: `While others offer tactical marketing tips, we focus on strategic positioning and message clarity that works specifically for ${formData.audience}. Our approach creates a foundation that makes all your marketing more effective.`,
      cta: `Join Our Upcoming Webinar: "From Expertise to Influence" and learn the three key shifts that will transform how prospects see your business.`,
      whyItWorks: "This message focuses on the fundamental problems of unclear positioning and inconsistent client attraction, promising a systematic solution rather than just tactics. It appeals to the desire for a sustainable, reliable approach to growth."
    }
  ];
  
  // Save to Supabase
  try {
    const { data, error } = await supabase
      .from('generated_profiles')
      .insert([
        { 
          user_id: 'anonymous', // In a real app, use authenticated user's ID
          form_data: formData,
          ideal_client_profile: idealClientProfile,
          jobs_to_be_done: jobsToBeDone,
          million_dollar_messages: millionDollarMessages,
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Error saving to Supabase:', error);
    } else {
      console.log('Successfully saved to Supabase:', data);
    }
  } catch (err) {
    console.error('Exception when saving to Supabase:', err);
  }
  
  return {
    idealClientProfile,
    jobsToBeDone,
    millionDollarMessages
  };
};
