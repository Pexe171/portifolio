import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.style.opacity = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1000,
              easing: 'easeOutQuad'
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}
