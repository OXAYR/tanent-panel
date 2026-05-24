import * as React from "react";

export function LoginBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute top-0 right-0 w-[80%] h-[120%] opacity-30 translate-x-[10%] -translate-y-[10%]"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M800 150C650 100 450 180 400 400C350 620 500 750 600 800"
          className="stroke-primary opacity-25"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M800 300C700 250 550 320 520 480C490 640 600 750 700 800"
          className="stroke-primary opacity-15"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M100 800C150 700 350 650 550 750C750 850 800 750 800 700"
          className="stroke-primary opacity-20"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
