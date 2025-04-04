"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(null); 

  useEffect(() => {
    const storedMode = localStorage.getItem("theme") || "light";
    setMode(storedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  if (mode === null) {
    return <div style={{ backgroundColor: "#121212", height: "100vh" }} />; 
  }

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: { default: "#121212", paper: "#1e1e1e" },
            text: { primary: "#ffffff" },
          }
        : {
            background: { default: "#ffffff", paper: "#f5f5f5" },
            text: { primary: "#000000" },
          }),
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
