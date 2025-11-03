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
      {/* Orbital Cursor System */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isTargeting ? '1.3' : '1'})`,
        }}
      >
        {/* Center Core */}
        <div className={`absolute inset-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isTargeting ? 'bg-secondary glow-secondary' : 'bg-primary glow-primary'
        } transition-all duration-200`} />
        
        {/* Inner Ring */}
        <div className={`absolute inset-0 -translate-x-1/2 -translate-y-1/2 ${
          isTargeting ? 'animate-spin-slow' : ''
        }`}>
          <div className={`w-8 h-8 border ${
            isTargeting ? 'border-secondary' : 'border-primary/50'
          } rounded-full transition-colors duration-200`} 
               style={{ borderStyle: 'dashed', borderWidth: '1px' }} />
        </div>

        {/* Outer Ring */}
        <div className={`absolute inset-0 -translate-x-1/2 -translate-y-1/2 ${
          isTargeting ? 'opacity-100' : 'opacity-40'
        } transition-opacity duration-200`}>
          <div className={`w-12 h-12 border ${
            isTargeting ? 'border-secondary/60' : 'border-primary/30'
          } rounded-full transition-colors duration-200`} />
        </div>

        {/* Orbital Particles */}
        {[0, 90, 180, 270].map((rotation, index) => (
          <div
            key={index}
            className={`absolute inset-0 -translate-x-1/2 -translate-y-1/2 ${
              isTargeting ? 'animate-spin' : ''
            }`}
            style={{
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              animationDuration: '3s',
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div 
              className={`absolute w-1 h-1 rounded-full ${
                isTargeting ? 'bg-secondary' : 'bg-primary'
              } transition-colors duration-200`}
              style={{
                top: '50%',
                left: 'calc(50% + 20px)',
                transform: 'translate(-50%, -50%)',
                boxShadow: isTargeting 
                  ? '0 0 8px hsl(var(--secondary))' 
                  : '0 0 6px hsl(var(--primary))'
              }}
            />
          </div>
        ))}

        {/* Targeting Corners */}
        {isTargeting && (
          <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-secondary" />
          </div>
        )}
      </div>
    </>
  );
};
