import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const SocialIcons = {
  // Source: Devicons (https://devicons.io)
  github: (props: IconProps) => (
    <svg
      viewBox="0 0 600 600"
      role="img"
      aria-label="GitHub"
      fill="currentColor"
      {...props}
    >
      <path d="M300 7.4a300 300 0 0 0-94.8 584.7c15 2.8 20.5-6.5 20.5-14.5l-.4-55.8c-83.5 18.1-101.1-35.4-101.1-35.4-13.7-34.7-33.3-43.9-33.3-43.9-27.3-18.6 2-18.2 2-18.2 30.1 2 46 30.9 46 30.9 26.8 45.8 70.2 32.6 87.3 25a64 64 0 0 1 19-40.2c-66.6-7.6-136.6-33.3-136.6-148.3a116 116 0 0 1 30.9-80.5c-3.1-7.5-13.4-38 2.9-79.4 0 0 25.2-8 82.5 30.8a288 288 0 0 1 150.3 0c57.2-38.8 82.4-30.8 82.4-30.8 16.3 41.3 6 71.9 3 79.4a116 116 0 0 1 30.8 80.5c0 115.3-70.2 140.6-137 148 10.8 9.4 20.4 27.6 20.4 55.6 0 40.2-.4 72.5-.4 82.3 0 8 5.4 17.4 20.6 14.4A300 300 0 0 0 300 7.4M112.4 434.8c-.7 1.5-3 1.9-5.2.9s-3.4-3-2.7-4.5c.7-1.6 3-2 5.2-1s3.4 3 2.7 4.6m14.7 13.1c-1.4 1.4-4.2.7-6.1-1.4-2-2-2.3-4.8-.9-6.2 1.5-1.3 4.2-.7 6.2 1.4s2.3 4.9.8 6.2m10.1 16.9c-1.8 1.3-4.8 0-6.7-2.6-1.8-2.7-1.8-5.9 0-7.2 2-1.2 4.9 0 6.8 2.6 1.8 2.7 1.8 5.9 0 7.2m17.2 19.5c-1.7 1.8-5.2 1.3-7.7-1.2-2.7-2.4-3.4-5.8-1.8-7.6 1.7-1.8 5.2-1.3 7.8 1.1s3.4 5.9 1.7 7.7m22 6.6c-.6 2.3-4 3.4-7.4 2.4s-5.6-3.8-5-6.2c.8-2.3 4.2-3.4 7.6-2.4s5.6 3.8 4.9 6.2m25.3 2.8c0 2.4-2.8 4.5-6.4 4.5-3.6.1-6.5-1.9-6.5-4.3 0-2.5 2.8-4.5 6.4-4.6s6.5 2 6.5 4.4m24.7-1c.4 2.4-2 5-5.6 5.6s-6.7-.9-7.1-3.3c-.5-2.4 2-5 5.5-5.6 3.6-.6 6.8.9 7.2 3.3" />
    </svg>
  ),
  // Source: Devicons (https://devicons.io)
  linkedin: (props: IconProps) => (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="LinkedIn"
      fill="currentColor"
      {...props}
    >
      <path d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z" />
    </svg>
  ),
  resume: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Resume"
      {...props}
    >
      <path
        d="M7 3.75h6.25L18 8.5v11.75H7V3.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M13 3.75V8.5h5M9.75 12h4.5M9.75 15.5h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  ),
  email: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Email"
      {...props}
    >
      <path
        d="M4 6.75h16v10.5H4V6.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m4.75 7.5 6.35 5.1a1.45 1.45 0 0 0 1.8 0l6.35-5.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  ),
};
