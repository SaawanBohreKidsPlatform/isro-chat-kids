import React, { useState, FormEvent } from "react";
import { Loader2, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { isNull } from "util";

const FeedbackComponent: React.FC<{ chatId?: number }> = ({ chatId }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackResponse, setFeedbackResponse] = useState<string>("");

  const submitFeedback = async (e: FormEvent) => {
    e.preventDefault();

    const feedbackData = {
      feedback_status: feedbackStatus,
      feedback_message: feedbackMessage,
    };

    try {
      setLoading(true);
      const response = await fetch(
        `https://backend.isrospaceagent.com/isro-agent/update-feedback/${chatId}/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": process.env.NEXT_PUBLIC_CSRF_TOKEN ?? "",
          },
          body: JSON.stringify(feedbackData),
        }
      );
      const res = await response.json();
      if (res[0]) {
        setFeedbackResponse("Thank you for your feedback!");
      }
    } catch (error) {
      console.error("Error while sending feedback", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <ThumbsUp
          className={cn(
            "size-4 cursor-pointer hover:text-green-500",
            feedbackStatus && "fill-green-500 text-green-500"
          )}
          onClick={() => {
            setFeedbackStatus(true);
            setFeedbackResponse("");
          }}
        />
        <ThumbsDown
          className={cn(
            "size-4 cursor-pointer hover:text-red-500",
            !isNull(feedbackStatus) &&
              !feedbackStatus &&
              "fill-destructive text-destructive"
          )}
          onClick={() => {
            setFeedbackStatus(false);
            setFeedbackResponse("");
          }}
        />
        {feedbackResponse.length > 0 && <p>{feedbackResponse}</p>}
        {!isNull(feedbackStatus) && feedbackResponse.length === 0 && (
          <div
            className={cn(
              "w-full border p-2 rounded-md text-xs flex justify-between items-center",
              feedbackStatus ? "border-green-600" : "border-destructive"
            )}
          >
            <input
              type="text"
              value={feedbackMessage}
              className="w-full focus:outline-none"
              placeholder="Share your thoughts(optional)..."
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send
                className={cn(
                  "size-4 cursor-pointer",
                  feedbackStatus ? "text-green-600" : "text-destructive"
                )}
                onClick={submitFeedback}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackComponent;
