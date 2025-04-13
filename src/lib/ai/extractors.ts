
/**
 * Utility functions for extracting content from markdown text
 */

// Extract a specific section from the markdown
export function extractSection(markdown: string, section: string, subsection?: string): string {
  try {
    // More robust section extraction with improved regex patterns
    if (subsection) {
      // First find the section
      const sectionRegex = new RegExp(`##?\\s*${section}([\\s\\S]*?)(?=##|$)`, 'i');
      const sectionMatch = markdown.match(sectionRegex);
      
      if (sectionMatch && sectionMatch[1]) {
        // Then find the subsection within that section
        const subsectionRegex = new RegExp(`${subsection}[:\\s-]*(.*?)(?=\\n|$)`, 'i');
        const match = sectionMatch[1].match(subsectionRegex);
        return match && match[1] ? match[1].trim() : "";
      }
    } else {
      // Extract entire section
      const regex = new RegExp(`##?\\s*${section}[:\\s]*(.*?)(?=##|$)`, 'is');
      const match = markdown.match(regex);
      return match && match[1] ? match[1].trim() : "";
    }
    return "";
  } catch (error) {
    console.error(`Error extracting section ${section}:`, error);
    return "";
  }
}

// Extract a list from a section in the markdown
export function extractList(markdown: string, section: string, subsection: string): string[] {
  try {
    // Find the section content
    const sectionRegex = new RegExp(`##?\\s*${section}([\\s\\S]*?)(?=##|$)`, 'i');
    const sectionMatch = markdown.match(sectionRegex);
    
    if (!sectionMatch || !sectionMatch[1]) return [];
    
    const sectionContent = sectionMatch[1];
    
    // Find the subsection within the section
    const subsectionRegex = new RegExp(`${subsection}[:\\s]*([\\s\\S]*?)(?=\\n\\s*\\n|\\n\\s*[A-Z]|$)`, 'i');
    const subsectionMatch = sectionContent.match(subsectionRegex);
    
    if (!subsectionMatch || !subsectionMatch[1]) return [];
    
    // Extract list items with improved pattern matching
    return subsectionMatch[1]
      .split('\n')
      .map(line => {
        // Remove list markers (-, *, •, numbers) and trim
        const item = line.replace(/^[-*•\\d.]\s*|\\[\\]|\\[ \\]|\\[x\\]\\s*/i, '').trim();
        return item;
      })
      .filter(item => item !== '');
  } catch (error) {
    console.error(`Error extracting list for ${section}.${subsection}:`, error);
    return [];
  }
}

// Extract list items directly from a section
export function extractListFromSection(markdown: string, sectionName: string, maxItems: number = 5): string[] {
  try {
    // Find the section content with improved regex
    const sectionRegex = new RegExp(`###?\\s*${sectionName}([\\s\\S]*?)(?=###|##|$)`, 'i');
    const sectionMatch = markdown.match(sectionRegex);
    
    if (!sectionMatch || !sectionMatch[1]) return [];
    
    // Extract list items with better pattern matching
    const items = sectionMatch[1]
      .split('\n')
      .map(line => {
        // Remove list markers (-, *, •, numbers) and trim
        const item = line.replace(/^[-*•\\d.]\s*|\\[\\]|\\[ \\]|\\[x\\]\\s*/i, '').trim();
        return item;
      })
      .filter(item => item !== '' && item.length > 1) // Filter out empty items and single characters
      .slice(0, maxItems); // Limit to maxItems
    
    return items;
  } catch (error) {
    console.error(`Error extracting list from section ${sectionName}:`, error);
    return [];
  }
}
