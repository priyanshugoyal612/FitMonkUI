import API from "./api";

export const submitDailyLog = async (data) => {
  const res = await API.post("/api/logs", data);
  return res.data;
};