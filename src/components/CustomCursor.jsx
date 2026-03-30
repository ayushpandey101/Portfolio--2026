import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setLabel(target.getAttribute('data-cursor'));
        setIsVisible(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`custom-cursor ${isVisible ? 'visible' : ''}`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
       <div className="cursor-glass-circle">
         <span className="cursor-label">{label}</span>
       </div>
    </motion.div>
  );
};

export default CustomCursor;
