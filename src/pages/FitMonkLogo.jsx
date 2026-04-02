export default function FitMonkLogo({ size = 120 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Neon Circle */}
        <circle
          cx="100"
          cy="100"
          r="85"
          stroke="#22c55e"
          strokeWidth="4"
          fill="none"
        />

        {/* Hood */}
        <path
          d="M60 80 Q100 20 140 80 Q120 140 80 140 Q60 110 60 80"
          fill="#0f172a"
        />

        {/* Dumbbell */}
        <rect x="60" y="100" width="80" height="8" fill="#22c55e" />
        <rect x="50" y="95" width="10" height="18" fill="#22c55e" />
        <rect x="140" y="95" width="10" height="18" fill="#22c55e" />
      </svg>

      {/* Text */}
      <h1 className="text-2xl font-bold tracking-widest">
        <span className="text-green-500">FIT</span>
        <span className="text-white">MONK</span>
      </h1>

      <p className="text-xs text-gray-400 tracking-wider">
        DISCIPLINE • STRENGTH • TECH
      </p>
    </div>
  );
}