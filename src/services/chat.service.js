import axios from "axios";

const API_URL = "http://localhost:8080/fit/monk/ai/chat";



export const sendMessage = async (message,conversationId)=> {

    const response = await axios.post(`${API_URL}`, message,{
        headers: {
            conversationId: conversationId
        },
     });

     return response.data;
    };



