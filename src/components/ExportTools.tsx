
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Share2 } from "lucide-react";
import { GeneratedOutput, FormData } from "../types";
import { exportToPDF } from "../services/pdfService";

interface ExportToolsProps {
  generatedData: GeneratedOutput;
  formData: FormData;
}

const ExportTools: React.FC<ExportToolsProps> = ({ generatedData, formData }) => {
  const handleExportPDF = () => {
    exportToPDF(generatedData, formData.brandName);
  };

  const handleCopyText = () => {
    let text = `# ${formData.brandName} - Client Growth Blueprint\n\n`;
    
    text += "## Ideal Client Profile\n\n";
    text += "### Demographics\n";
    text += `- Age: ${generatedData.idealClientProfile.demographics.age}\n`;
    text += `- Gender: ${generatedData.idealClientProfile.demographics.gender}\n`;
    text += `- Location: ${generatedData.idealClientProfile.demographics.location}\n`;
    text += `- Education: ${generatedData.idealClientProfile.demographics.education}\n`;
    text += `- Income: ${generatedData.idealClientProfile.demographics.income}\n`;
    text += `- Occupation: ${generatedData.idealClientProfile.demographics.occupation}\n\n`;
    
    text += "### Psychographics\n";
    text += "#### Values\n";
    generatedData.idealClientProfile.psychographics.values.forEach(val => {
      text += `- ${val}\n`;
    });
    
    text += "\n#### Goals\n";
    generatedData.idealClientProfile.psychographics.goals.forEach(goal => {
      text += `- ${goal}\n`;
    });
    
    text += "\n## Key Struggles & Jobs To Be Done\n\n";
    text += "### Primary Struggles\n";
    generatedData.jobsToBeDone.struggles.forEach((struggle, i) => {
      text += `${i + 1}. ${struggle}\n`;
    });
    
    text += "\n### Jobs To Be Done\n";
    generatedData.jobsToBeDone.jobs.forEach((job, i) => {
      text += `${i + 1}. ${job}\n`;
    });
    
    navigator.clipboard.writeText(text);
    alert("Content copied to clipboard!");
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Export Your Blueprint</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleExportPDF}
              className="flex items-center justify-center bg-vbf-blue hover:bg-vbf-blue-light h-20"
            >
              <div className="flex flex-col items-center">
                <FileDown className="h-6 w-6 mb-1" />
                <span>Export as PDF</span>
              </div>
            </Button>
            
            <Button
              onClick={handleCopyText}
              variant="outline"
              className="flex items-center justify-center border-vbf-blue text-vbf-blue hover:text-vbf-blue-light hover:border-vbf-blue-light h-20"
            >
              <div className="flex flex-col items-center">
                <Share2 className="h-6 w-6 mb-1" />
                <span>Copy as Text</span>
              </div>
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 mt-4">
            <p>
              <strong>Note:</strong> Your generated content is ready for export. Use the buttons above to download as PDF or copy as formatted text that you can paste into your documents.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportTools;
