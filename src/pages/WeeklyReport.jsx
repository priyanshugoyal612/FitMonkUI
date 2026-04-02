import { useEffect, useState } from "react";
import { getWeeklyReport } from "../services/weekly.report";
import { useNavigate } from "react-router";

export default function WeeklyReport() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await getWeeklyReport();
      setReport(res);
    } catch (e) {
      setReport("⚠️ Failed to load weekly report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const parseReport = (text) => {
    const sections = {
      score: "",
      streak: "",
      strength: [],
      weakness: [],
      action: [],
    };

    const lines = text.split("\n");
    let current = "";

    lines.forEach((line) => {
      const clean = line.trim();

      if (clean.startsWith("Score")) sections.score = clean;
      else if (clean.startsWith("Streak")) sections.streak = clean;
      else if (clean.startsWith("Strength")) current = "strength";
      else if (clean.startsWith("Weakness")) current = "weakness";
      else if (clean.startsWith("Action")) current = "action";
      else if (clean.startsWith("-") && current) {
        sections[current].push(clean.replace("-", "").trim());
      }
    });

    return sections;
  };

  const parsed = parseReport(report);

// detect if parsing failed
const isStructured =
  parsed.score || parsed.strength.length || parsed.weakness.length || parsed.action.length;

  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">🔥 Weekly Report</h2>

        <div className="flex gap-2">
          <button
            onClick={fetchReport}
            className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded"
          >
            Refresh
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="text-xs px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded"
          >
            Ask AI
          </button>
        </div>
      </div>
    {loading ? (
  <p className="text-gray-400 text-sm">Generating report...</p>
) : isStructured ? (
  <div className="space-y-4 text-sm">

    <div className="flex gap-4">
      <div className="bg-gray-800 px-4 py-2 rounded-lg">
        {parsed.score || "Score: -"}
      </div>
      <div className="bg-gray-800 px-4 py-2 rounded-lg">
        {parsed.streak || "Streak: -"}
      </div>
    </div>

    {parsed.strength.length > 0 && (
      <div>
        <h3 className="text-green-400 font-semibold mb-1">Strength</h3>
        <ul className="space-y-1 text-gray-300">
          {parsed.strength.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    )}

    {parsed.weakness.length > 0 && (
      <div>
        <h3 className="text-red-400 font-semibold mb-1">Weakness</h3>
        <ul className="space-y-1 text-gray-300">
          {parsed.weakness.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    )}

    {parsed.action.length > 0 && (
      <div>
        <h3 className="text-blue-400 font-semibold mb-1">Action</h3>
        <ul className="space-y-1 text-gray-300">
          {parsed.action.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    )}

  </div>
) : (
  // 🔥 FALLBACK (THIS FIXES YOUR ISSUE)
  <div className="text-sm text-gray-300 whitespace-pre-line space-y-2">
    {report}
  </div>
)}
      
    </div>
  );
}