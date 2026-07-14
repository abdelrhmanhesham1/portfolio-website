import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MotionProvider>
      <div id="top">
        <Header />

        <main>
          <Hero />
          <About />
          <Work />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
