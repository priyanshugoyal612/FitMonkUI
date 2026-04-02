import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", {
        userId,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (e) {
      setError("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-800">

        {/* 🔥 Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">🧘 FitMonk</h1>
          <p className="text-gray-400 text-sm">
            Enter Monk Mode
          </p>
        </div>

        {/* ❌ Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        {/* 🔐 Inputs */}
        <div className="space-y-4">

          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-purple-500"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-purple-500"
          />

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? "Entering..." : "Enter Monk Mode"}
          </Button>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          No excuses. Only discipline.
        </p>

      </div>
    </div>
  );
}