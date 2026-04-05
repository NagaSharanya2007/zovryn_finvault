import { useEffect, useRef, useState } from "react";

export default function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    setCount(0);
    startRef.current = null;
    let raf;

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return count;
}
