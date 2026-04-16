import type { NavigateFunction } from "react-router-dom";

export function scrollToSection(sectionId: string, navigate: NavigateFunction) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    // Not on homepage — navigate there, then scroll after mount
    navigate("/");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
}
