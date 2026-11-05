// Entrance motion that never hides content from the HTML.
// Everything is visible in the server output and stays visible until the reader first scrolls, so a script that
// fails to load, or a renderer that never scrolls (a full-page capture, a thumbnailer), sees the whole page.
// On the first scroll, wheel, key or touch, blocks still below the fold get data-pending (hidden by globals.css)
// and are released as they near the viewport. Used as a ref callback.
const ENGAGE_EVENTS = ["scroll", "wheel", "touchmove", "keydown"] as const;
const waiting = new Set<HTMLElement>();
const observers = new Map<HTMLElement, IntersectionObserver>();
let engaged = false;

function arm(el: HTMLElement) {
  if (!el.isConnected || el.getBoundingClientRect().top < window.innerHeight) return;
  el.setAttribute("data-pending", "");
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      el.removeAttribute("data-pending");
      observer.disconnect();
      observers.delete(el);
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  observer.observe(el);
  observers.set(el, observer);
}

function engage() {
  if (engaged) return;
  engaged = true;
  ENGAGE_EVENTS.forEach((type) => window.removeEventListener(type, engage));
  waiting.forEach(arm);
  waiting.clear();
}

export function armReveal(el: HTMLElement | null) {
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (engaged) {
    arm(el);
  } else {
    ENGAGE_EVENTS.forEach((type) => window.addEventListener(type, engage, { passive: true }));
    waiting.add(el);
  }
  return () => {
    waiting.delete(el);
    observers.get(el)?.disconnect();
    observers.delete(el);
  };
}
