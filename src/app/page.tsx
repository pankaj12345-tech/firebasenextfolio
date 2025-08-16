import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Globe, Mail, Server, Smartphone, Github, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "E-commerce Platform",
    description: "A full-stack e-commerce solution with a custom CMS, payment gateway integration, and a rich user interface built with Next.js.",
    image: "https://algocademy.com/blog/wp-content/uploads/2024/10/compressed_image-144.webp",
    imageHint: "online store",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
  },
  {
    name: "SaaS Dashboard",
    description: "A multi-tenant SaaS application dashboard for data visualization and user management, featuring real-time updates.",
    image: "https://www.hostinger.com/in/tutorials/wp-content/uploads/sites/52/2022/04/web-developer-portfolio.png",
    imageHint: "dashboard analytics",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["Next.js", "React", "Recharts", "Firebase"],
  },
  {
    name: "AI Cover Letter Generator",
    description: "This very portfolio's tool to generate personalized cover letters using GenAI, based on job descriptions and your projects.",
    image: "https://www.prabhatkhabar.com/wp-content/uploads/2025/08/chatgpt-5-1.jpg",
    imageHint: "artificial intelligence",
    liveUrl: "/cover-letter-generator",
    repoUrl: "#",
    tags: ["Next.js", "Genkit AI", "Tailwind CSS", "Zod"],
  },
];

const skills = [
  { name: "React / Next.js", icon: <Globe className="h-5 w-5" /> },
  { name: "TypeScript", icon: <Code className="h-5 w-5" /> },
  { name: "Node.js", icon: <Server className="h-5 w-5" /> },
  { name: "SQL & NoSQL", icon: <Database className="h-5 w-5" /> },
  { name: "React Native", icon: <Smartphone className="h-5 w-5" /> },
  { name: "UI/UX Design", icon: <Code className="h-5 w-5" /> },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section id="hero" className="w-full bg-accent py-20 md:py-32 fade-in">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Avatar className="w-[400px] h-[400px] mx-auto mb-6 border-4 border-card shadow-lg">
            <AvatarImage src="https://i.postimg.cc/BQG7g2ZD/IMG-3784.jpg" alt="Developer's Photo" data-ai-hint="professional portrait" className="object-cover object-[center_20%]" />
            <AvatarFallback>PY</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">Pankaj Yadav</h1>
          <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate Next.js developer specializing in building modern, scalable, and user-friendly web applications.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#" target="_blank" rel="noopener noreferrer">View Resume</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="skills" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">My Skillset</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center text-center gap-3 p-4 rounded-lg transition-all hover:bg-accent">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-md">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="w-full py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.name} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader>
                  <div className="aspect-video overflow-hidden rounded-md mb-4 border">
                    <Image src={project.image} alt={project.name} width={600} height={400} className="object-cover w-full h-full" data-ai-hint={project.imageHint} />
                  </div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-start gap-4">
                  <Button asChild>
                    <Link href={project.liveUrl}>Live Demo</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={project.repoUrl}>GitHub</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 font-headline text-background">Get In Touch</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I&apos;m currently open to new opportunities. Feel free to reach out via email or connect with me on GitHub.
          </p>
          <div className="flex justify-center items-center gap-6">
            <Button variant="link" asChild className="text-lg">
              <a href="mailto:py80596436@gmail.com" className="flex items-center gap-2 text-background">
                <Mail className="h-5 w-5" />
                py80596436@gmail.com
              </a>
            </Button>
            <Button variant="link" asChild className="text-lg">
              <a href="https://github.com/pankaj12345-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button variant="link" asChild className="text-lg">
              <a href="https://wa.me/8059643661" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background">
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
