import dayjs from "dayjs";

export default function StreakHeatmap({ logs = [] }) {

  // ✅ Convert logs into fast lookup map
  const logMap = new Map(
    logs.map(l => [
      dayjs(l.logDate).format("YYYY-MM-DD"),
      l
    ])
  );

  // ✅ Generate last 30 days properly
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = dayjs().subtract(29 - i, "day");

    const log = logMap.get(date.format("YYYY-MM-DD"));

    return {
      date,
      value: log ? Math.floor((log.score || 0) / 25) : 0,
    };
  });

  // ✅ Color logic
  const getColor = (val) => {
    if (val === 0) return "bg-gray-800";
    if (val < 2) return "bg-green-900";
    if (val < 4) return "bg-green-600";
    return "bg-green-400";
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl">
      <h2 className="text-xl mb-2">Streak Heatmap</h2>
      <p className="text-gray-400 text-sm mb-4">Last 30 days</p>

      <div className="grid grid-cols-10 gap-2">
        {data.map((d, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded ${getColor(d.value)}`}
            title={`${d.date.format("DD MMM YYYY")} • Score: ${d.value * 25}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-800"></div>
          <div className="w-3 h-3 bg-green-900"></div>
          <div className="w-3 h-3 bg-green-600"></div>
          <div className="w-3 h-3 bg-green-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}