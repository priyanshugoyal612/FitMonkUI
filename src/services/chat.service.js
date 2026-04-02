import API from "./api";

// get or create conversationId
export const getConversationId = () => {
  let id = localStorage.getItem("conversationId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("conversationId", id);
  }

  return id;
};

// reset conversation (new chat)
export const resetConversationId = () => {
  const newId = crypto.randomUUID();
  localStorage.setItem("conversationId", newId);
  return newId;
};

// send message
export const sendMessage = async (message) => {
  const token = localStorage.getItem("token");
  const conversationId = getConversationId();

  const response = await API.post("/fit/monk/ai/chat", message, {
    headers: {
      "Content-Type": "text/plain",
      conversationId: conversationId,
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};