import { useEffect, useState } from "react";

export const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetBox, setTargetBox] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const interactiveElement = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.event-card');
      
      if (interactiveElement) {
        setTargetBox(interactiveElement.getBoundingClientRect());
      } else {
        setTargetBox(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-all duration-150"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${
          targetBox ? 'bg-secondary glow-secondary' : 'bg-primary glow-primary'
        } transition-all duration-200`} />
      </div>

      {/* Box Outline - Snaps to hovered elements */}
      {targetBox && (
        <div
          className="fixed pointer-events-none z-[9998] border-2 border-secondary transition-all duration-200 ease-out"
          style={{
            left: `${targetBox.left}px`,
            top: `${targetBox.top}px`,
            width: `${targetBox.width}px`,
            height: `${targetBox.height}px`,
            boxShadow: '0 0 20px hsl(var(--secondary) / 0.4), inset 0 0 20px hsl(var(--secondary) / 0.1)',
          }}
        >
          {/* Corner Indicators */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-secondary" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-secondary" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-secondary" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-secondary" />
          
          {/* Scanning Line */}
          <div 
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan opacity-50"
            style={{ top: '50%' }}
          />
        </div>
      )}
    </>
  );
};
