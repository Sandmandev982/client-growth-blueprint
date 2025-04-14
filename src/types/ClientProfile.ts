
export interface Demographics {
  age: string;
  gender: string;
  location: string;
  education: string;
  income: string;
  occupation: string;
}

export interface Psychographics {
  values: string[];
  interests: string[];
  goals: string[];
  challenges: string[];
  motivations: string[];
}

export interface ClientProfile {
  demographics: Demographics;
  psychographics: Psychographics;
  painPoints: string[];
  desiredOutcomes: string[];
}

export interface TransformationPath {
  zeroState: string;
  heroState: string;
  steps: string[];
}

export interface JobsToBeDone {
  struggles: string[];
  jobs: string[];
  marketingAngle: string;
}

export interface BlueprintData {
  preliminaryTransformation: string;
  idealClientProfile: ClientProfile;
  jobsToBeDone: JobsToBeDone;
  transformationPath: TransformationPath;
  immediateActionPlan: {
    thisWeek: string[];
    thirtyDayPlan: string[];
  };
  sampleEngagementPost: string;
  whyThisWorks: {
    clarity: string;
    emotionalResonance: string;
    actionability: string;
    consistency: string;
  };
  rawText: string;
}
