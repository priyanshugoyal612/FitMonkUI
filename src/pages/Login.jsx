import { useState } from "react";

import API from "../services/api";
import { useNavigate } from "react-router"

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        userId,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/chat"); // redirect to dashboard
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <Input
          className="border p-2 w-full mb-2"
          placeholder="User ID"
          onChange={e => setUserId(e.target.value)}
        />

        <Input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          className="bg-black text-white w-full p-2"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}