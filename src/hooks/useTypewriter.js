import { useState, useEffect, useRef } from 'react';

/**
 * Typewriter hook — cycles through an array of strings.
 * @param {string[]} words  - array of strings to cycle through
 * @param {number}   typeSpeed   - ms per character when typing   (default 80)
 * @param {number}   deleteSpeed - ms per character when deleting (default 40)
 * @param {number}   pauseAfter  - ms to pause before deleting    (default 2000)
 */
export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pauseAfter = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex]     = useState(0);
  const [isTyping, setIsTyping]       = useState(true);
  const timeout = useRef(null);

  useEffect(() => {
    if (!words.length) return;

    const current = words[wordIndex % words.length];

    const tick = () => {
      if (isTyping) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          // Pause then start deleting
          timeout.current = setTimeout(() => setIsTyping(false), pauseAfter);
          return;
        }
        timeout.current = setTimeout(tick, typeSpeed);
      } else {
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          timeout.current = setTimeout(tick, deleteSpeed);
        } else {
          setWordIndex(i => i + 1);
          setIsTyping(true);
        }
      }
    };

    timeout.current = setTimeout(tick, isTyping ? typeSpeed : deleteSpeed);
    return () => clearTimeout(timeout.current);
  }, [displayText, isTyping, wordIndex, words, typeSpeed, deleteSpeed, pauseAfter]);

  return { displayText, isTyping };
}
