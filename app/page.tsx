"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  PenTool,
  User,
  ArrowDown,
  Rocket,
  Star,
  Sun,
  Satellite,
  Eclipse,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import { VideoWithSlider } from "./video_player";
import { ParallaxBackground } from "./background";
import ContactForm from "./contactform";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
type SectionRef = React.RefObject<HTMLElement | null>;

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  media: string;
  link: string;
};
type ExperienceItemProps = {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  logo?: string; // Optional logo
};
const ProjectCard = ({
  title,
  description,
  tags,
  media,
  link,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative bg-card/70 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/20 shadow-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {media.endsWith(".mp4") ? (
          <VideoWithSlider src={media} />
        ) : (
          <Image
            src={media}
            width={96}
            height={96}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="cursor-pointer bg-gradient-to-r from-primary to-primary/80 text-white border-none"
            >
              Launch Project <Rocket className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <p className="text-muted-foreground text-sm mt-1">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
const ExperienceItem = ({
  title,
  company,
  period,
  description,
  skills,
  logo,
}: ExperienceItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row gap-6 md:gap-10"
    >
      {/* LEFT SIDE: Company Info */}
      <div className="md:w-1/3 space-y-1">
        <div className="flex items-center gap-2">
          {logo && (
            <img
              src={logo}
              alt={`${company} logo`}
              className="w-6 h-6 object-contain rounded-md"
            />
          )}
          <span className="text-sm font-semibold text-primary">{company}</span>
        </div>
        <p className="text-base font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{period}</p>
      </div>

      {/* RIGHT SIDE: Description & Skills */}
      <div className="md:w-2/3 space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs font-medium py-1 px-2 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [currentNavItem, setCurrentNavItem] = useState("home");
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bgEnabled, setBgEnabled] = useState(true);

  useEffect(() => {
    const handleNavScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 81; // Add 81 to match the scroll offset

      const aboutPosition = aboutRef.current?.offsetTop ?? 0;
      const experiencePosition = experienceRef.current?.offsetTop ?? 0;
      const projectsPosition = projectsRef.current?.offsetTop ?? 0;
      const contactPosition = contactRef.current?.offsetTop ?? 0;

      if (scrollPosition < aboutPosition) {
        setCurrentNavItem("home");
      } else if (scrollPosition < experiencePosition) {
        setCurrentNavItem("about");
      } else if (scrollPosition < projectsPosition) {
        setCurrentNavItem("experience");
      } else if (scrollPosition < contactPosition) {
        setCurrentNavItem("projects");
      } else {
        setCurrentNavItem("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref: SectionRef) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans`}>
      {/* Background */}
      {bgEnabled && <ParallaxBackground />}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-20 border-border transition-all duration-300 ${
          hasScrolled ? "backdrop-blur-md bg-background/30 shadow-sm" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight font-heading flex items-center">
            <Satellite className="mr-2 h-5 w-5 text-primary" />
            Ashwin Murthy
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() =>
                scrollToSection({ current: document.getElementById("home") })
              }
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-full transition-colors font-medium ${
                currentNavItem === "home"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-full transition-colors font-medium ${
                currentNavItem === "about"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(experienceRef)}
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-full transition-colors font-medium ${
                currentNavItem === "experience"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-full transition-colors font-medium ${
                currentNavItem === "projects"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              Projects
            </button>

            <button
              onClick={() => scrollToSection(contactRef)}
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-full transition-colors font-medium ${
                currentNavItem === "contact"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="block border-primary/30 hover:border-primary text-primary"
              onClick={() => setBgEnabled((v) => !v)}
            >
              {bgEnabled ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl p-6 rounded-lg"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/40 mx-auto glow-effect">
            <Image
              src="/ashwin.jpg"
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Ashwin Murthy
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground">
            Full Stack Developer & CS Explorer
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I build modern web and mobile applications with a focus on
            performance, clean code, and stellar user experience.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="default"
              className="gap-2 cursor-pointer bg-gradient-to-r from-primary to-primary/80"
              onClick={() => {
                setCurrentNavItem("experience");
                scrollToSection(experienceRef);
              }}
            >
              My Work
              <ArrowDown className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="gap-2 cursor-pointer border-primary/30 hover:border-primary text-primary"
              onClick={() => {
                setCurrentNavItem("contact");
                scrollToSection(contactRef);
              }}
            >
              Contact Me
              <Mail className="h-4 w-4" />
            </Button>
            <a
              href="/Ashwin_Murthy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                className="gap-2 cursor-pointer bg-background/30 hover:bg-background/50 backdrop-blur-sm"
              >
                View Resume
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
          <div className="flex justify-center space-x-3 pt-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a
                href="https://github.com/ashwinsm10"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a
                href="https://linkedin.com/in/ashwinsm10"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a
                href="mailto:ashwinsm10@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>

        <div
          onClick={() => scrollToSection(aboutRef)}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative py-24 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 backdrop-blur-sm p-6 rounded-lg bg-card/20 border border-primary/10"
            >
              <h2 className="text-3xl font-bold mb-6 inline-flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                About My Journey
              </h2>
              <p className="text-muted-foreground mb-4">
                I&apos;m a passionate Computer Science student at UC Santa Cruz
                with a strong focus on creating intuitive, efficient, and
                scalable web applications. Like a well-planned space mission, I
                approach development with precision and thoughtful exploration.
              </p>
              <p className="text-muted-foreground mb-6">
                My approach combines technical expertise with creative
                problem-solving to build applications that navigate the digital
                universe with elegance and efficiency. I&apos;m particularly
                interested in AI integrations, database optimization, and
                creating cosmic user interfaces that elevate the user experience
                to new heights.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  React
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  Next.js
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  C++
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  TypeScript
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  Python
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  Node.js
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  AWS
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  Docker
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  Flask
                </span>
                <span className="text-sm py-1 px-3 rounded-full bg-primary/10 text-primary">
                  GraphQL
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-primary" /> Education
                    </h3>
                    <p className="text-primary font-medium">
                      B.S. Computer Science
                    </p>
                    <p className="text-sm text-muted-foreground">
                      UC Santa Cruz, 2023-2026
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <Sun className="h-5 w-5 mr-2 text-primary" /> GPA
                    </h3>
                    <p className="text-primary font-medium">3.9</p>
                    <p className="text-sm text-muted-foreground">
                      Dean&apos;s List
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-primary" />{" "}
                      Experience
                    </h3>
                    <p className="text-primary font-medium">
                      Full Stack Development
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Multiple Internships
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <Eclipse className="h-5 w-5 mr-2 text-primary" /> Location
                    </h3>
                    <p className="text-primary font-medium">Tracy</p>
                    <p className="text-sm text-muted-foreground">
                      California, USA
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section ref={experienceRef} className="relative py-24 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4 inline-flex items-center gap-2 justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
              Orbit of Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A journey through my professional trajectory and the companies
              I&apos;ve had the opportunity to contribute to.
            </p>
          </motion.div>

          <div className="space-y-12 backdrop-blur-sm p-6 rounded-lg bg-card/20 border border-primary/10">
            <ExperienceItem
              title="Software Engineer Intern – Network Engineering"
              company="Crusoe"
              period="Jun 2025 - Aug 2025"
              description="Contributing to automation tooling for AI-focused production networks, building Python-based systems that streamline network operations. Collaborating with the Observability team to integrate operational workflows with internal infrastructure and monitoring tools."
              skills={[
                "Python",
                "Networking",
                "Automation",
                "Infrastructure",
                "Observability",
                "CI/CD",
              ]}
              logo="/logos/crusoe.png"
            />
            <Separator className="bg-primary/20" />

            <ExperienceItem
              title="Full-Stack Software Engineer Intern"
              company="Ari Innovation"
              period="Mar 2025 - May 2025"
              description="Developed backend RESTful endpoints using NestJS for user registration and authentication via SSO or email-based sign-up, enabling up to 300 users to access their personal Web3 health wallet. Stored user data securely in DynamoDB, deployed a local testing environment using Docker and LocalStack for scalable and efficient API development."
              skills={[
                "NestJS",
                "Node.js",
                "DynamoDB",
                "RESTful APIs",
                "Authentication",
                "Web3",
                "Docker",
              ]}
              logo="/logos/ari.png"
            />

            <Separator className="bg-primary/20" />

            <ExperienceItem
              title="Frontend Software Engineer Intern"
              company="Raise Commercial Real Estate"
              period="Jul 2024 - Aug 2024"
              description="Redesigned brokers' deals pages using React.js and TypeScript, streamlining workflows and enhancing usability. Reduced page load times by 90% by implementing React lazy loading and optimizing GraphQL queries. Developed a comprehensive Jest test suite for user permissions, achieving a 12% increase in statement coverage."
              skills={[
                "React.js",
                "TypeScript",
                "GraphQL",
                "Jest",
                "UI/UX Design",
                "Docker",
              ]}
              logo="/logos/raise.png"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="relative py-24 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4 inline-flex items-center gap-2 justify-center">
              <Code className="h-6 w-6 text-primary" />
              Star Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my constellation of projects that showcase my skills and
              approach to solving real-world challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Slugtistics"
              description="An intuitive course selection platform serving 6,000+ students, featuring a data pipeline and real-time professor reviews."
              tags={[
                "Python",
                "Flask",
                "React",
                "SQLite",
                "AWS",
                "GraphQL",
                "Gemini API",
                "Pinecone",
                "Google Maps API",
              ]}
              media="/videos/slugtistics.mp4"
              link="https://slugtistics.com/class"
            />
            <ProjectCard
              title="Farmer Feast"
              description="A full-stack app that helps users find local ingredients from farmers markets based on any dish, with shopping trip optimization."
              tags={[
                "Next.js",
                "React",
                "Gemini API",
                "Supabase",
                "Google Maps API",
                "Puppeteer",
              ]}
              media="/videos/farmer-feast.mp4"
              link="https://www.farmerfeast.tech/"
            />
            <ProjectCard
              title="Cruz-Thru"
              description="AI-powered study tool using Flask and React Native to transcribe lectures and generate flashcards."
              tags={["Python", "Flask", "React Native", "Google Gemini"]}
              media="/cruz-thru.png"
              link="https://github.com/ashwinsm10/cruz-thru"
            />
          </div>

          <div className="mt-12 text-center">
            <a href="https://github.com/ashwinsm10" target="_blank">
              <Button
                variant="outline"
                className="gap-2 cursor-pointer border-primary/30 hover:border-primary text-primary"
              >
                Explore All Projects <Rocket className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative py-24 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 backdrop-blur-sm p-6 rounded-lg bg-card/20 border border-primary/10"
            >
              <h2 className="text-3xl font-bold mb-4 inline-flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Send a Signal
              </h2>
              <p className="text-muted-foreground mb-6">
                Ready to connect across the digital cosmos? Reach out for
                collaborations, internship opportunities, or just a friendly
                chat about tech and the universe.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full shrink-0 border-primary/30 text-primary"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      ashwinsm10@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full shrink-0 border-primary/30 text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">LinkedIn</h3>
                    <p className="text-muted-foreground">
                      linkedin.com/in/ashwinsm10
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full shrink-0 border-primary/30 text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">GitHub</h3>
                    <p className="text-muted-foreground">
                      github.com/ashwinsm10
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full shrink-0 border-primary/30 text-primary"
                  >
                    <PenTool className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-medium">Phone</h3>
                    <p className="text-muted-foreground">925-368-0846</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-bold text-lg">Ashwin Murthy</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://github.com/ashwinsm10"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://linkedin.com/in/ashwinsm10"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="mailto:ashwinsm10@gmail.com" rel="noreferrer">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PenTool className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
