import React from "react"
import { Button } from "../components/ui/button"
import { Bot } from "lucide-react"
import { useNavigate } from "react-router"

function ChatHome()
{

    const navigate= useNavigate();

    const handleChatStartClick=()=>
    {
        ///custome logic
        //unique conversation id
        //email id input

            navigate("/login");
    }

    return <div className="h-screen w-screen flex flex-col justify-center items-center">
        
         <Bot size={80}></Bot>
        <h1 className="text-4xl font-bold">Welocme to Fit Monk AI</h1>
        <Button onClick={handleChatStartClick} className={'cursor-pointer'} variant ={"outline"}> Fit Monk Coach</Button>



        
         </div>
}
export default ChatHome