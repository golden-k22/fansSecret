"use client";
import React, { useEffect, useState, useRef, MutableRefObject } from "react";
// import {
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
//   TooltipProvider,
// } from "@radix-ui/react-tooltip";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import AdminMessage from "@/components/home/home-screen/adminmessage";
// import {HandleCredits} "fs/promises";
import io from 'socket.io-client';

const Input = ({ className, ...props }: any) => (
  <input
    className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

// Custom Button Component
const Button = ({ children, className, ...props }: any) => (
  <button
    className={`bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const socket = io(process.env.NEXT_PUBLIC_SOCEKT_SERVER_URL);

interface Message {
  id: number,
  content: string,
  senderId: string,
  receiverId: string,
  createdAt: Date,
  sender: string,
  receiver: string,
}

const MessagingPage = (props: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); //Logined User Id

  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleOnPost = async () => {
    // Fetch banned words from API
    const bannedResponse = await fetch(`/api/admin/bannedwords`);
    if (!bannedResponse.ok) {
      throw new Error('Failed to fetch bannedwords');
    }
    const data = await bannedResponse.json();

    for (const ele of data) {
      if (newMessage.includes(ele.word)) {
        alert("Your message contains banned words. Please modify it.");
        const banned_word = ele.word;

        try {
          const response = await axios.post(`/api/admin/bannedbehaviors`, {
            senderId: props.senderId,
            receiverId: props.receiverId,
            bannedword: banned_word,
            send_content: newMessage,
            send_time: new Date().toISOString(),
          });

        } catch (error) {
          console.error("Error posting banned behavior:", error);
        }
        return;
      }
    };

    const body = {
      content: newMessage,
      senderId: props.senderId
    }

    const res = await axios.post(`/api/message/${props.receiverId}`, body);
    setFetchedMessages([...fetchedMessages, res.data]);
    socket.emit('message', res.data);
    setNewMessage("");
    scrollToRecentMsg();
  }

  useEffect(() => {
    setFetchedMessages(props.messageData);
    setNewMessage("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);

    socket.connect();
    socket.on('message', (msg: any) => {
      if (msg?.senderId === props.receiverId && msg?.receiverId === id) {
        setFetchedMessages(prev => [...prev, msg]);
        scrollToRecentMsg();
      }
    });

    return (() => {
      socket.disconnect()
    });
  }, [props.messageData, id, props.receiverId]);

  const onMouseEnter = () => {
    messagesEndRef.current.style.backgroundColor = "#ddeeee";
  };

  const onMouseLeave = () => {
    messagesEndRef.current.style.backgroundColor = "";
  };

  const scrollToRecentMsg = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOnPost();
    }
  };

  return (
    <div style={props.style} className="flex h-screen flex-col justify-end  ">
      {
        fetchedMessages.length === 0 &&
        <div className="flex justify-center items-center mb-[40vh] flex-col gap-5 ">
          <div className=" font-bold text-xl">Start Chating...</div>
          <MessageCircleMore className="w-16 h-16"></MessageCircleMore>
        </div>
      }
      <div style={props.style} className="p-4 overflow-auto">
        {/* <Chat /> */}
        {fetchedMessages !== undefined && fetchedMessages.map((message: any, index: number) => (
          message?.senderId == id ?
            <div
              key={index}
              className={`mb-4 flex justify-end items-end `}
            >
              {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="mr-2"> */}
              {/* <AvatarImage src="/user-avatar.png" alt={message.user} /> */}
              {/* <AvatarFallback>{message.user.charAt(0)}</AvatarFallback> */}
              {/* </Avatar>
                </TooltipTrigger>
                <TooltipContent>{message?.user}</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}


              <div className="bg-blue-500 text-white text-end self-endrounded-lg p-3 max-w-xs" style={{ borderRadius: "15px", paddingBottom: '7px' }}>
                <p className="text-sm"> {message?.content} </p>
                <p className="text-sm" style={{ fontSize: '8px', textAlign: 'right', lineHeight: '9px', marginTop: '8px' }}> {`${new Date(message?.createdAt).getHours()}:${new Date(message?.createdAt).getMinutes()}`} </p>
              </div>
            </div>
            :
            <div
              key={message?.id}
              className={`mb-4 flex justify-start items-start `}
            >
              {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="mr-2"> */}
              {/* <AvatarImage src="/user-avatar.png" alt={message.user} /> */}
              {/* <AvatarFallback>{message.user.charAt(0)}</AvatarFallback> */}
              {/* </Avatar>
                </TooltipTrigger>
                <TooltipContent>{message?.user}</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

              <div
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg p-3 max-w-xs" style={{ borderRadius: "15px", paddingBottom: '7px' }}>
                <p className="text-sm"> {message?.content} </p>
                <p className="text-sm" style={{ fontSize: '8px', textAlign: 'right', lineHeight: '9px', marginTop: '8px' }}> {`${new Date(message?.createdAt).getHours()}:${new Date(message?.createdAt).getMinutes()}`} </p>
              </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e: any) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow mr-2"
            style={{ border: "1px solid rgb(59, 130, 246)" }}
          />
        </div>
        <div className="flex items-center" style={{ marginTop: '10px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
            </div>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ marginRight: '10px', cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
          </div>
          <Button onClick={handleOnPost} disabled={newMessage === ""} style={{ marginRight: '7px' }} >Send</Button>
        </div>
      </div>
    </div>
  );
};


export default MessagingPage;
