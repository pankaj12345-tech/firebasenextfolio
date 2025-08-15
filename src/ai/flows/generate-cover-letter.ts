// src/ai/flows/generate-cover-letter.ts
'use server';

/**
 * @fileOverview An AI agent to generate personalized cover letters based on a job description and portfolio projects.
 *
 * - generateCoverLetter - A function that generates a cover letter.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for a portfolio project
const PortfolioProjectSchema = z.object({
  name: z.string().describe('The name of the project.'),
  description: z.string().describe('A brief description of the project.'),
  link: z.string().describe('A link to the project.'),
  relevantSkills: z.array(z.string()).describe('Skills relevant to the project'),
  details: z.string().describe('Detailed information about the project, suitable for including in a cover letter'),
});

// Define the input schema for the cover letter generation
const GenerateCoverLetterInputSchema = z.object({
  jobDescription: z.string().describe('The job description for the position.'),
  portfolioProjects: z.array(PortfolioProjectSchema).describe('An array of portfolio projects.'),
  userName: z.string().describe('The name of the user applying for the job'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

// Define the output schema for the cover letter generation
const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

// Exported function to generate the cover letter
export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert resume and cover letter writer. Your goal is to create a compelling cover letter for the user, highlighting their skills and experience based on their portfolio projects, tailoring the letter to the specific job description.

  The user's name is {{{userName}}}.

  Here is the job description:
  {{{jobDescription}}}

  Here are the portfolio projects.  You should select projects to highlight based on their relevance to the job description.
  {{#each portfolioProjects}}
  Project Name: {{name}}
  Description: {{description}}
  Link: {{link}}
  Relevant Skills: {{relevantSkills}}
  Details: {{details}}
  {{/each}}

  Write a cover letter that incorporates details from the most relevant portfolio projects to demonstrate the user's qualifications for the job. Only include project details if they are very relevant.
  Be sure to include a call to action, inviting the hiring manager to learn more.
`,
});

// Define the Genkit flow for generating the cover letter
const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
