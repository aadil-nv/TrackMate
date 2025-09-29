import { useState, useCallback, useEffect } from "react";

export const useTheme = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = useCallback(() => setDark((prev) => !prev), []);
  
  return { dark, toggleTheme };
};