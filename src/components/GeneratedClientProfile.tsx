
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { BlueprintData } from '@/types/ClientProfile';
import IdealClientProfileCard from './IdealClientProfileCard';
import JobsToBeDoneCard from './JobsToBeDoneCard';
import PDFEmailExport from './PDFEmailExport';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

interface GeneratedClientProfileProps {
  generatedOutput: BlueprintData | null;
  blueprintText: string;
  isLoading?: boolean;
}

const GeneratedClientProfile: React.FC<GeneratedClientProfileProps> = ({
  generatedOutput,
  blueprintText,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="py-8">
        <Card>
          <CardHeader>
            <CardTitle>Generating Your Client Growth Blueprint...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!generatedOutput) {
    return null;
  }

  return (
    <div className="py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Client Growth Blueprint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <IdealClientProfileCard profile={generatedOutput.idealClientProfile} />
            <JobsToBeDoneCard data={generatedOutput.jobsToBeDone} />
          </div>

          <Separator />
          
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{blueprintText}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <PDFEmailExport generatedOutput={generatedOutput} blueprintText={blueprintText} />
    </div>
  );
};

export default GeneratedClientProfile;
