"use client";

import { useEffect } from "react";

export default function SecurityProtection() {
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            // F12
            if (event.key === "F12") {
                event.preventDefault();
                return;
            }

            // Ctrl + Shift + I
            if (
                event.ctrlKey &&
                event.shiftKey &&
                key === "i"
            ) {
                event.preventDefault();
                return;
            }

            // Ctrl + Shift + J
            if (
                event.ctrlKey &&
                event.shiftKey &&
                key === "j"
            ) {
                event.preventDefault();
                return;
            }

            // Ctrl + Shift + C
            if (
                event.ctrlKey &&
                event.shiftKey &&
                key === "c"
            ) {
                event.preventDefault();
                return;
            }

            // Ctrl + U
            if (
                event.ctrlKey &&
                key === "u"
            ) {
                event.preventDefault();
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