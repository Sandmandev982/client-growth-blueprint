
import type { BlueprintData, ClientProfile, JobsToBeDone } from './ClientProfile';

export type IdealClientProfile = ClientProfile;

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

// Re-export the ClientProfile types
export type { BlueprintData, ClientProfile, JobsToBeDone };
