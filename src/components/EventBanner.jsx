// EventBanner.jsx
export default function EventBanner({ title, top, left, scale = 1 }) {
  const isAbsolute = top !== undefined || left !== undefined;

  return (
    <div
      role="heading"
      aria-level="2"
      style={{
        position: isAbsolute ? "absolute" : "static",
        top: top ?? "auto",
        left: left ?? "auto",

        // 🔥 escalar todo el banner
        transform: `scale(${scale})`,
        transformOrigin: "top left",

        width: 640, // tamaño base en px para cálculo interno
        userSelect: "none",
        zIndex: 20,
      }}
    >
      <svg
        viewBox="0 0 800 120"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f7e6c9" />
            <stop offset="0.6" stopColor="#f0d9b0" />
            <stop offset="1" stopColor="#e6c893" />
          </linearGradient>

          <filter id="drop" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="8"
              floodColor="#000"
              floodOpacity="0.35"
            />
          </filter>

          <filter id="textShadow">
            <feOffset dx="0" dy="2" result="off" />
            <feGaussianBlur in="off" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="
            M10,30
            C40,10 140,10 200,30
            L600,30
            C660,10 760,10 790,30
            C780,70 740,90 700,90
            L100,90
            C60,90 20,70 10,30 Z
          "
          fill="url(#g)"
          stroke="#d1a85a"
          strokeWidth="3"
          filter="url(#drop)"
        />

        <path
          d="M100,90 C140,95 180,80 240,92 C300,106 360,88 420,96 C480,104 540,90 600,92"
          fill="none"
          stroke="#caa86f"
          strokeWidth="2"
          opacity="0.7"
        />

        <path
          d="M12,32 C42,12 142,12 202,32 L598,32 C658,12 758,12 788,32"
          fill="none"
          stroke="#b8873f"
          strokeWidth="2"
          opacity="0.6"
        />

        <text
          x="50%"
          y="56"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="34"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#2b2b2b"
          style={{ letterSpacing: "1px" }}
          filter="url(#textShadow)"
        >
          {title}
        </text>
      </svg>
    </div>
  );
}
