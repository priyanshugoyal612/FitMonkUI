import axios from "axios";
import API from "./api";

const API_URL = "http://localhost:8080/fit/monk/ai/chat";



export const getInsights = () => API.get("/monk/insights/weekly");

export const getLogin = (userId,password) => API.post("/auth/login", {
    userId,
    password,
  });

export const sendMessage = async (message,conversationId)=> {

     const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}`, message,{
        headers: {
            conversationId: conversationId,
            Authorization: `Bearer ${token}`,
            
        },
        
     });

     return response.data;
    };



