'use client';
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

interface ThemeContextType {
  theme?: string;
  changeTheme?: (nextTheme?: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        setTheme(localStorage.getItem("theme") ?? "light");
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const changeTheme = useCallback((event?: any) => {
        const nextTheme: string | null = event.target.value || null;
        if (nextTheme) {
            setTheme(nextTheme);
        } else {
            setTheme((prev) => (prev === "light" ? "dark" : "light"));
        }
    },[]);
    return (
        <ThemeContext.Provider value={useMemo(() => ({ theme, changeTheme }), [theme, changeTheme])}>
            {children}
        </ThemeContext.Provider>
    );
}