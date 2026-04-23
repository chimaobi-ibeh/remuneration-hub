import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyUse from "@/components/landing/WhyUse";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <title>NBA Remuneration Portal — Legal Document Platform for Nigerian Bar Members</title>
      <meta name="description" content="The official NBA Remuneration Portal for preparing, managing, and tracking legal documents with full committee oversight." />
      <Nav />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <WhyUse />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
