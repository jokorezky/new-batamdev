import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const generateRandomPosition = () =>
  Array.from({ length: 10 }, () => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
  }));

const generateRandomLines = () =>
  Array.from({ length: 5 }, () => ({
    x1: Math.random() * 800,
    y1: Math.random() * 600,
    x2: Math.random() * 800,
    y2: Math.random() * 600,
  }));

const ChipAnimation = () => {
  const [circles, setCircles] = useState(generateRandomPosition);
  const [lines, setLines] = useState(generateRandomLines);

  // Springs for smooth animation
  const circleSprings = circles.map((circle) => ({
    x: useSpring(circle.x, { stiffness: 50, damping: 10 }),
    y: useSpring(circle.y, { stiffness: 50, damping: 10 }),
  }));

  const lineSprings = lines.map((line) => ({
    x1: useSpring(line.x1, { stiffness: 50, damping: 10 }),
    y1: useSpring(line.y1, { stiffness: 50, damping: 10 }),
    x2: useSpring(line.x2, { stiffness: 50, damping: 10 }),
    y2: useSpring(line.y2, { stiffness: 50, damping: 10 }),
  }));

  useEffect(() => {
    const updatePositions = () => {
      const newCircles = generateRandomPosition();
      const newLines = generateRandomLines();

      setCircles(newCircles);
      setLines(newLines);

      // Update spring values
      newCircles.forEach((circle, i) => {
        if (circleSprings[i]) {
          circleSprings[i].x.set(circle.x);
          circleSprings[i].y.set(circle.y);
        }
      });

      newLines.forEach((line, i) => {
        if (lineSprings[i]) {
          lineSprings[i].x1.set(line.x1);
          lineSprings[i].y1.set(line.y1);
          lineSprings[i].x2.set(line.x2);
          lineSprings[i].y2.set(line.y2);
        }
      });
    };

    const interval = setInterval(updatePositions, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 120px, rgba(0,0,0,0.95) 300px)`,
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none">
        {circleSprings.map((spring, i) => (
          <motion.circle
            key={i}
            cx={spring.x}
            cy={spring.y}
            r="4"
            fill="red"
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: Math.random() }}
          />
        ))}

        {lineSprings.map((spring, i) => (
          <motion.line
            key={i}
            x1={spring.x1}
            y1={spring.y1}
            x2={spring.x2}
            y2={spring.y2}
            stroke="red"
            strokeWidth="1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: Math.random() }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ChipAnimation;
