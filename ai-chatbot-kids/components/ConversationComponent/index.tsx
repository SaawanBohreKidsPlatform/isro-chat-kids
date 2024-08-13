"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
  metadata?: any;
  setTemplateInput: Dispatch<SetStateAction<string>>;
}

export const ConversationComponent = ({
  messages,
  processing = false,
  metadata,
  setTemplateInput,
}: ConversationComponentProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const suggestionBgColors = ["bg-[#EDEBFF]", "bg-[#E0FFEB]", "bg-[#FEE7E7]"];

  const [showSuggestions, setShowSuggestions] = useState(false);

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <div className="w-full lg:w-3/5 px-3 lg:px-0 mx-auto">
      {messages.map((msg, index) => {
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
                  className="markdown w-full text-[15px]"
                >
                  {msg.response}
                </ReactMarkdown>
                {metadata.map((data: any) => {
                  if (data.conversation_id == msg.conversation_id) {
                    return (
                      <>
                        <div className="my-3">
                          <AudioComponent
                            conversation_id={msg.conversation_id}
                          />
                        </div>
                        <div className="my-3">
                          <FeedbackComponent chatId={msg.conversation_id} />
                        </div>
                        {index == messages.length - 1 && (
                          <div className="mt-7 w-full absolute left-0 px-2 lg:relative lg:px-0 md:relative md:px-0">
                            <div
                              className="flex max-w-max mb-3 cursor-pointer text-sm"
                              onClick={() =>
                                setShowSuggestions(!showSuggestions)
                              }
                            >
                              <b>Show suggestions &nbsp;&nbsp;&nbsp;&nbsp;</b>
                              <div
                                className={
                                  showSuggestions ? "-rotate-90" : "rotate-90"
                                }
                              >
                                ❱
                              </div>
                            </div>
                            {showSuggestions &&
                              data.references.map(
                                (query: string, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      className={`max-w-max cursor-pointer my-2 py-2 px-5 rounded-2xl text-sm ${
                                        suggestionBgColors[
                                          index % suggestionBgColors.length
                                        ]
                                      }`}
                                      onClick={() => {
                                        setShowSuggestions(false);
                                        setTemplateInput(query)
                                      }}
                                    >
                                      {query}
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        )}
                      </>
                    );
                  }
                })}
              </div>
            </div>
          );
        } else {
          return (
            <>
              <div
                className="relative rounded-3xl bg-gray-100 flex flex-col-2 p-4 pr-6 my-6 w-fit"
                key={index}
              >
                <div className="h-full relative w-[40px]">
                  <div className="p-2 bg-[#63BEFF] rounded-xl">🧑🏽‍🚀</div>
                </div>
                <div className="ml-4 text-wrap flex items-center text-[15px]">
                  {msg.response}
                </div>
              </div>
              {processing && index == messages.length - 1 && (
                <div className="relative flex flex-col-2 p-4 lg:pr-6 my-6">
                  <div className="h-full relative w-[40px]">
                    <div className="p-2 bg-[#FFBE71] rounded-xl">🚀</div>
                  </div>
                  <div className="ml-5 text-wrap">
                    <Image src="/loader.gif" alt="" width={50} height={25} />
                  </div>
                </div>
              )}
            </>
          );
        }
      })}
      <div ref={bottomRef} />
    </div>
  );
};
