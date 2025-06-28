'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

const TypingAnimation = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  showCursor = true 
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
          
          // Hide cursor after typing is complete
          if (!showCursor) {
            setTimeout(() => setShowBlinkingCursor(false), 500);
          }
        }
      }, speed);

      return () => clearInterval(typeTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && showBlinkingCursor && (
        <span className="animate-pulse text-purple-400">|</span>
      )}
    </span>
  );
};

export default TypingAnimation; 