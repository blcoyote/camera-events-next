"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function ClientThemeWrapper({ children }: any) {
    const { theme } = useContext(ThemeContext);
    return (
        <div data-theme={theme}>
            {children}
        </div>
    );
}