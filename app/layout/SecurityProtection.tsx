"use client";

import { useEffect } from "react";

export default function SecurityProtection() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }

            // Ctrl + Shift + I
            if (
                e.ctrlKey &&
                e.shiftKey &&
                e.key.toLowerCase() === "i"
            ) {
                e.preventDefault();
            }

            // Ctrl + Shift + J
            if (
                e.ctrlKey &&
                e.shiftKey &&
                e.key.toLowerCase() === "j"
            ) {
                e.preventDefault();
            }

            // Ctrl + Shift + C
            if (
                e.ctrlKey &&
                e.shiftKey &&
                e.key.toLowerCase() === "c"
            ) {
                e.preventDefault();
            }

            // Ctrl + U
            if (
                e.ctrlKey &&
                e.key.toLowerCase() === "u"
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener(
            "contextmenu",
            handleContextMenu
        );

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "contextmenu",
                handleContextMenu
            );

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);

    return null;
}