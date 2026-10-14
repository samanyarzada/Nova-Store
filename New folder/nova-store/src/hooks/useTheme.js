import { useCallback, useEffect, useState } from "react";

const KEY = "nova:theme";

function savedTheme() {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; // storage can be blocked (private mode)
  }
}

function systemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Theme order of priority: the user's saved choice, then the system setting.
export default function useTheme() {
  const [theme, setTheme] = useState(() => savedTheme() ?? systemTheme());

  // Apply the theme to <html data-theme="..."> so CSS can react to it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Until the user picks a theme, follow the system setting live
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return;
    const onChange = () => {
      if (!savedTheme()) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";

    // Brief colour transition, removed again right after
    const root = document.documentElement;
    root.classList.add("theme-anim");
    setTimeout(() => root.classList.remove("theme-anim"), 350);

    setTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return [theme, toggleTheme];
}
