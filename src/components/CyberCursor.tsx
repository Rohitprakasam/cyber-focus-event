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
      {/* Main Crosshair - Reduced Size */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isTargeting ? '0.8' : '0.6'})`,
        }}
      >
        {/* Center Dot */}
        <div className={`absolute inset-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isTargeting ? 'bg-secondary glow-secondary' : 'bg-primary glow-primary'
        } transition-colors duration-200`} />
        
        {/* Crosshair Lines */}
        <div className={`absolute w-5 h-[1px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
          isTargeting ? 'bg-secondary' : 'bg-primary'
        } transition-colors duration-200`}>
          <div className="absolute -left-6 top-0 w-4 h-[1px] bg-inherit" />
          <div className="absolute -right-6 top-0 w-4 h-[1px] bg-inherit" />
        </div>
        <div className={`absolute w-[1px] h-5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
          isTargeting ? 'bg-secondary' : 'bg-primary'
        } transition-colors duration-200`}>
          <div className="absolute left-0 -top-6 w-[1px] h-4 bg-inherit" />
          <div className="absolute left-0 -bottom-6 w-[1px] h-4 bg-inherit" />
        </div>

        {/* Targeting Ring */}
        {isTargeting && (
          <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 animate-target-lock">
            <div className="w-8 h-8 border border-secondary rounded-full" 
                 style={{ boxShadow: '0 0 10px hsl(var(--secondary) / 0.5)' }} />
          </div>
        )}

        {/* Corner Brackets */}
        <div className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
          isTargeting ? 'opacity-100' : 'opacity-50'
        } transition-all duration-200`}>
          <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
          <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
          <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${
            isTargeting ? 'border-secondary' : 'border-primary'
          }`} />
        </div>
      </div>
    </>
  );
};
