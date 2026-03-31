import { useEffect, useState } from "react";
import { getInsights } from "../api/api";

export default function Insights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getInsights().then(res => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Weekly Insights</h1>

      <p>Workout %: {data.workoutPercentage}</p>
      <p>Distraction %: {data.distractionPercentage}</p>
      <p>Avg Calories: {data.avgCalories}</p>
    </div>
  );
}