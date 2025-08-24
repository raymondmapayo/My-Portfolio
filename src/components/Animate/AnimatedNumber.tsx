// AnimatedNumber.tsx
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  target: number;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  duration = 1500,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let animationFrame: number;

    const updateCount = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
        cancelAnimationFrame(animationFrame);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <>{count}</>;
};

export default AnimatedNumber;
