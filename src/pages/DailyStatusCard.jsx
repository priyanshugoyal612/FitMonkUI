import { useNavigate } from "react-router";

export default function DailyStatusCard({ checkedIn, score, streak }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 mb-6">

      {!checkedIn ? (
        <>
          <h2 className="text-lg font-semibold mb-2">
            📅 Today: Not Checked-In
          </h2>

          <p className="text-sm text-gray-400 mb-3">
            🔥 Streak: {streak} days
          </p>

          <p className="text-sm text-red-400 mb-4">
            ⚠️ You may lose your streak today
          </p>

          <button
            onClick={() => navigate("/checkin")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition"
          >
            Complete Check-in
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">
            ✅ Today Completed
          </h2>

          <p className="text-sm text-gray-400 mb-3">
            🔥 Streak: {streak} days
          </p>

          <p className="text-sm text-green-400 mb-4">
            🎯 Score: {score}/100
          </p>

          <button
            onClick={() => navigate("/chat")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm transition"
          >
            Improve with AI Coach
          </button>
        </>
      )}

    </div>
  );
}