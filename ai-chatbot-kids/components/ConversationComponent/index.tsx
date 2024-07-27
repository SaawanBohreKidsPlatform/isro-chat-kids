"use client";

import React from "react";
import AudioComponent from "../AudioComponent";
import FeedbackComponent from "../FeedbackComponent";

export interface MessageProps {
  response: string;
  audio?: string;
}

interface ConversationComponentProps {
  messages: Array<MessageProps>;
}

export const ConversationComponent = ({
  messages,
}: ConversationComponentProps) => {
  return (
    <div>
      {messages.map((m, index) => {
        if (index % 2 !== 0) {
          return (
            <div className="relative flex flex-col-2 p-4 pr-6 my-6" key={index}>
              <div className="h-full relative w-[40px]">
                <div className="p-2 bg-[#FFBE71] rounded-xl">🚀</div>
              </div>
              <div className="ml-5 text-wrap">
                {m.response}
                <div className="my-3">
                  <AudioComponent audioString={m.audio} />
                </div>
                <div className="my-3">
                  <FeedbackComponent chatId={1} />
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
                <div className="p-2 bg-[#63BEFF] rounded-xl">🤖</div>
              </div>
              <div className="ml-4 text-wrap flex items-center">
                {m.response}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
