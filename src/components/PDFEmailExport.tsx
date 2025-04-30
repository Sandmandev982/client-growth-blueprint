
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import GDPRConsent from './GDPRConsent';
import type { GeneratedOutput } from '@/types';
import { saveLeadToDatabase } from '../services/aiService';

interface PDFEmailExportProps {
  generatedOutput: GeneratedOutput | null;
  blueprintText: string;
}

const PDFEmailExport: React.FC<PDFEmailExportProps> = ({ 
  generatedOutput, 
  blueprintText 
}) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!consent) {
      toast.error('Please provide consent to process your data');
      return;
    }

    if (!generatedOutput) {
      toast.error('No data to export');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase
      await saveLeadToDatabase(email, generatedOutput, blueprintText);
      toast.success('Success! Your VBF Process results have been sent to your email.');
      
      // Reset form
      setEmail('');
      setConsent(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to send results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-card">
      <h3 className="text-lg font-medium mb-4">Export Your VBF Process Results</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm">
            <span className="text-red-500 mr-1">*</span>
            Email Address
          </Label>
          <Input 
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            We'll send your complete VBF Process results to this email address.
          </p>
        </div>

        <GDPRConsent 
          checked={consent}
          onCheckedChange={setConsent}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !email || !consent}
        >
          {isSubmitting ? 'Sending...' : 'Send Results to My Email'}
        </Button>
      </form>
    </div>
  );
};

export default PDFEmailExport;
