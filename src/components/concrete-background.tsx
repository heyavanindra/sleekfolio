export function ConcreteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen print:hidden"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1672 941"
        preserveAspectRatio="xMidYMid slice"
        className="block size-full"
      >
        <defs>
          {/* Broad, slow-moving tonal drift: gives the wall depth without any visible gradient */}
          <filter
            id="concrete-drift"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0022 0.0032"
              numOctaves={3}
              seed={9}
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.86
                      0 0 0 0 0.80
                      0 0 0 0 0.72
                      1.1 0 0 0 -0.45"
            />
          </filter>

          {/* Plaster mottling: cloudy patches, warm off-white */}
          <filter
            id="concrete-mottle"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007 0.009"
              numOctaves={5}
              seed={14}
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.86
                      0 0 0 0 0.80
                      0 0 0 0 0.72
                      1 0 0 0 -0.42"
            />
          </filter>

          {/* Mid grain: the "cement paste" feel */}
          <filter
            id="concrete-grain"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves={4}
              seed={3}
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.86
                      0 0 0 0 0.80
                      0 0 0 0 0.72
                      0.9 0 0 0 -0.36"
            />
          </filter>

          {/* Pores: tiny dark pits that break up the surface */}
          <filter
            id="concrete-pores"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.11"
              numOctaves={3}
              seed={42}
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      1 0 0 0 0"
            />
            <feComponentTransfer>
              <feFuncA
                type="discrete"
                tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1"
              />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation={0.5} />
          </filter>

          {/* Film grain: very fine, keeps large dark areas from looking flat/banded */}
          <filter
            id="concrete-film"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              seed={11}
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.9
                      0 0 0 0 0.85
                      0 0 0 0 0.78
                      1 0 0 0 -0.42"
            />
          </filter>
        </defs>

        {/* Floor sits a touch below #0e0d0c; subtle texture layers lift it softly */}
        <rect width="100%" height="100%" fill="#0a0908" />

        <rect width="100%" height="100%" filter="url(#concrete-drift)" opacity={0.07} />
        <rect width="100%" height="100%" filter="url(#concrete-mottle)" opacity={0.055} />
        <rect width="100%" height="100%" filter="url(#concrete-grain)" opacity={0.04} />
        <rect width="100%" height="100%" filter="url(#concrete-pores)" opacity={0.22} />
        <rect width="100%" height="100%" filter="url(#concrete-film)" opacity={0.022} />
      </svg>
    </div>
  );
}
