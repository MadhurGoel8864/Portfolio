import { useEffect, useRef, useState } from 'react';

const LINES = [
  { text: '> initializing kernel...', color: '#3ddc84', delay: 0 },
  { text: '> loading [auth] [websocket] [redis] [postgres]', color: '#3ddc84', delay: 80 },
  { text: '> mounting /api/v1 ...', color: '#3ddc84', delay: 150 },
  { text: '> judge0 executor: ONLINE', color: '#3ddc84', delay: 220 },
  { text: '> redis: 10 workers connected', color: '#3ddc84', delay: 290 },
  { text: '', color: '#3ddc84', delay: 360 },
  { text: '> GET /api/engineer/madhur-goel HTTP/1.1', color: '#C8A951', delay: 400 },
  { text: '  Accept: application/json', color: '#818cf8', delay: 460 },
  { text: '', color: '#f0ede6', delay: 500 },
  { text: '< HTTP/1.1 200 OK', color: '#3ddc84', delay: 540 },
  { text: '{', color: '#f0ede6', delay: 580 },
  { text: '  "name":     "Madhur Goel",', color: '#f0ede6', delay: 610 },
  { text: '  "role":     "Backend Engineer",', color: '#f0ede6', delay: 640 },
  { text: '  "location": "Gurgaon, India",', color: '#f0ede6', delay: 670 },
  { text: '  "status":   "open_to_work",', color: '#3ddc84', delay: 700 },
  { text: '  "lc_rating": 1880,', color: '#C8A951', delay: 730 },
  { text: '  "live_project": "devduel.site"', color: '#C8A951', delay: 760 },
  { text: '}', color: '#f0ede6', delay: 790 },
  { text: '', color: '#f0ede6', delay: 820 },
  { text: '> rendering portfolio...', color: '#3ddc84', delay: 860 },
];

export function BootSequence() {
  const [shown] = useState(() => sessionStorage.getItem('bootShown') === 'true');
  const [visible, setVisible] = useState(!shown);
  const [shownLines, setShownLines] = useState([]);
  const bootRef = useRef(null);

  useEffect(() => {
    if (shown) return;

    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setShownLines(prev => [...prev, i]);
      }, line.delay)
    );

    const lastDelay = LINES[LINES.length - 1].delay + 380;
    const fadeTimer = setTimeout(() => {
      if (bootRef.current) {
        // FIX #8: Disable pointer-events as soon as fade begins so the page becomes
        // scrollable/clickable during the fade-out rather than only after unmount
        bootRef.current.style.pointerEvents = 'none';
        bootRef.current.classList.add('fade-out');
      }
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('bootShown', 'true');
      }, 650);
    }, lastDelay);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
    };
  }, [shown]);

  if (!visible) return null;

  return (
    <div ref={bootRef} id="boot">
      <div id="boot-lines">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={`boot-line${shownLines.includes(i) ? ' show' : ''}`}
            style={{ color: line.color }}
          >
            {line.text || ' '}
          </div>
        ))}
      </div>
    </div>
  );
}
