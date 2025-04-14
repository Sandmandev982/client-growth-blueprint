
import { BlueprintData } from "@/types/ClientProfile";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

export const exportToPDF = (data: BlueprintData, brandName: string): string => {
  try {
    console.log("Exporting to PDF:", data);
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set basic document properties
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    
    // Add title
    doc.text(`${brandName || 'Client Growth'} Blueprint`, 20, 20);
    
    // Add date
    const today = new Date();
    doc.setFontSize(10);
    doc.text(`Generated: ${today.toLocaleDateString()}`, 20, 30);
    
    // Add Preliminary Transformation Statement
    doc.setFontSize(16);
    doc.text("Preliminary Transformation Statement", 20, 40);
    doc.setFontSize(10);
    
    const preliminaryTransformation = data.preliminaryTransformation || "Not specified";
    const wrappedTransformation = doc.splitTextToSize(preliminaryTransformation, 170);
    doc.text(wrappedTransformation, 20, 45);
    
    // Add Ideal Client Profile section
    doc.setFontSize(16);
    doc.text("Ideal Client Profile", 20, 60);
    
    // Add demographics
    doc.setFontSize(14);
    doc.text("Demographics", 20, 70);
    doc.setFontSize(10);
    
    try {
      const demographics = data.idealClientProfile.demographics;
      
      doc.text(`Age: ${demographics.age}`, 30, 80);
      doc.text(`Gender: ${demographics.gender}`, 30, 85);
      doc.text(`Location: ${demographics.location}`, 30, 90);
      doc.text(`Education: ${demographics.education}`, 30, 95);
      doc.text(`Income: ${demographics.income}`, 30, 100);
      doc.text(`Occupation: ${demographics.occupation}`, 30, 105);
    } catch (err) {
      console.error('Error adding demographics to PDF:', err);
      doc.text('Demographics data could not be processed', 30, 80);
    }
    
    // Add psychographics
    doc.setFontSize(14);
    doc.text("Psychographics", 20, 115);
    doc.setFontSize(10);
    
    try {
      const psychographics = data.idealClientProfile.psychographics;
      
      // Add values
      doc.text("Values:", 30, 125);
      const values = psychographics.values || ['Not specified'];
      values.forEach((value, index) => {
        if (index < 3) { // Limit to 3 items to prevent overflow
          doc.text(`• ${value}`, 40, 130 + (index * 5));
        }
      });
      
      // Add goals
      doc.text("Goals:", 30, 145);
      const goals = psychographics.goals || ['Not specified'];
      goals.forEach((goal, index) => {
        if (index < 3) { // Limit to 3 items to prevent overflow
          doc.text(`• ${goal}`, 40, 150 + (index * 5));
        }
      });
    } catch (err) {
      console.error('Error adding psychographics to PDF:', err);
      doc.text('Psychographics data could not be processed', 30, 125);
    }
    
    // Add Jobs To Be Done section
    doc.setFontSize(16);
    doc.text("Jobs To Be Done", 20, 170);
    
    // Add struggles
    try {
      doc.setFontSize(14);
      doc.text("Key Struggles", 20, 180);
      doc.setFontSize(10);
      const struggles = data.jobsToBeDone.struggles || ['Not specified'];
      struggles.forEach((struggle, index) => {
        if (index < 3) { // Limit to 3 items to prevent overflow
          doc.text(`${index + 1}. ${struggle}`, 30, 190 + (index * 5));
        }
      });
      
      // Add marketing angle
      doc.setFontSize(14);
      doc.text("Strategic Marketing Angle", 20, 210);
      doc.setFontSize(10);
      
      // Wrap the marketing angle text if it's too long
      const marketingAngle = data.jobsToBeDone.marketingAngle || 'Not specified';
      const wrappedMarketingAngle = doc.splitTextToSize(
        marketingAngle, 
        150 // Maximum width in points
      );
      doc.text(wrappedMarketingAngle, 30, 220);
      
      // Add sample engagement post
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Sample Engagement Post", 20, 20);
      doc.setFontSize(10);
      
      const samplePost = data.sampleEngagementPost || 'Not specified';
      const wrappedSamplePost = doc.splitTextToSize(samplePost, 170);
      doc.text(wrappedSamplePost, 20, 30);
      
    } catch (err) {
      console.error('Error adding jobs to be done to PDF:', err);
      doc.text('Jobs To Be Done data could not be processed', 30, 180);
    }
    
    // Add PDF description footer
    doc.setFontSize(8);
    doc.text("Client Growth Blueprint generated via VBF Process App", 20, 280);
    
    // Save the PDF
    const fileName = `${(brandName || 'client-blueprint').replace(/\s+/g, '-')}-profile.pdf`;
    doc.save(fileName);
    
    // Show success message
    toast({
      title: "PDF Generated",
      description: `Your ${brandName || 'client'} blueprint has been exported to PDF.`,
    });
    
    return fileName;
  } catch (error) {
    console.error("Error generating PDF:", error);
    
    toast({
      title: "PDF Generation Failed",
      description: "An error occurred while generating your PDF. Please try again.",
      variant: "destructive",
    });
    
    throw error;
  }
};
