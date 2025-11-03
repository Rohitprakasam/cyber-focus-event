import { useEffect, useState, useRef } from "react";

export const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [targetBox, setTargetBox] = useState<DOMRect | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });

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
      {/* Main Cursor - Rotating Box */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-all duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
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
          className="fixed pointer-events-none z-[9998] border-2 border-secondary transition-all duration-200 ease-out"
          style={{
            left: `${targetBox.left}px`,
            top: `${targetBox.top}px`,
            width: `${targetBox.width}px`,
            height: `${targetBox.height}px`,
            boxShadow: '0 0 20px hsl(var(--secondary) / 0.4), inset 0 0 20px hsl(var(--secondary) / 0.1)',
          }}
        >
          {/* Corner Brackets */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-secondary" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-secondary" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-secondary" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-secondary" />
        </div>
      )}
    </>
  );
};
