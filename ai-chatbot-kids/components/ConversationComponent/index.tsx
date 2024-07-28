"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import AudioComponent from "../AudioComponent";
import FeedbackComponent from "../FeedbackComponent";

export interface MessageProps {
  response: string;
  audio?: string;
  conversation_id?: number;
}

interface ConversationComponentProps {
  messages: Array<MessageProps>;
  processing: boolean;
}

export const ConversationComponent = ({
  messages,
  processing = false,
}: ConversationComponentProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  if (processing) {
    return (
      <div className="w-full h-[30rem] grid place-items-center">
        <Image src="/loader.gif" alt="rocket gif" width={200} height={130} />
      </div>
    );
  }

  return (
    <div className="mb-2 w-full h-[40rem] mobile:h-[30rem] py-2 overflow-y-auto flex justify-center">
      <div className="w-full lg:w-3/5 px-3 lg:px-0 mx-auto">
        {!processing &&
          messages.map((msg, index) => {
            if (index % 2 !== 0) {
              return (
                <div className="flex p-4 lg:pr-6 my-2" key={index}>
                  <div className="h-[40px] w-[40px] p-2 bg-[#FFBE71] rounded-xl grid place-items-center">
                    🚀
                  </div>
                  <div className="ml-5 text-wrap space-y-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      className="markdown w-full"
                    >
                      {msg.response}
                    </ReactMarkdown>
                    <AudioComponent audioString={msg.audio} />
                    <FeedbackComponent chatId={msg.conversation_id} />
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="rounded-3xl bg-gray-100 flex flex-col-2 p-4 pr-6 my-6 w-fit"
                  key={index}
                >
                  <div className="h-[40px] w-[40px] p-2 bg-[#63BEFF] rounded-xl">
                    🧑🏽‍🚀
                  </div>
                  <div className="ml-4 text-wrap flex items-center">
                    {msg.response}
                  </div>
                </div>
              );
            }
          })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
