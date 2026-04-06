import { BGPattern } from "@/components/ui/bg-pattern";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Projects } from "@/components/Projects";
import { CustomCursor } from "@/components/CustomCursor";

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-white/20">
      {/* Global Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 
        Full-page static ShapeGrid equivalent using BGPattern 
      */}
      <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none">
        <BGPattern 
          variant="grid" 
          size={30} 
          mask="fade-bottom" 
          fill="rgba(255,255,255,0.08)" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-16 w-full">
        <Hero />
      </main>

      {/* Marquee extends full width, so it lives outside the max-w-7xl container */}
      <Marquee />

      <main className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-48">
        <Projects />
        
        <section id="about" className="min-h-screen py-20">
          <h2 className="text-3xl font-bold mb-10">About Me</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl h-96 w-full animate-pulse" />
        </section>

        <section id="contact" className="min-h-[50vh] py-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Let's build something together.</h2>
          <div className="flex justify-center">
            <button className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-full items-center justify-center hover:scale-105 transition-transform">
              Start a project
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
