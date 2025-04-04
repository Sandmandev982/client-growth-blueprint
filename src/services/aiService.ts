
import { FormData, GeneratedOutput } from "../types";

// This would normally use the OpenAI API directly
// For now, we'll simulate responses for demonstration
export const generateClientProfile = async (formData: FormData): Promise<GeneratedOutput> => {
  console.log("Generating content for:", formData);
  
  // In a production app, this would make an actual API call to OpenAI
  // For this demo, we'll return mock data based on the form inputs
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const idealClientProfile = {
    demographics: {
      age: formData.niche.includes("tech") ? "25-40" : "30-55",
      gender: "All genders",
      location: "Urban and suburban areas",
      education: "Bachelor's degree or higher",
      income: formData.niche.includes("luxury") ? "$100,000+" : "$60,000+",
      occupation: "Professionals, entrepreneurs, and executives",
    },
    psychographics: {
      values: [
        "Growth and learning",
        "Excellence",
        "Innovation",
        "Work-life balance",
        "Impact and purpose"
      ],
      interests: [
        "Personal development",
        "Technology trends",
        "Business growth",
        "Industry innovation",
        "Wellness and mindfulness"
      ],
      goals: [
        "Professional advancement",
        "Business growth",
        "Work-life harmony",
        "Greater impact in their field",
        "Financial freedom"
      ],
      challenges: [
        "Information overload",
        "Time management",
        "Decision fatigue",
        "Finding effective solutions",
        "Balancing quality and efficiency"
      ],
      motivations: [
        "Recognition and success",
        "Making a difference",
        "Security and stability",
        "Personal fulfillment",
        "Freedom and flexibility"
      ]
    }
  };
  
  const jobsToBeDone = {
    struggles: [
      `Finding reliable ${formData.productOrService} solutions that deliver real results`,
      `Identifying ${formData.productOrService} providers that understand their specific needs`,
      `Balancing quality and cost when selecting ${formData.productOrService}`
    ],
    jobs: [
      `Implement a ${formData.productOrService} solution that delivers measurable ROI`,
      `Find a trustworthy provider for ${formData.productOrService} that understands their industry`,
      `Integrate ${formData.productOrService} seamlessly into existing operations`
    ],
    marketingAngle: `${formData.brandName} helps ${formData.audience} achieve better results with less effort through our innovative ${formData.productOrService} approach.`
  };
  
  const millionDollarMessages = [
    {
      headline: `The ${formData.audience} Success Blueprint`,
      problem: `Most ${formData.audience} struggle to get consistent results from their ${formData.niche} efforts, leading to wasted time and resources.`,
      solution: `${formData.brandName}'s ${formData.productOrService} provides a proven framework that delivers predictable outcomes without the guesswork.`,
      differentiation: `Unlike generic solutions, our approach is specifically designed for ${formData.audience} in the ${formData.niche} space, with 97% of clients seeing results within 30 days.`,
      cta: `Book your strategy call today to discover how we can transform your ${formData.niche} results in just weeks.`,
      whyItWorks: `This message addresses the pain point of inconsistent results, offers a specific solution tailored to the audience, differentiates with industry specificity and data points, and provides a clear next step.`
    },
    {
      headline: `Revolutionize Your ${formData.niche} Approach`,
      problem: `In today's competitive landscape, ${formData.audience} can no longer afford the traditional ${formData.niche} methods that drain resources and deliver unpredictable outcomes.`,
      solution: `${formData.brandName} offers a cutting-edge ${formData.productOrService} that streamlines your process while maximizing impact.`,
      differentiation: `Our proprietary methodology has helped over 200 ${formData.audience} increase their effectiveness by an average of 43% within the first quarter.`,
      cta: `Download our free case study to see exactly how we transformed results for a ${formData.audience} just like you.`,
      whyItWorks: `This message creates urgency around the changing landscape, presents a modern solution, backs claims with specific results, and offers a low-risk first step for engagement.`
    },
    {
      headline: `The ${formData.audience}'s Ultimate ${formData.niche} Advantage`,
      problem: `Many ${formData.audience} feel overwhelmed by conflicting advice and complex strategies in the ${formData.niche} space, leaving them paralyzed by indecision.`,
      solution: `${formData.brandName} cuts through the noise with our simplified yet powerful ${formData.productOrService} designed specifically for busy professionals who need results, not more complexity.`,
      differentiation: `We're the only provider that combines deep ${formData.niche} expertise with a satisfaction guarantee - if you don't see improvement in 60 days, you don't pay.`,
      cta: `Join our upcoming webinar to discover the 3 hidden factors blocking your ${formData.niche} success and how to overcome them.`,
      whyItWorks: `This message resonates with overwhelmed professionals, offers simplicity as a benefit, provides risk reversal with a guarantee, and gives an educational opportunity as the entry point.`
    }
  ];
  
  return {
    idealClientProfile,
    jobsToBeDone,
    millionDollarMessages
  };
};
