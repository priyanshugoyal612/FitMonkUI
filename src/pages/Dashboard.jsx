import AIInsights from "./AiInsight";
import UserCard from "./UserCard";
import StreakHeatmap from "./StreakHeatmap";
import CaloriesChart from "./CaloriesChart";
import { motion } from "framer-motion";
import { getDashboard } from "../services/dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {

     const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDashboard()
      .then((res) => setData(res))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

      if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 text-red-400 flex items-center justify-center">
        Error: 
      </div>
    );
  }


    return (
        <div  className="min-h-screen bg-gray-950 text-white p-6">
            <h1 className="text-3xl text-center font-bold mb-6">FitMonk Dashboard</h1>


            {/* Top Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <UserCard user={data.user} />
                    </motion.div>
                </div>

                <div className="md:col-span-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <AIInsights insights={data.insights} />
                    </motion.div>

                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-6">

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <StreakHeatmap logs={data.logs} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <CaloriesChart logs={data.logs} />
                </motion.div>

            </div>
        </div>
    );
}