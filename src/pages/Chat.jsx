import React, { use, useEffect, useRef, useState } from "react"

import { Search, Send, Plus, Section, LogOut } from "lucide-react";

import { MoreVertical } from "lucide-react"
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Spinner } from "../components/ui/spinner";
import MessageBubble from "../components/ui/MessageBubble";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { sendMessage } from "../services/chat.service";
import { v4 as uuidv4 } from "uuid";

const CHATS = [{

    id: 1,
    name: "How to start spring",
    lastMessage: "How to be a Fit Monk",
    unread: 2,
    initailas: "AG"

},
{

    id: 2,
    name: "Monk",
    lastMessage: "How to be a Fit Monk",
    unread: 2,
    initailas: "TG"

},
{

    id: 3,
    name: "How to start spring",
    lastMessage: "How to be a Fit Monk",
    unread: 2,
    initailas: "AG"

}
    , {

    id: 3,
    name: "How to start spring",
    lastMessage: "How to be a Fit Monk",
    unread: 2,
    initailas: "PG"

}, {

    id: 4,
    name: "How to start spring",
    lastMessage: "How to be a Fit Monk",
    unread: 2,
    initailas: "PG"

}]

const CONVERSTAION = [{

    id: 1,
    author: "bot",
    text: "How I can help you to be a fit monk ?",
    at: new Date().toLocaleTimeString()

},

]

function Chat() {

    const [messages, setMessages] = useState(CONVERSTAION);
    const [draft, setDraft] = useState("");
    const endRef = useRef(null);
    const [sending, setSending] = useState(false);
    const [conversationId, setConversationId] = useState("");
    const inputRef = useRef(null);
    const naviagte = useNavigate();

    useEffect(() => {
        const id = uuidv4();
        setConversationId(id);
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    async function sendMessages() {
        const textMessage = draft.trim();
        if (!textMessage) return;

        setSending(true);

        console.log(draft);
        console.log(conversationId);

        setMessages((pre) => [
            ...pre,
            {
                id: uuidv4(),
                author: "user",
                text: draft,
                at: new Date().toLocaleTimeString()
            },
        ]);


        const responseFromAI = await sendMessage(draft, conversationId);
        console.log(responseFromAI);

        setMessages((pre) => [
            ...pre,
            {
                id: uuidv4,
                author: "bot",
                text: responseFromAI,
                at: new Date().toLocaleTimeString()
            },
        ]);

        setSending(false);





        //call api to send message to bot
        //setMessages
        //setDraft("");

        setDraft("");
        inputRef.current?.focus();


    }


    return (
        <div className=" fixed top-0 left-0 right-0 mx-auto h-dvh min-h-screen max-w-7xl grid 
    grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] border-x">
            <div>

                <aside className="hidden md:flex mdLflex-col border-r">
                    <div className="p-3 flex items-center gap-2">
                        <Button size={'icon'} variant={"outline"} className={"h-8 w-8"}>
                            <Plus className="h-4 w-4" />
                        </Button>
                        <div className="relative w-full">
                            <input
                                placeholder="Search Chats.."
                                type="text"
                                className="h-9 w-full pl-8 border rounded"
                            />
                            <Search className="h-4 w-4 pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />


                        </div>
                    </div>

                </aside>

            </div>
            <section className="h-full border-l">



                {/*header*/}

                <div className="flex items-centre justify-between gap-3 px-4 py-3 border b">
                    <div className="flex gap-3">
                        <Avatar>

                            <AvatarImage src="" />
                            <AvatarFallback className={"text-xs"}>PG</AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                            <div className="text-sm font-medium">Lizza Support</div>
                            <div className="text-xs text-muted-foreground">

                                Online typing ....
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button 
                        onClick={() =>{
                        naviagte("/");

                        } } 
                        variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
                           <LogOut className={'h-4 w-4'}></LogOut>
                        </Button>
                        <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
                            <MoreVertical className={'h-4 w-4'}></MoreVertical>
                        </Button>

                    </div>

                </div>
                <ScrollArea className={"flex-1 h-[calc(100vh-200px)]"}>
                    <div className="mx-auto max-w-3xl px-6 py-6 space-y-6">

                        {
                            messages.map((chat, index) => (
                                <MessageBubble keys={chat.id} author={chat.author} at={chat.at}>

                                    {chat.text}

                                </MessageBubble>


                            ))
                        }

                    </div>
                    <div ref={endRef}></div>


                </ScrollArea>
                <div className="border-t p-3">
                    <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">

                        <Input
                            ref={inputRef}
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Type your message here..."
                            type="text" className="w-full rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2" />

                        <Button disabled={sending}
                            onClick={sendMessages} className={"px-5 rounded-2xl"}>

                            {sending ? <Spinner /> : <Send className="h-4 w-4" />}
                            {sending ? "Sending...." : "Send"}
                        </Button>


                    </div>
                </div>



            </section>

        </div>);
}
export default Chat