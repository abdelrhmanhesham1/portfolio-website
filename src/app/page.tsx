import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import BackToTop from "@/components/BackToTop";
import FlightPath from "@/components/FlightPath";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import { profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: "Abdelrhman Hesham",
  jobTitle: "AI/ML & Backend Engineer",
  description:
    "AI/ML and backend engineer specializing in aviation information systems.",
  url: "https://abdelrhman-hesham.vercel.app",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Zagazig National University",
  },
  knowsAbout: [
    "Machine Learning",
    "Natural Language Processing",
    "Backend Engineering",
    "Aviation Information Systems",
  ],
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function Home() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div id="top">
        <Header />
        <FlightPath />

        <main>
          <Hero />
          <About />
          <Work />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </MotionProvider>
  );
}
