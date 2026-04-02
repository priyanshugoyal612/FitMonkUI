import API from "./api";

export const getDashboard = async () => {
  try {
    const response = await API.get("/api/dashboard");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    throw new Error(
      error.response?.data?.message || "Failed to load dashboard"
    );
  }
};