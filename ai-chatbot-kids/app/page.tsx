"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonComponent } from "@/components/ButtonComponent";
import IsroLogo from "@/public/isro-logo.png";
import LandingHeaderImg from "@/public/landing-header.png";
import SendIcon from "@/public/send-icon.png";
import {
  ConversationComponent,
  MessageProps,
} from "@/components/ConversationComponent";

import axios from "@/lib/axios";

export default function LandingPage() {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [userInput, setUserInput] = useState("");
  const [templateInput, setTemplateInput] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [messages, setMessages] = useState(Array<MessageProps>);

  useEffect(() => {
    console.log(templateInput);
    if (templateInput != "") {
      handleSubmit();
    }
  }, [templateInput]);

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

    const formData = new FormData();
    formData.append("prompt", templateInput == "" ? userInput : templateInput);

    try {
      const res = await axios.post("/chat/", formData);

      let previousChat = [...messages];
      previousChat.push({ response: templateInput == "" ? userInput : templateInput });
      previousChat.push({
        response: res.data.response,
        audio: res.data.audio,
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

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="z-10 w-full flex justify-between items-center font-roboto text-sm pt-2 px-32">
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
        <ul className="flex">
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
        </ul>
      </div>
      {!chatStarted ? (
        <div className="relative flex-grow w-full px-48 pb-20">
          <div className="static w-full h-full px-40">
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
          <div className="border w-full mb-2 px-96 h-full overflow-y-scroll">
            <ConversationComponent messages={messages} />
          </div>
        )}
        <div className="relative w-full justify-center px-[25rem]">
          <form id="userInput" onSubmit={handleSubmit}>
            <textarea
              className="flex border border-gray-400 rounded-2xl w-full min-h-12 py-3 px-7 resize-none"
              ref={ref}
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
              className="bg-blue-400 rounded-2xl pl-5 p-3.5 absolute top-[0.17rem] right-[25.2rem]"
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
          </form>
        </div>
      </div>

      <div className="absolute bottom-0 w-full text-center text-gray-400 text-xs py-1.5 shadow-lg shadow-black">
        Developed by Team GYAAN at URSC
      </div>
    </main>
  );
}
