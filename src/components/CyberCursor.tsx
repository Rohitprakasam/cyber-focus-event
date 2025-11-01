import { useEffect, useState } from "react";

export const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTargeting, setIsTargeting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.event-card');
      
      setIsTargeting(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Crosshair */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isTargeting ? 'scale(1.5)' : 'scale(1)'}`,
        }}
      >
        {/* Center Dot */}
        <div className={`absolute inset-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isTargeting ? 'bg-secondary glow-secondary' : 'bg-primary glow-primary'
        } transition-colors duration-200`} />
        
        {/* Crosshair Lines */}
        <div className={`absolute w-8 h-[2px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
          isTargeting ? 'bg-secondary' : 'bg-primary'
        } transition-colors duration-200`}>
          <div className="absolute -left-10 top-0 w-8 h-[2px] bg-inherit" />
          <div className="absolute -right-10 top-0 w-8 h-[2px] bg-inherit" />
        </div>
        <div className={`absolute w-[2px] h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
          isTargeting ? 'bg-secondary' : 'bg-primary'
        } transition-colors duration-200`}>
          <div className="absolute left-0 -top-10 w-[2px] h-8 bg-inherit" />
          <div className="absolute left-0 -bottom-10 w-[2px] h-8 bg-inherit" />
        </div>

        {/* Targeting Ring */}
        {isTargeting && (
          <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 animate-target-lock">
            <div className="w-12 h-12 border-2 border-secondary rounded-full" 
                 style={{ boxShadow: 'var(--glow-secondary)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-secondary/50 rounded-full animate-pulse-glow" />
          </div>
        )}

        {/* Corner Brackets */}
        <div className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
          isTargeting ? 'opacity-100 scale-150' : 'opacity-50 scale-100'
        } transition-all duration-200`}>
          <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
          <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
          <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
          <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
        </div>
      </div>

      {/* Coordinates Display */}
      <div
        className="fixed pointer-events-none z-[9999] text-xs font-mono text-primary/70"
        style={{
          left: `${position.x + 20}px`,
          top: `${position.y + 20}px`,
        }}
      >
        [{position.x}, {position.y}]
        {isTargeting && <span className="ml-2 text-secondary">TARGET ACQUIRED</span>}
      </div>
    </>
  );
};
