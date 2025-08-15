import { CoverLetterGeneratorPage } from "@/components/CoverLetterGeneratorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'AI Cover Letter Generator | Nextfolio',
  description: 'Generate a personalized cover letter in seconds using AI. Tailor your application by providing a job description and your relevant projects.',
};

export default function CoverLetterGenerator() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
          AI Cover Letter Generator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Craft the perfect cover letter in seconds. Just provide your name, the job description, and your relevant projects, and let our AI do the rest.
        </p>
      </div>
      <CoverLetterGeneratorPage />
    </div>
  );
}
