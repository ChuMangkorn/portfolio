// Entrance motion that never hides content from the HTML.
// Every section is visible in the server output. After hydration, anything still below the fold gets
// data-pending (hidden by globals.css) and is released as it nears the viewport. If a script fails to
// load, nothing was ever hidden. Used as a ref callback.
export function armReveal(el: HTMLElement | null) {
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (el.getBoundingClientRect().top < window.innerHeight) return;

  el.setAttribute("data-pending", "");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        el.removeAttribute("data-pending");
        observer.disconnect();
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
