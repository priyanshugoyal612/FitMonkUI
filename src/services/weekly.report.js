import API from "./api";

export const getWeeklyReport = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/fit/monk/ai/report/weekly", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};