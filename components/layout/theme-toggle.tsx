"use client";

import { IconMoon, IconSun } from "@/components/icons";

export function ThemeToggle({ className = "inline-flex" }: { className?: string }) {
  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      className={`size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
      onClick={toggle}
      aria-label="Toggle dark mode"
    >
      <span className="theme-moon">
        <IconMoon width={18} height={18} />
      </span>
      <span className="theme-sun">
        <IconSun width={18} height={18} />
      </span>
    </button>
  );
}
