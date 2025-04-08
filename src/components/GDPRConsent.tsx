
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface GDPRConsentProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  required?: boolean;
}

const GDPRConsent: React.FC<GDPRConsentProps> = ({ 
  checked, 
  onCheckedChange,
  required = true 
}) => {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox 
        id="gdpr-consent" 
        checked={checked} 
        onCheckedChange={onCheckedChange}
        required={required}
        className="mt-1"
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor="gdpr-consent"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {required && <span className="text-red-500 mr-1">*</span>}
          I consent to having my information processed
        </Label>
        <p className="text-xs text-muted-foreground">
          By checking this box, you agree to allow us to process your data for the purpose
          of delivering your Client Growth Blueprint. We'll never share your information with
          third parties without your consent. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default GDPRConsent;
