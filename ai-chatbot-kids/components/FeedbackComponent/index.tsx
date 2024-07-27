import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import FeedbackGood from "@/public/feedback-good.png";
import FeedbackGoodSelected from "@/public/feedback-good-select.png";
import FeedbackBad from "@/public/feedback-bad.png";
import FeedbackBadSelected from "@/public/feedback-bad-select.png";
import SendFeedbackGreen from "@/public/feedback-green.png";
import SendFeedbackRed from "@/public/feedback-red.png";
import { ButtonComponent } from "../ButtonComponent";
import axios from "@/lib/axios";

const FeedbackComponent: React.FC<{ chatId: number }> = ({ chatId }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<boolean | null>(null);

  const submitFeedback = async () => {
    /* const formData = new FormData(); */
    /* formData.append("feedback_status", feedbackStatus);
    formData.append("feedback_message", feedbackMessage); */

    const feedbackData = {
      feedback_status : feedbackStatus,
      feedback_message : feedbackMessage
    }

    try {
      const res = await axios.post(`/update-feedback/${chatId}/`, feedbackData);
    } catch (error) {
      console.error("Error while sending feedback", error);
    }
  }

  return (
    <div className="relative">
      {feedbackStatus == null ? (
        <div className="flex">
          <Image
            className="relative w-4 h-4 mr-1.5 cursor-pointer"
            src={FeedbackGood}
            alt="Good"
            onClick={() => setFeedbackStatus(true)}
            priority
          />
          <Image
            className="relative w-4 h-4 ml-1.5 cursor-pointer"
            src={FeedbackBad}
            alt="Bad"
            onClick={() => setFeedbackStatus(false)}
            priority
          />
        </div>
      ) : feedbackStatus ? (
        <div className="flex">
          <Image
            className="relative w-4 h-4 mr-1.5 cursor-pointer"
            src={FeedbackGoodSelected}
            alt="Good"
            onClick={() => setFeedbackStatus(null)}
            priority
          />
          <Image
            className="relative w-4 h-4 ml-1.5 cursor-pointer"
            src={FeedbackBad}
            alt="Bad"
            onClick={() => setFeedbackStatus(false)}
            priority
          />
          <form className="ml-10 h-4" onSubmit={() => {}}>
            <input
              type="text"
              className="w-96 h-5 border border-green-400 rounded absolute top-[-0.1rem] pl-2 pr-4 text-xs"
              value={feedbackMessage}
              placeholder="Share your thoughts(optional)..."
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            <ButtonComponent
              type="submit"
              id="sendFeedback"
              className="bg-transparent absolute top-[0.2rem] right-[1.2rem]"
              icon={
                <Image
                  className="relative w-3"
                  src={SendFeedbackGreen}
                  alt="Next.js Logo"
                  priority
                />
              }
              onClick={() => {
                setFeedbackMessage('');
              }}
            />
          </form>
        </div>
      ) : (
        <div className="flex">
          <Image
            className="relative w-4 h-4 mr-1.5 cursor-pointer"
            src={FeedbackGood}
            alt="Good"
            onClick={() => setFeedbackStatus(true)}
            priority
          />
          <Image
            className="relative w-4 h-4 ml-1.5 cursor-pointer"
            src={FeedbackBadSelected}
            alt="Bad"
            onClick={() => setFeedbackStatus(null)}
            priority
          />
          <form className="ml-10 h-4" onSubmit={() => {}}>
            <input
              type="text"
              className="w-96 h-5 border border-red-400 rounded absolute top-[-0.1rem] pl-2 pr-4 text-xs"
              value={feedbackMessage}
              placeholder="Share your thoughts(optional)..."
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            <ButtonComponent
              type="submit"
              id="sendFeedback"
              className="bg-transparent absolute top-[0.2rem] right-[1.2rem]"
              icon={
                <Image
                  className="relative w-3"
                  src={SendFeedbackRed}
                  alt="Next.js Logo"
                  priority
                />
              }
              onClick={() => {
                setFeedbackMessage('');
              }}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;
