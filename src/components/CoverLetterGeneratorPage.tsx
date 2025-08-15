"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCoverLetter } from "@/app/cover-letter-generator/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Wand2, Copy } from "lucide-react";
import { Separator } from "./ui/separator";

const portfolioProjectSchema = z.object({
  name: z.string().min(1, "Project name is required."),
  description: z.string().min(1, "Description is required."),
  link: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  relevantSkills: z.string().min(1, "Please list at least one skill."),
  details: z.string().min(1, "Details are required."),
});

const formSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters."),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters."),
  portfolioProjects: z.array(portfolioProjectSchema).min(1, "Please add at least one project."),
});

type FormData = z.infer<typeof formSchema>;

export function CoverLetterGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      jobDescription: "",
      portfolioProjects: [
        { name: "", description: "", link: "", relevantSkills: "", details: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "portfolioProjects",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedLetter("");
    try {
      const result = await createCoverLetter({
        ...data,
        portfolioProjects: data.portfolioProjects.map(p => ({...p, relevantSkills: p.relevantSkills.split(',').map(s => s.trim())}))
      });
      if (result.success && result.data) {
        setGeneratedLetter(result.data.coverLetter);
        toast({ title: "Success!", description: "Your cover letter has been generated." });
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Could not generate the cover letter.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({ title: "Copied!", description: "Cover letter copied to clipboard." });
  };

  if (generatedLetter) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Your Generated Cover Letter
            <Button variant="ghost" size="icon" onClick={handleCopyToClipboard}>
              <Copy className="h-5 w-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none p-4 border rounded-md bg-accent/50 whitespace-pre-wrap font-body">
            {generatedLetter}
          </div>
          <Button onClick={() => setGeneratedLetter("")} className="mt-6">
            Generate Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Your Information</h3>
                <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Paste the full job description here..."
                        className="min-h-[150px]"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        A detailed job description helps the AI tailor the letter.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Portfolio Projects</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md mb-4 relative space-y-4">
                  <h4 className="font-medium">Project #{index + 1}</h4>
                   <FormField
                    control={form.control}
                    name={`portfolioProjects.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl><Input placeholder="e.g., My Awesome App" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`portfolioProjects.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brief Description</FormLabel>
                        <FormControl><Textarea placeholder="A short, one-sentence description of the project." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`portfolioProjects.${index}.link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Link (Optional)</FormLabel>
                        <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`portfolioProjects.${index}.relevantSkills`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant Skills</FormLabel>
                        <FormControl><Input placeholder="e.g., Next.js, TypeScript, Stripe" {...field} /></FormControl>
                         <FormDescription>Comma-separated list of skills.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`portfolioProjects.${index}.details`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl><Textarea placeholder="Provide specific details about your role, achievements, or tech used that could be included in the letter." className="min-h-[100px]" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                     <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove Project</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => append({ name: "", description: "", link: "", relevantSkills: "", details: "" })} className="mt-2">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Cover Letter
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
