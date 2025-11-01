import { CyberCursor } from "@/components/CyberCursor";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventCard } from "@/components/EventCard";
import { Lightbulb, Code, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CyberCursor />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20 pt-12">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 cyber-border bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full">
              <Zap className="w-5 h-5 text-primary animate-pulse-glow" />
              <span className="font-mono text-sm uppercase tracking-wider text-primary">
                System Online
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow animate-glitch">
            IEEE BTS SOCIETY
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-mono">
            Target-Response Interface Event Portal
          </p>
          <div className="inline-block cyber-border bg-secondary/20 px-6 py-2 rounded-full glow-secondary mb-12">
            <span className="text-secondary font-mono font-bold">
              MISSION DATE: NOVEMBER 5, 2025
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="mb-16">
            <div className="inline-block mb-6">
              <h2 className="text-2xl font-bold text-primary font-mono uppercase tracking-wider">
                [ COUNTDOWN SEQUENCE ]
              </h2>
            </div>
            <CountdownTimer />
          </div>
        </section>

        {/* Events Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow font-mono uppercase">
              [ TARGET OBJECTIVES ]
            </h2>
            <p className="text-muted-foreground font-mono">
              Select a target to acquire detailed mission parameters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EventCard
              title="IDEA PRESENTATION"
              description="Present innovative solutions to real-world challenges"
              details="Showcase your creative thinking and problem-solving abilities by presenting innovative ideas. Teams will have 10 minutes to pitch their concepts, followed by a Q&A session with expert judges. Projects should demonstrate feasibility, innovation, and potential real-world impact."
              date="November 5, 2025"
              time="10:00 AM - 1:00 PM"
              venue="Main Auditorium, Tech Block"
              participants="Teams of 2-4 members"
              prize="₹25,000 Prize Pool"
              icon={<Lightbulb className="w-8 h-8 text-primary" />}
              gradient="linear-gradient(135deg, hsl(184 100% 50%), hsl(158 100% 45%))"
            />

            <EventCard
              title="CODING COMPETITION"
              description="Test your algorithmic and problem-solving prowess"
              details="A challenging 3-hour coding marathon featuring algorithm design, data structures, and complex problem-solving. Participants will face progressively difficult challenges testing speed, accuracy, and code efficiency. Individual competition with real-time leaderboards and instant feedback on submissions."
              date="November 5, 2025"
              time="2:00 PM - 5:00 PM"
              venue="Computer Lab 3, CS Department"
              participants="Individual participation"
              prize="₹30,000 Prize Pool"
              icon={<Code className="w-8 h-8 text-secondary" />}
              gradient="linear-gradient(135deg, hsl(158 100% 45%), hsl(280 100% 60%))"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-20 pb-8">
          <div className="cyber-border bg-card/30 backdrop-blur-sm inline-block px-8 py-4 rounded-lg">
            <p className="text-sm font-mono text-muted-foreground">
              IEEE BTS Society © 2025 • Target-Response Interface v2.0
            </p>
            <p className="text-xs font-mono text-primary mt-2">
              [ ALL SYSTEMS OPERATIONAL ]
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
