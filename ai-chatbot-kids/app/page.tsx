"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@/components/ButtonComponent";
import IsroLogo from "@/public/isro-logo.png";
import LandingHeaderImg from "@/public/landing-header.png";
import LandingHeaderMobile from "@/public/landing-header-mobile.png";
import SendIcon from "@/public/send-icon.png";
import { ChevronDown, LogOut } from "lucide-react";
import {
  ConversationComponent,
  MessageProps,
} from "@/components/ConversationComponent";

import { Button } from "@/components/ui/button";
import { AUTH_KEY } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

    try {
      const authKey = localStorage.getItem(AUTH_KEY);

      if (authKey !== null) {
        const accessToken = JSON.parse(authKey);
        const response = await fetch(
          "https://backend.isrospaceagent.com/isro-agent/chat/",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRFToken": process.env.NEXT_PUBLIC_CSRF_TOKEN ?? "",
              Authorization: `Bearer ${accessToken.user.access}`,
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
      } else {
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
      }
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
    <main className="flex min-h-screen flex-col items-center pb-10 overflow-hidden">
      <div className="z-10 w-full flex justify-between items-center text-sm py-2 px-4 lg:px-20 md:px-10 bg-white">
        <Link href={"/"}>
          <Image
            src={IsroLogo}
            alt="ISRO Logo"
            className="lg:flex lg:pl-0 pl-2"
            width={80}
            height={24}
            priority
          />
        </Link>
        <h1 className="hidden lg:block font-roboto ml-40 text-2xl lg:text-4xl md:text-4xl font-black bg-gradient-to-r from-[#FF7300] to-[#078DF2] text-transparent bg-clip-text">
          ISRO SPACE AGENT
        </h1>
        <ul className="flex items-center space-x-2">
          <li>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl border md:rounded-full lg:rounded-full lg:h-fit md:h-fit h-8"
              onClick={() => {
                setChatStarted(false);
                setMessages([]);
              }}
            >
              +<span className="hidden lg:block">&nbsp;New Chat</span>
            </Button>
          </li>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <li className="font-semibold text-lg px-4 py-1 flex items-center border rounded-full">
                    <span className="text-muted-foreground">Welcome</span>
                    <span className="hidden lg:block">
                      &nbsp;
                      {user?.username}
                    </span>
                    <ChevronDown className="size-5 ml-1" />
                  </li>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-6 lg:min-w-8 lg:w-full relative -right-2 lg:-right-10"
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
              <li className="lg:flex h-auto w-max mr-5">
                <Link
                  className="justify-center text-blue-500 border-blue-500 px-3 py-1.5 rounded-2xl backdrop-blur-2x md:static lg:static md:w-auto lg:w-auto md:rounded-3xl lg:rounded-3xl border md:px-4 md:py-2 lg:px-4 lg:py-2"
                  href="/sign-up"
                  rel="noopener noreferrer"
                >
                  Sign Up
                </Link>
              </li>
              <li className="flex h-auto w-max">
                <Link
                  className="justify-center text-white border-blue-500 bg-blue-500 mr-2 px-3 py-1.5 rounded-2xl md:p-6 lg:p-6 backdrop-blur-2x lg:static lg:w-auto lg:rounded-3xl lg:border lg:bg-blue-500 md:px-4 md:py-2 lg:px-4 lg:py-2"
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
        <div className="relative flex-grow w-full lg:px-48 pb-20">
          <div className="lg:hidden w-full h-full px-3 md:flex md:justify-center md:px-10 lg:px-10">
            <Image
              className="object-contain rounded-xl"
              src={LandingHeaderMobile}
              alt=""
              priority
            />
          </div>
          <div className="hidden lg:block w-full h-full px-2 md:px-10 lg:px-12">
            <Image
              className="object-contain rounded-xl"
              src={LandingHeaderImg}
              alt=""
              priority
            />
          </div>
          <div className="relative w-full text-center text-[#6C6C6C] text-sm lg:pt-8 md:pt-8 lg:pb-5 md:pb-5 pt-4 lg:border-b md:border-b md:text-2xl lg:text-sm">
            <h4>“Explore the wonders of space!”</h4>
            <h4>“Learn about planets, stars, and beyond.”</h4>
          </div>
        </div>
      ) : null}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center lg:pb-14 pb-10 max-h-screen pt-24">
        {!chatStarted ? (
          <div className="mt-10 lg:mx-5 md:mx-5 lg:mb-5 md:mb-5 mb-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 text-left">
            <ButtonComponent
              name="template-query-1"
              className="invisible md:visible lg:visible justify-center md:px-5 lg:px-5 px-2 lg:py-1 md:py-1 py-0.5 bg-[#EDEBFF] backdrop-blur-2x lg:static lg:w-auto rounded-lg lg:m-2 m-1"
              buttonText="🚀 Planets in our Solar System"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Planets in our Solar System");
              }}
            />
            <ButtonComponent
              name="template-query-2"
              className="invisible md:visible lg:visible justify-center md:px-5 lg:px-5 px-2 lg:py-1 md:py-1 py-0.5 bg-[#E0FFEB] backdrop-blur-2x lg:static lg:w-auto rounded-lg lg:m-2 m-1"
              buttonText="✨ Stars and Constellations"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Stars and Constellations");
              }}
            />
            <ButtonComponent
              name="template-query-3"
              className="justify-center lg:text-md md:text-md text-sm md:px-5 lg:px-5 px-2 lg:py-1 md:py-1 py-0.5 bg-[#FEE7E7] backdrop-blur-2x lg:static lg:w-auto rounded-lg lg:m-2 m-1"
              buttonText="👩‍🚀 Astronauts and Space Missions"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Astronauts and Space Missions");
              }}
            />
            <ButtonComponent
              name="template-query-4"
              className="justify-center lg:text-md md:text-md text-sm md:px-5 lg:px-5 px-2 lg:py-1 md:py-1 py-0.5 bg-[#E9FFFA] backdrop-blur-2x lg:static lg:w-auto rounded-lg lg:m-2 m-1"
              buttonText="🌕 The Moon and its Phases"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("The Moon and its Phases");
              }}
            />
            <ButtonComponent
              name="template-query-5"
              className="justify-center lg:text-md md:text-md text-sm md:px-5 lg:px-5 px-2 lg:py-1 md:py-1 py-0.5 bg-[#E6F7FE] backdrop-blur-2x lg:static lg:w-auto rounded-lg lg:m-2 m-1"
              buttonText="🔭 Fun Space Facts"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Fun Space Facts");
              }}
            />
            <ButtonComponent
              name="template-query-6"
              className="justify-center lg:text-md md:text-md text-sm md:px-5 lg:px-5 px-2 lg:py-1 md:py-1 py-0.5 bg-[#E3ECFF] backdrop-blur-2x lg:static lg:w-auto rounded-lg lg:m-2 m-1"
              buttonText="📜 Space Exploration History"
              onClick={(e?: React.MouseEvent<Element, MouseEvent>) => {
                setTemplateInput("Space Exploration History");
              }}
            />
          </div>
        ) : (
          <div className="w-full mb-2 h-full flex justify-center overflow-y-scroll md:px-10">
            <ConversationComponent
              messages={messages}
              processing={processing}
            />
          </div>
        )}
        <div className="relative lg:w-3/5 w-full lg:px-0 md:px-10 px-7 justify-center">
          <form id="userInput" onSubmit={handleSubmit}>
            <span className="flex items-center border border-gray-400 rounded-lg lg:rounded-xl md:rounded-xl w-full py-0.5 lg:py-0.5 lg:pl-7 lg:pr-1 px-1 md:pl-5 resize-none">
              <textarea
                className="resize-none bg-transparent w-full lg:px-0 px-2 focus:outline-none max-h-[3em] overflow-y-auto"
                ref={inputRef}
                rows={1}
                name="input-query"
                value={userInput}
                id="inputQuery"
                placeholder={
                  !chatStarted
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
                className="bg-blue-400 rounded-lg pl-5 lg:p-2 md:p-2 p-1.5"
                icon={
                  <Image
                    className="relative lg:w-5 md:w-5 w-4"
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
