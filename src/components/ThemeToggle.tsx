import { memo } from "react";
import type { ThemeToggleProps } from "../types/task";


export const ThemeToggle = memo(({ dark, toggleTheme }: ThemeToggleProps) => {
  return (
    <button
      onClick={toggleTheme}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg
                 font-semibold transition-all duration-300 transform hover:scale-105
                 active:scale-95 shadow-md hover:shadow-lg mb-6 w-full sm:w-auto"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
});

