import { useEffect, useState, useRef } from "react";

export const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [targetBox, setTargetBox] = useState<DOMRect | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate rotation based on movement direction
      const deltaX = newX - lastPosition.current.x;
      const deltaY = newY - lastPosition.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > 2) {
        setRotation(prev => (prev + distance * 0.5) % 360);
        lastPosition.current = { x: newX, y: newY };
      }
      
      setPosition({ x: newX, y: newY });
      
      // Cancel previous RAF if any
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Update target box on next frame
      rafRef.current = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const interactiveElement = 
          target.closest('button') || 
          target.closest('a') || 
          target.closest('[role="button"]') ||
          target.closest('.event-card') ||
          target.closest('input') ||
          target.closest('textarea');
        
        if (interactiveElement) {
          const rect = interactiveElement.getBoundingClientRect();
          setTargetBox(rect);
        } else {
          setTargetBox(null);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main Cursor - Rotating Box */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <div className={`w-4 h-4 border-2 ${
          targetBox ? 'border-secondary' : 'border-primary'
        } transition-colors duration-200`}
             style={{
               boxShadow: targetBox 
                 ? '0 0 10px hsl(var(--secondary) / 0.6), inset 0 0 10px hsl(var(--secondary) / 0.3)'
                 : '0 0 8px hsl(var(--primary) / 0.5), inset 0 0 8px hsl(var(--primary) / 0.2)'
             }}
        >
          {/* Inner dot */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
            targetBox ? 'bg-secondary' : 'bg-primary'
          }`} />
        </div>
      </div>

      {/* Box Outline - Expands to fit hovered elements */}
      {targetBox && (
        <div
          className="fixed pointer-events-none z-[9998] border-2 border-secondary"
          style={{
            left: `${targetBox.left - 2}px`,
            top: `${targetBox.top - 2}px`,
            width: `${targetBox.width + 4}px`,
            height: `${targetBox.height + 4}px`,
            boxShadow: '0 0 20px hsl(var(--secondary) / 0.4), inset 0 0 20px hsl(var(--secondary) / 0.1)',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Corner Brackets */}
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-secondary" />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-secondary" />
          <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-secondary" />
          <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-secondary" />
          
          {/* Scanning Line */}
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan opacity-60"
            style={{ top: '50%' }}
          />
        </div>
      )}
    </>
  );
};
