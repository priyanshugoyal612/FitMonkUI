import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function CaloriesChart({ logs = [] }) {

  // ✅ Convert backend logs → chart data
  const data = logs
    .map((log) => ({
      day: dayjs(log.logDate).format("DD MMM"),
      calories: log.caloriesIntake || 0,
    }))
    .sort((a, b) => new Date(a.day) - new Date(b.day));

  if (data.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl">
        No calorie data
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 
      border border-gray-800 
      rounded-2xl p-6 shadow-xl">

      <h2 className="text-xl mb-4">Calories Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}