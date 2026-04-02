import React, { useState } from "react";
import { submitDailyLog } from "../services/checkin.service";
import { useNavigate } from "react-router";

const CheckInPage = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: today,
    calories: "",
    steps: "",
    focus: false,
    noDopamine: false,
    workout: false,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const payload = {
        calories: Number(formData.calories),
        steps: Number(formData.steps),
        focus: formData.focus,
        noDopamine: formData.noDopamine,
        workout: formData.workout,
        notes: formData.notes,
      };

      const res = await submitDailyLog(payload);
      setResponse(res);

      setFormData({
        date: today,
        calories: "",
        steps: "",
        focus: false,
        noDopamine: false,
        workout: false,
        notes: "",
      });

    } catch (error) {
      setResponse({
        message: "❌ Failed to submit check-in",
        aiFeedback: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">

        <h1 className="text-xl font-bold">🧘 Daily Check-In</h1>

        <div className="flex gap-2">

          {/* 🏠 Dashboard */}
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            🏠 Dashboard
          </button>

          {/* 💬 AI Coach */}
          <button
            onClick={() => navigate("/chat")}
            className="px-3 py-1 text-sm bg-purple-500 hover:bg-purple-600 rounded-lg"
          >
            💬 AI Coach
          </button>

          {/* 🚪 Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Logout
          </button>

        </div>
      </div>

      {/* 🔥 CARD */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6 mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Daily Monk Check-In
        </h2>

        {response && (
          <div className="mb-4 text-center">
            <p className="text-green-400 font-medium">{response.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              disabled
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Calories</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Steps</label>
            <input
              type="number"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
              <input type="checkbox" name="workout" checked={formData.workout} onChange={handleChange} />
              Workout
            </label>

            <label className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
              <input type="checkbox" name="focus" checked={formData.focus} onChange={handleChange} />
              Focus
            </label>

            <label className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg col-span-2">
              <input type="checkbox" name="noDopamine" checked={formData.noDopamine} onChange={handleChange} />
              No Dopamine
            </label>
          </div>

          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit Check-In"}
          </button>

        </form>

        {response?.aiFeedback?.length > 0 && (
          <div className="mt-6 bg-gray-800 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 text-green-400">
              AI Monk Feedback
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {response.aiFeedback.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckInPage;