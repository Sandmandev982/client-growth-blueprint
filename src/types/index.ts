export type IdealClientProfile = {
  demographics: {
    age: string;
    gender: string;
    location: string;
    education: string;
    income: string;
    occupation: string;
  };
  psychographics: {
    values: string[];
    interests: string[];
    goals: string[];
    challenges: string[];
    motivations: string[];
  };
};

export type JobsToBeDone = {
  struggles: string[];
  jobs: string[];
  marketingAngle: string;
};

export type MillionDollarMessage = {
  headline: string;
  problem: string;
  solution: string;
  differentiation: string;
  cta: string;
  whyItWorks: string;
};

export interface FormData {
  niche: string;
  audience: string;
  brandName: string;
  productOrService: string;
  style: string;
  tone: string;
  gdprConsent: boolean;
}

export type GeneratedOutput = {
  idealClientProfile: IdealClientProfile;
  jobsToBeDone: JobsToBeDone;
  millionDollarMessages: MillionDollarMessage[];
};
