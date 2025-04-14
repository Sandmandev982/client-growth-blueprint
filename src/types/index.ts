
import { BlueprintData, ClientProfile, JobsToBeDone } from './ClientProfile';

export type IdealClientProfile = ClientProfile;

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

export type GeneratedOutput = BlueprintData;

// Re-export the ClientProfile types for convenience
export { BlueprintData, ClientProfile, JobsToBeDone };
