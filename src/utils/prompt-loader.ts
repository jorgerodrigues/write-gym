import { promises as fs } from "fs";
import path from "path";

// TODO: replace to use the constants instead
export async function loadPromptFromPath(
  filePath: string,
  variables: Record<string, string> = {}
): Promise<string> {
  try {
    // Read the markdown file
    const fullPath = path.join(process.cwd(), filePath);
    let content = await fs.readFile(fullPath, "utf-8");

    // Replace all variables in the content
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      content = content.replace(placeholder, value);
    });

    return content;
  } catch (error) {
    console.error(`Error loading prompt from ${filePath}:`, error);
    throw error;
  }
}

export async function loadPromptFromConstant(
  prompt: string,
  variables: Record<string, string> = {}
): Promise<string> {
  try {
    // Replace all variables in the constant prompt
    let content = prompt;
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      content = content.replace(placeholder, value);
    });

    return content;
  } catch (error) {
    console.error(`Error processing constant prompt:`, error);
    throw error;
  }
}
