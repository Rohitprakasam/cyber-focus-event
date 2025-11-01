import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Trophy, Target } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  details: string;
  date: string;
  time: string;
  venue: string;
  participants: string;
  prize?: string;
  icon: React.ReactNode;
  gradient: string;
}

export const EventCard = ({
  title,
  description,
  details,
  date,
  time,
  venue,
  participants,
  prize,
  icon,
  gradient,
}: EventCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="event-card group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="cyber-border bg-card/80 backdrop-blur-md p-8 rounded-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
          {/* Background Gradient */}
          <div 
            className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
            style={{ background: gradient }}
          />
          
          {/* Scanning Effect */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan pointer-events-none" />
          )}

          {/* Target Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary">TARGET</span>
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-lg glow-primary">
                {icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-glow">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Clock className="w-4 h-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <MapPin className="w-4 h-4" />
                <span>{venue}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button 
                variant="outline" 
                className="cyber-border bg-primary/10 hover:bg-primary/20 text-primary font-mono"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                ACQUIRE TARGET
              </Button>
              <div className="text-xs font-mono text-muted-foreground">
                CLICK TO ENGAGE
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="cyber-border bg-card/95 backdrop-blur-xl max-w-2xl border-primary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg glow-primary">
                {icon}
              </div>
              <DialogTitle className="text-3xl font-bold text-glow">{title}</DialogTitle>
            </div>
            <DialogDescription className="text-base text-foreground/80">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="relative z-10 space-y-6 mt-4">
            <div className="cyber-border bg-muted/50 p-6 rounded-lg">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                EVENT DETAILS
              </h4>
              <p className="text-sm leading-relaxed">{details}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="cyber-border bg-muted/30 p-4 rounded">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold font-mono">DATE</span>
                </div>
                <p className="text-sm">{date}</p>
              </div>

              <div className="cyber-border bg-muted/30 p-4 rounded">
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold font-mono">TIME</span>
                </div>
                <p className="text-sm">{time}</p>
              </div>

              <div className="cyber-border bg-muted/30 p-4 rounded">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold font-mono">VENUE</span>
                </div>
                <p className="text-sm">{venue}</p>
              </div>

              <div className="cyber-border bg-muted/30 p-4 rounded">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-bold font-mono">PARTICIPANTS</span>
                </div>
                <p className="text-sm">{participants}</p>
              </div>
            </div>

            {prize && (
              <div className="cyber-border bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-lg glow-primary">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-secondary" />
                  <h4 className="font-bold text-secondary text-lg font-mono">PRIZE POOL</h4>
                </div>
                <p className="text-2xl font-bold text-glow">{prize}</p>
              </div>
            )}

            <Button 
              className="w-full cyber-border bg-primary hover:bg-primary/80 text-primary-foreground font-mono text-lg glow-primary"
              onClick={() => setIsOpen(false)}
            >
              TARGET LOCKED
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
