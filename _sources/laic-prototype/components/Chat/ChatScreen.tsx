"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import StatusBar from "./StatusBar";
import ChatHeader from "./ChatHeader";
import BottomNav from "./BottomNav";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import { MessageRenderer, ThinkingBubble } from "./Bubbles";
import ContextBuilderSheet from "../Sheet/ContextBuilderSheet";

export default function ChatScreen() {
  const messages = useStore((s) => s.messages);
  const isThinking = useStore((s) => s.isThinking);
  const thinkingSteps = useStore((s) => s.thinkingSteps);
  const contextSheetOpen = useStore((s) => s.contextSheetOpen);
  const attachedId = useStore((s) => s.attachedWorkoutId);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, isThinking, thinkingSteps.length]);

  const isEmpty = messages.length === 0 && !isThinking;
  const showBack = !!attachedId || messages.some((m) => m.type === "workoutContext" || (m.role === "laic" && m.type === "workout"));

  return (
    <div className="absolute inset-0 flex flex-col bg-bg">
      <StatusBar />
      <ChatHeader showBack={showBack} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-hide px-4 pb-2 flex flex-col"
      >
        {isEmpty && <EmptyState />}
        {!isEmpty && (
          <div className="space-y-5 pb-2 pt-2">
            {messages.map((m) => (
              <MessageRenderer key={m.id} msg={m} />
            ))}
            {isThinking && <ThinkingBubble steps={thinkingSteps} />}
          </div>
        )}
      </div>

      <ChatInput />
      <BottomNav />

      <AnimatePresence>
        {contextSheetOpen && <ContextBuilderSheet />}
      </AnimatePresence>
    </div>
  );
}
