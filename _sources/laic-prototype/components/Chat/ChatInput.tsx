"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, AudioLines } from "lucide-react";
import { useStore } from "@/lib/store";
import WorkoutContextChip from "./WorkoutContextChip";

export default function ChatInput() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const attachedId = useStore((s) => s.attachedWorkoutId);
  const attachedTitle = useStore((s) => s.attachedWorkoutTitle);
  const clearWorkoutContext = useStore((s) => s.clearWorkoutContext);
  const sendUserText = useStore((s) => s.sendUserText);
  const isThinking = useStore((s) => s.isThinking);

  useEffect(() => {
    if (attachedId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [attachedId]);

  function autoresize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  async function handleSend() {
    if (!value.trim() || isThinking) return;
    const text = value;
    setValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    await sendUserText(text);
  }

  const showSendButton = value.trim().length > 0 || !!attachedId;

  const hasChip = !!(attachedId && attachedTitle);

  return (
    <div className="px-4 pb-2 pt-2 shrink-0 bg-bg">
      <div className={`bg-[#1c1c1e] rounded-3xl px-4 ${hasChip ? "pt-3 pb-2.5" : "py-2.5"} min-h-[44px] flex flex-col gap-2`}>
        {/* Chip lives inside the bubble when present — self-start keeps it from stretching full width */}
        {hasChip && (
          <div className="self-start">
            <WorkoutContextChip title={attachedTitle!} onRemove={clearWorkoutContext} />
          </div>
        )}

        {/* Textarea + action button */}
        <div className="flex items-center gap-2">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              autoresize(e.currentTarget);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={hasChip ? "Describe your workout edits" : "Ask L•AI•C"}
            rows={1}
            className="flex-1 resize-none bg-transparent text-fg placeholder:text-fg-muted text-[16px] outline-none leading-[22px] max-h-[120px]"
          />
          {showSendButton ? (
            <button
              aria-label="Send"
              onClick={handleSend}
              disabled={isThinking}
              className="w-8 h-8 rounded-full bg-white text-black grid place-items-center shrink-0 active:scale-95 disabled:opacity-50"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <button
              aria-label="Voice input"
              className="w-8 h-8 rounded-full bg-white grid place-items-center text-black shrink-0"
            >
              <AudioLines size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
