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

  return (
    <div className="w-full lg:w-3/5 px-3 lg:px-0 mx-auto">
      {processing && (
        <div className="w-full h-[37rem] grid place-items-center">
          <Image src="/loader.gif" alt="rocket gif" width={200} height={130} />
        </div>
      )}
      {!processing &&
        messages.map((msg, index) => {
          console.log(msg);
          if (index % 2 !== 0) {
            return (
              <div
                className="relative flex flex-col-2 p-4 lg:pr-6 my-6"
                key={index}
              >
                <div className="h-full relative w-[40px]">
                  <div className="p-2 bg-[#FFBE71] rounded-xl">🚀</div>
                </div>
                <div className="ml-5 text-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="markdown w-full"
                  >
                    {msg.response}
                  </ReactMarkdown>
                  <div className="my-3">
                    <AudioComponent audioString={msg.audio} />
                  </div>
                  <div className="my-3">
                    <FeedbackComponent chatId={msg.conversation_id} />
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="relative rounded-3xl bg-gray-100 flex flex-col-2 p-4 pr-6 my-6 w-fit"
                key={index}
              >
                <div className="h-full relative w-[40px]">
                  <div className="p-2 bg-[#63BEFF] rounded-xl">🧑🏽‍🚀</div>
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
  );
};
