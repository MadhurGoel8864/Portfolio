import { useState, useEffect } from 'react';

/**
 * Tracks which section is currently visible using IntersectionObserver.
 * @param {string[]} sectionIds - array of element IDs to observe
 * @returns {string} the id of the currently visible section
 */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [sectionIds]);

  return active;
}
