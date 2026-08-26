"use client";

type WiicoLogoProps = {
    /** "light" = white bg / dark text (default), "dark" = solid blue bg / white text */
    variant?: "light" | "dark";
    /** Show the "INVESTMENT & EARNINGS" tagline under the wordmark */
    /** Rendered width; height scales automatically (viewBox is 640x200) */
    width?: number | string;
    className?: string;
};

const BLUE = "#1898F8";
const WHITE = "#ffffff";
const NAVY = "#0B2545";

export default function WiicoLogo({
    variant = "light",
    width = 240,
    className,
}: WiicoLogoProps) {
  const isDark = variant === "dark";

  const bg = isDark ? BLUE : WHITE;
  const wordmarkFill = isDark ? WHITE : NAVY;
  const accentFill = isDark ? WHITE : BLUE;

  return (
    <div
        className="w-full flex items-center justify-center h-full"
    >

        {/* Wordmark */}
        <h1
            className="text-[50px] tracking-wider font-extrabold text-[#1898F8]"
        >
            WII
            <span className="text-[#0B2545]">CO</span>
        </h1>
    </div>
  );
}