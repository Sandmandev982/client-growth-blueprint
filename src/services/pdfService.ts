
import { GeneratedOutput } from "../types";
import { toast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";

export const exportToPDF = (data: GeneratedOutput, brandName: string) => {
  try {
    console.log("Exporting to PDF:", data);
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set basic document properties
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    
    // Add title
    doc.text(`${brandName} Client Growth Blueprint`, 20, 20);
    
    // Add date
    const today = new Date();
    doc.setFontSize(10);
    doc.text(`Generated: ${today.toLocaleDateString()}`, 20, 30);
    
    // Add section headers and content
    doc.setFontSize(16);
    doc.text("Ideal Client Profile", 20, 40);
    
    // Add demographics
    doc.setFontSize(14);
    doc.text("Demographics", 20, 50);
    doc.setFontSize(10);
    const demographics = data.idealClientProfile.demographics;
    doc.text(`Age: ${demographics.age}`, 30, 60);
    doc.text(`Gender: ${demographics.gender}`, 30, 65);
    doc.text(`Location: ${demographics.location}`, 30, 70);
    doc.text(`Education: ${demographics.education}`, 30, 75);
    doc.text(`Income: ${demographics.income}`, 30, 80);
    doc.text(`Occupation: ${demographics.occupation}`, 30, 85);
    
    // Add psychographics
    doc.setFontSize(14);
    doc.text("Psychographics", 20, 95);
    doc.setFontSize(10);
    const psychographics = data.idealClientProfile.psychographics;
    
    // Add values
    doc.text("Values:", 30, 105);
    psychographics.values.forEach((value, index) => {
      if (index < 3) { // Limit to 3 items to prevent overflow
        doc.text(`• ${value}`, 40, 110 + (index * 5));
      }
    });
    
    // Add goals
    doc.text("Goals:", 30, 125);
    psychographics.goals.forEach((goal, index) => {
      if (index < 3) { // Limit to 3 items to prevent overflow
        doc.text(`• ${goal}`, 40, 130 + (index * 5));
      }
    });
    
    // Add Jobs To Be Done section
    doc.setFontSize(16);
    doc.text("Jobs To Be Done", 20, 150);
    
    // Add struggles
    doc.setFontSize(14);
    doc.text("Key Struggles", 20, 160);
    doc.setFontSize(10);
    data.jobsToBeDone.struggles.forEach((struggle, index) => {
      if (index < 3) { // Limit to 3 items to prevent overflow
        doc.text(`${index + 1}. ${struggle}`, 30, 170 + (index * 5));
      }
    });
    
    // Add marketing angle
    doc.setFontSize(14);
    doc.text("Strategic Marketing Angle", 20, 190);
    doc.setFontSize(10);
    
    // Wrap the marketing angle text if it's too long
    const marketingAngle = data.jobsToBeDone.marketingAngle;
    const wrappedMarketingAngle = doc.splitTextToSize(
      marketingAngle, 
      150 // Maximum width in points
    );
    doc.text(wrappedMarketingAngle, 30, 200);
    
    // Add PDF description footer
    doc.setFontSize(8);
    doc.text("Client Growth Blueprint generated via VBF Process App", 20, 280);
    
    // Save the PDF
    const fileName = `${brandName.replace(/\s+/g, '-')}-client-profile.pdf`;
    doc.save(fileName);
    
    // Show success message
    toast({
      title: "PDF Generated",
      description: `Your ${brandName} client profile has been exported to PDF.`,
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
