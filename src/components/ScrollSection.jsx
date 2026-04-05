import useScrollTrigger from "../hooks/useScrollTrigger.js";

export default function ScrollSection({ children, className = "" }) {
  const { ref, isVisible } = useScrollTrigger();
  return (
    <section ref={ref} className={`scroll-section ${isVisible ? "scroll-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}
