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

      <main className="relative z-10 container mx-auto px-4 py-4 max-h-screen overflow-y-auto">
        {/* Hero Section */}
        <section className="text-center mb-6">
          <div className="inline-block mb-3">
            <div className="flex items-center gap-2 cyber-border bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="font-mono text-xs uppercase tracking-wider text-primary">
                System Online
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-glow animate-glitch">
            IEEE BTS SOCIETY
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground mb-2 font-mono">
            Target-Response Interface Event Portal
          </p>
          <div className="inline-block cyber-border bg-secondary/20 px-4 py-1.5 rounded-full glow-secondary mb-4">
            <span className="text-secondary font-mono font-bold text-sm">
              MISSION DATE: NOVEMBER 5, 2025
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6">
            <div className="inline-block mb-3">
              <h2 className="text-lg font-bold text-primary font-mono uppercase tracking-wider">
                [ COUNTDOWN SEQUENCE ]
              </h2>
            </div>
            <CountdownTimer />
          </div>
        </section>

        {/* Events Section */}
        <section className="max-w-6xl mx-auto mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-glow font-mono uppercase">
              [ TARGET OBJECTIVES ]
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              Select a target to acquire detailed mission parameters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        <footer className="text-center pb-4">
          <div className="cyber-border bg-card/30 backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
            <p className="text-xs font-mono text-muted-foreground">
              IEEE BTS Society © 2025 • Target-Response Interface v2.0
            </p>
            <p className="text-[10px] font-mono text-primary mt-1">
              [ ALL SYSTEMS OPERATIONAL ]
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
