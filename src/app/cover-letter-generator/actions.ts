"use server";

import { generateCoverLetter, GenerateCoverLetterInput } from "@/ai/flows/generate-cover-letter";
import { z } from "zod";

const portfolioProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string(),
  relevantSkills: z.array(z.string()),
  details: z.string(),
});

const formSchema = z.object({
  userName: z.string(),
  jobDescription: z.string(),
  portfolioProjects: z.array(portfolioProjectSchema),
});


export async function createCoverLetter(input: GenerateCoverLetterInput) {
  try {
    const validatedInput = formSchema.parse(input);
    const result = await generateCoverLetter(validatedInput);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error generating cover letter:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input data." };
    }
    return { success: false, error: error.message || "Failed to generate cover letter." };
  }
}
