import { promises as fs } from 'fs';
import path from 'path';

export async function loadPrompt(
  filePath: string,
  variables: Record<string, string> = {}
): Promise<string> {
  try {
    // Read the markdown file
    const fullPath = path.join(process.cwd(), filePath);
    let content = await fs.readFile(fullPath, 'utf-8');
    
    // Replace all variables in the content
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(placeholder, value);
    });
    
    return content;
  } catch (error) {
    console.error(`Error loading prompt from ${filePath}:`, error);
    throw error;
  }
} 