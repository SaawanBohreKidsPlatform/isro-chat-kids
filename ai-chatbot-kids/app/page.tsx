"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@/components/ButtonComponent";
import IsroLogo from "@/public/isro-logo.png";
import LandingHeaderImg from "@/public/landing-header.png";
import SendIcon from "@/public/send-icon.png";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown, LogOut } from "lucide-react";
import {
  ConversationComponent,
  MessageProps,
} from "@/components/ConversationComponent";

import { Button, buttonVariants } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AUTH_KEY } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LandingPage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [userInput, setUserInput] = useState("");
  const [templateInput, setTemplateInput] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [messages, setMessages] = useState(Array<MessageProps>);
  const [user, setUser] = useState<any>(null);

  const handleSubmit = async (
    e?:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    setBusy(true);
    setProcessing(true);

    if (!chatStarted) {
      setChatStarted(true);
    }

    // const formData = new FormData();
    // formData.append("prompt", templateInput == "" ? userInput : templateInput);

    // console.log(templateInput == "" ? userInput : templateInput);

    try {
      // const res = await axios.post("/chat/", formData);

      const response = await fetch(
        "https://backend.isrospaceagent.com/isro-agent/chat/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": process.env.NEXT_PUBLIC_CSRF_TOKEN ?? "",
          },
          body: JSON.stringify({
            prompt: templateInput == "" ? userInput : templateInput,
          }),
        }
      );

      const res = await response.json();

      let previousChat = [...messages];
      previousChat.push({
        response: templateInput == "" ? userInput : templateInput,
        conversation_id: res.conversation_id,
      });
      previousChat.push({
        response: res.response,
        audio: res.audio,
        conversation_id: res.conversation_id,
      });

      setMessages(previousChat);
    } catch (error) {
      console.error("Error while processing user input", error);
    } finally {
      setBusy(false);
      setProcessing(false);
      setUserInput("");
      setTemplateInput("");
    }
  };

  const enterTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (busy || userInput.trim() === "") {
      return;
    }
    if (e.code === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const textareaResize = () => {
    const elm = document.getElementById("inputQuery");
    if (elm) {
      elm.style.height = "0px";
      elm.style.height = elm?.scrollHeight + "px";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    window.location.reload();
  };

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem(AUTH_KEY) ?? "{}");

    setUser(user);
  }, []);

  useEffect(() => {
    console.log(templateInput);
    if (templateInput != "") {
      console.log("first");
      handleSubmit();
    }
  }, [templateInput]);

  return (
    <main className="flex min-h-screen flex-col items-center pb-10">
      <div className="z-10 w-full flex justify-between items-center font-sans text-sm py-2 px-20">
        <Link href={"/"}>
          <Image
            src={IsroLogo}
            alt="ISRO Logo"
            className="flex"
            width={80}
            height={24}
            priority
          />
        </Link>
        <ul className="flex items-center space-x-2">
          <li>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full"
              onClick={() => {
                setChatStarted(false);
                setMessages([]);
              }}
            >
              + New Chat
            </Button>
          </li>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <li className="font-semibold text-lg px-4 py-1 flex items-center border rounded-full">
                    <span className="text-muted-foreground">Welcome</span>,{" "}
                    {user?.username}
                    <ChevronDown className="size-5 ml-1" />
                  </li>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-full relative -right-10"
                  side="bottom"
                >
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="size-5 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <li className="flex h-auto w-max mr-5">
                <Link
                  className="justify-center text-blue-500 border-blue-500 p-6 backdrop-blur-2x lg:static lg:w-auto lg:rounded-3xl lg:border lg:px-4 lg:py-2"
                  href="/sign-up"
                  rel="noopener noreferrer"
                >
                  Sign Up
                </Link>
              </li>
              <li className="flex h-auto w-max">
                <Link
                  className="justify-center text-white border-blue-500 bg-blue-500 p-6 backdrop-blur-2x lg:static lg:w-auto lg:rounded-3xl lg:border lg:bg-blue-500 lg:px-4 lg:py-2"
                  href="/log-in"
                  rel="noopener noreferrer"
                >
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {!chatStarted ? (
        <div className="relative flex-grow w-full px-48 pb-20">
          <div className="static w-full h-full px-10">
            <Image
              className="object-contain rounded-xl"
              src={LandingHeaderImg}
              alt=""
              priority
            />
          </div>
          <div className="relative w-full text-center text-[#6C6C6C] text-sm pt-8 pb-5 border-b">
            <h4>“Explore the wonders of space!”</h4>
            <h4>“Learn about planets, stars, and beyond.”</h4>
          </div>
        </div>
      ) : null}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-14 max-h-screen pt-[5.4rem]">
        {!chatStarted ? (
          <div className="mt-10 m-5 grid grid-cols-3 text-left">
            <ButtonComponent
              name="template-query-1"
              className="justify-center px-5 py-3 bg-[#EDEBFF] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
              buttonText="🚀 Planets in our Solar System"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Planets in our Solar System");
              }}
            />
            <ButtonComponent
              name="template-query-2"
              className="justify-center px-5 py-3 bg-[#E0FFEB] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
              buttonText="✨ Stars and Constellations"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Stars and Constellations");
              }}
            />
            <ButtonComponent
              name="template-query-3"
              className="justify-center px-5 py-3 bg-[#FEE7E7] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
              buttonText="👩‍🚀 Astronauts and Space Missions"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Astronauts and Space Missions");
              }}
            />
            <ButtonComponent
              name="template-query-4"
              className="justify-center px-5 py-3 bg-[#E9FFFA] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
              buttonText="🌕 The Moon and its Phases"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("The Moon and its Phases");
              }}
            />
            <ButtonComponent
              name="template-query-5"
              className="justify-center px-5 py-3 bg-[#E6F7FE] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
              buttonText="🔭 Fun Space Facts"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Fun Space Facts");
              }}
            />
            <ButtonComponent
              name="template-query-6"
              className="justify-center px-5 py-3 bg-[#E3ECFF] backdrop-blur-2x lg:static lg:w-auto lg:rounded-lg lg:m-2"
              buttonText="📜 Space Exploration History"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Space Exploration History");
              }}
            />
          </div>
        ) : (
          <div className="w-full mb-2 h-full flex justify-center overflow-y-scroll">
            <ConversationComponent
              messages={messages}
              processing={processing}
            />
          </div>
        )}
        <div className="relative w-3/5 justify-center">
          <form id="userInput" onSubmit={handleSubmit}>
            <span className="flex items-center border border-gray-400 rounded-2xl w-full py-2 px-7 resize-none">
              <textarea
                className="bg-transparent w-full focus:outline-none"
                ref={inputRef}
                rows={1}
                name="input-query"
                value={userInput}
                id="inputQuery"
                placeholder={
                  chatStarted
                    ? "Ask me about space...!"
                    : "Feel free to ask any follow-ups..."
                }
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={enterTextArea}
                onInput={textareaResize}
              />
              <ButtonComponent
                type="submit"
                id="sendInput"
                className="bg-blue-400 rounded-2xl pl-5 p-3.5"
                icon={
                  <Image
                    className="relative w-5"
                    src={SendIcon}
                    alt="Next.js Logo"
                    priority
                  />
                }
                onClick={() => {
                  chatStarted ?? setChatStarted(true);
                }}
              />
            </span>
          </form>
        </div>
      </div>

      <div className="absolute bottom-0 w-full text-center text-gray-600 text-xs py-1.5 shadow-lg shadow-black">
        Developed by Team GYAAN at URSC.
        <span className="ml-2">Powered by 169Pi</span>
      </div>
    </main>
  );
}
