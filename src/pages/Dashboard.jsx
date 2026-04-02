import AIInsights from "./AiInsight";
import UserCard from "./UserCard";
import StreakHeatmap from "./StreakHeatmap";
import CaloriesChart from "./CaloriesChart";
import DailyStatusCard from "./DailyStatusCard";
import { motion } from "framer-motion";
import { getDashboard } from "../services/dashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import WeeklyReport from "../pages/WeeklyReport";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getDashboard()
            .then((res) => setData(res))
            .catch((err) => alert(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/login");
        }
    };

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
                Error loading dashboard
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">

            {/* 🔥 Top Bar */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-2xl font-bold">FitMonk</h1>
                    <p className="text-gray-400 text-sm">
                        Welcome back 👋
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={() => navigate("/checkin")}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition"
                    >
                        🧘Monk Check-in
                    </Button>

                    <Button
                        onClick={() => navigate("/chat")}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm transition"
                    >
                        🧘 AI Coach
                    </Button>

                    <Button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition"
                    >
                        Logout
                    </Button>
                </div>

            </div>


            {/* 🔥 Top Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">

                <div className="md:col-span-1">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <UserCard user={data.user} />
                    </motion.div>
                </div>

                <div className="md:col-span-2">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <AIInsights insights={data.insights} />
                    </motion.div>
                </div>

            </div>

            <div className="mt-6 mb-6">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <WeeklyReport />
                </motion.div>
            </div>

            {/* 🔥 Bottom Section */}
            <div className="grid md:grid-cols-2 gap-6">

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <StreakHeatmap logs={data.logs} />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <CaloriesChart logs={data.logs} />
                </motion.div>

            </div>

        </div>
    );
}