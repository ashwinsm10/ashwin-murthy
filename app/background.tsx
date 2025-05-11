import { motion } from "framer-motion";

export const ParallaxBackground = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <motion.svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
    >
      {/* Define our gradients */}
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(252,211,77,1)" />
          <stop offset="100%" stopColor="rgba(252,211,77,0.6)" />
        </radialGradient>
        <radialGradient id="mercuryGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bbb" />
          <stop offset="100%" stopColor="#777" />
        </radialGradient>
        <radialGradient id="saturnGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f9c74f" />
          <stop offset="100%" stopColor="#f9844a" />
        </radialGradient>
        <radialGradient id="earthGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4DA8DA" />
          <stop offset="100%" stopColor="#1768AC" />
        </radialGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="8"
        fill="url(#sunGrad)"
        filter="url(#sunGlow)"
      />

      {/* Orbits */}
      {[15, 30, 45].map((r) => (
        <circle
          key={`orbit-${r}`}
          cx="50"
          cy="50"
          r={r}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.4"
          fill="none"
        />
      ))}

      {/* Planets data */}
      {[
        {
          name: "mercury",
          r: 15,
          size: 2,
          gradient: "url(#mercuryGrad)",
          duration: 60,
          scalePulse: true,
        },
        {
          name: "saturn",
          r: 30,
          size: 3,
          gradient: "url(#saturnGrad)",
          duration: 90,
          hasRing: true,
          ringRx: 4.5,
          ringRy: 1,
          ringRotation: 25,
        },
        {
          name: "earth",
          r: 45,
          size: 3.5,
          gradient: "url(#earthGrad)",
          duration: 120,
        },
      ].map(
        (
          {
            r,
            size,
            gradient,
            duration,
            scalePulse,
            hasRing,
            ringRx,
            ringRy,
            ringRotation,
          },
          i
        ) => (
          <motion.g
            key={`planet-${i}`}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "50%", originY: "50%" }}
          >
            {/* Optional pulsation */}
            <motion.circle
              cx={50 + r}
              cy={50}
              r={size}
              fill={gradient}
              {...(scalePulse
                ? {
                    animate: { scale: [1, 1.2, 1] },
                    transition: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : {})}
            />

            {/* Optional ring (Saturn) */}
            {hasRing && (
              <ellipse
                cx="50"
                cy="50"
                rx={ringRx}
                ry={ringRy}
                fill="none"
                stroke="rgba(250,250,250,0.4)"
                strokeWidth="0.8"
                transform={`
                translate(${50 + r - 50}, 0)
                rotate(${ringRotation} 50 50)
              `}
              />
            )}
          </motion.g>
        )
      )}
    </motion.svg>

    {/* subtle overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-900/40" />
  </div>
);
