"use client";

import { create } from "zustand";
import {
  FIRST_RESPONSE_TEXT,
  FIRST_WORKOUT_PREFACE,
  REVISED_WORKOUT_PREFACE,
  THINKING_STEPS_FIRST,
  THINKING_STEPS_REVISE,
} from "./canned";
import { matchScenario } from "./scenarios";
import {
  buildWorkoutConfig,
  applyUserMessageToConfig,
  generateWorkoutBlocks,
  generateWorkoutSummary,
  nextWorkoutId,
  cacheWorkout,
  type WorkoutConfig,
} from "./workout-generator";

export type ChatMessage =
  | { id: string; role: "user"; type: "text"; text: string }
  | {
      id: string;
      role: "user";
      type: "answers";
      answers: { question: string; answer: string }[];
    }
  | {
      id: string;
      role: "user";
      type: "workoutContext";
      workoutId: string;
      workoutTitle: string;
      prompt: string;
    }
  | { id: string; role: "laic"; type: "text"; text: string }
  | {
      id: string;
      role: "laic";
      type: "workout";
      preface: string;
      workoutId: string;
      thinkingSteps: string[];
    };

type ContextAnswers = {
  q1?: string;
  q2?: string;
  q3?: string;
};

type Store = {
  messages: ChatMessage[];
  isThinking: boolean;
  thinkingSteps: string[];
  contextAnswers: ContextAnswers;
  contextSheetOpen: boolean;
  attachedWorkoutId: string | null;
  attachedWorkoutTitle: string | null;
  hasIntroduced: boolean;
  lastWorkoutConfig: WorkoutConfig | null;

  // actions
  openContextSheet: () => void;
  closeContextSheet: () => void;
  setAnswer: (q: keyof ContextAnswers, value: string) => void;
  resetAnswers: () => void;

  appendUserText: (text: string) => void;
  appendUserAnswers: (answers: { question: string; answer: string }[]) => void;
  appendLaicText: (text: string) => void;
  appendLaicWorkout: (preface: string, workoutId: string, thinkingSteps?: string[]) => void;

  startSeedFromEmpty: () => void; // user taps "Build a workout" or sends initial message
  seedNewWorkoutChat: () => void; // always reset + seed (called from "Generate a Workout with L•AI•C")
  submitContextAnswers: () => Promise<void>;
  sendUserText: (text: string) => Promise<void>;

  attachWorkoutContext: (id: string, title: string) => void;
  clearWorkoutContext: () => void;

  resetAll: () => void;
};

const newId = () => Math.random().toString(36).slice(2, 10);
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useStore = create<Store>((set, get) => ({
  messages: [],
  isThinking: false,
  thinkingSteps: [],
  contextAnswers: {},
  contextSheetOpen: false,
  attachedWorkoutId: null,
  attachedWorkoutTitle: null,
  hasIntroduced: false,
  lastWorkoutConfig: null,

  openContextSheet: () => set({ contextSheetOpen: true }),
  closeContextSheet: () => set({ contextSheetOpen: false }),
  setAnswer: (q, value) =>
    set((s) => ({ contextAnswers: { ...s.contextAnswers, [q]: value } })),
  resetAnswers: () => set({ contextAnswers: {} }),

  appendUserText: (text) =>
    set((s) => ({
      messages: [...s.messages, { id: newId(), role: "user", type: "text", text }],
    })),
  appendUserAnswers: (answers) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { id: newId(), role: "user", type: "answers", answers },
      ],
    })),
  appendLaicText: (text) =>
    set((s) => ({
      messages: [...s.messages, { id: newId(), role: "laic", type: "text", text }],
    })),
  appendLaicWorkout: (preface, workoutId, thinkingSteps = []) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { id: newId(), role: "laic", type: "workout", preface, workoutId, thinkingSteps },
      ],
    })),

  startSeedFromEmpty: () => {
    const { hasIntroduced, appendUserText, appendLaicText, openContextSheet } =
      get();
    if (hasIntroduced) {
      openContextSheet();
      return;
    }
    appendUserText("Build me a workout");
    appendLaicText(FIRST_RESPONSE_TEXT);
    set({ hasIntroduced: true });
    setTimeout(() => openContextSheet(), 600);
  },

  seedNewWorkoutChat: () => {
    // Always reset and seed — called when "Generate a Workout with L•AI•C" is tapped.
    // Navigation to /chat happens ~220ms after this call, so we delay context sheet
    // long enough for the route to fully mount (1 200 ms gives comfortable headroom).
    set({
      messages: [],
      isThinking: false,
      thinkingSteps: [],
      contextAnswers: {},
      contextSheetOpen: false,
      attachedWorkoutId: null,
      attachedWorkoutTitle: null,
      hasIntroduced: true,
      lastWorkoutConfig: null,
    });
    get().appendUserText("Build me a workout");
    get().appendLaicText(FIRST_RESPONSE_TEXT);
    setTimeout(() => get().openContextSheet(), 1200);
  },

  submitContextAnswers: async () => {
    const { contextAnswers, appendUserAnswers, appendLaicWorkout } = get();
    const answers = [
      { question: "What are you targeting?", answer: contextAnswers.q1 ?? "" },
      { question: "How long do you want to train?", answer: contextAnswers.q2 ?? "" },
      { question: "Where will you be training?", answer: contextAnswers.q3 ?? "" },
    ];
    appendUserAnswers(answers);
    set({ contextSheetOpen: false });
    await runThinking(THINKING_STEPS_FIRST, set);

    // Generate a deterministic workout from the questionnaire answers.
    const config = buildWorkoutConfig(contextAnswers);
    const blocks = generateWorkoutBlocks(config);
    const summary = generateWorkoutSummary(config);
    const id = nextWorkoutId();
    cacheWorkout(id, blocks, summary);
    set({ lastWorkoutConfig: config });
    appendLaicWorkout(FIRST_WORKOUT_PREFACE, id, THINKING_STEPS_FIRST);
  },

  sendUserText: async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // "Build / create / make me a workout" → open the questionnaire instead of generating directly.
    if (isWorkoutCreationIntent(trimmed)) {
      get().appendUserText(trimmed);
      get().appendLaicText(FIRST_RESPONSE_TEXT);
      setTimeout(() => get().openContextSheet(), 500);
      return;
    }

    // Post the user message — as a workout-context chip if Edit was tapped, plain text otherwise.
    const { attachedWorkoutId, attachedWorkoutTitle } = get();
    if (attachedWorkoutId && attachedWorkoutTitle) {
      set((s) => ({
        messages: [
          ...s.messages,
          {
            id: newId(),
            role: "user",
            type: "workoutContext",
            workoutId: attachedWorkoutId,
            workoutTitle: attachedWorkoutTitle,
            prompt: trimmed,
          },
        ],
        attachedWorkoutId: null,
        attachedWorkoutTitle: null,
      }));
    } else {
      get().appendUserText(trimmed);
    }

    // LAIC always responds with thinking → revised/generated workout.
    await runThinking(THINKING_STEPS_REVISE, set);

    const baseConfig = get().lastWorkoutConfig ?? buildWorkoutConfig(get().contextAnswers);
    const newConfig = applyUserMessageToConfig(baseConfig, trimmed);
    const blocks = generateWorkoutBlocks(newConfig);
    const summary = generateWorkoutSummary(newConfig);
    const id = nextWorkoutId();
    cacheWorkout(id, blocks, summary);
    set({ lastWorkoutConfig: newConfig });

    const scenario = matchScenario(trimmed);
    if (scenario) {
      get().appendLaicText(scenario.response);
      await sleep(400);
      get().appendLaicWorkout(scenario.preface, id, THINKING_STEPS_REVISE);
    } else {
      get().appendLaicWorkout(REVISED_WORKOUT_PREFACE, id, THINKING_STEPS_REVISE);
    }
  },

  attachWorkoutContext: (id, title) =>
    set({ attachedWorkoutId: id, attachedWorkoutTitle: title }),
  clearWorkoutContext: () =>
    set({ attachedWorkoutId: null, attachedWorkoutTitle: null }),

  resetAll: () =>
    set({
      messages: [],
      isThinking: false,
      thinkingSteps: [],
      contextAnswers: {},
      contextSheetOpen: false,
      attachedWorkoutId: null,
      attachedWorkoutTitle: null,
      hasIntroduced: false,
      lastWorkoutConfig: null,
    }),
}));

async function runThinking(
  steps: string[],
  set: (
    partial:
      | Partial<{ isThinking: boolean; thinkingSteps: string[] }>
      | ((s: { isThinking: boolean; thinkingSteps: string[] }) => Partial<{ isThinking: boolean; thinkingSteps: string[] }>),
    replace?: false,
  ) => void,
) {
  set({ isThinking: true, thinkingSteps: [steps[0]] });
  for (let i = 1; i < steps.length; i++) {
    await sleep(900);
    set((s) => ({ thinkingSteps: [...s.thinkingSteps, steps[i]] }));
  }
  await sleep(800);
  set({ isThinking: false, thinkingSteps: [] });
}

/**
 * Returns true when the user's message is asking to create / build a brand-new workout
 * rather than editing an existing one. Triggers the questionnaire flow.
 */
function isWorkoutCreationIntent(text: string): boolean {
  const l = text.toLowerCase();
  return !!(
    // "build/create/make/generate/design/plan/write [me] a workout"
    l.match(/\b(build|create|make|generate|design|plan|write)\b.{0,30}\bworkout\b/) ||
    // "give me / get me / set me up with a workout"
    l.match(/\b(give me|get me|set me up)\b.{0,20}\bworkout\b/) ||
    // "I need / want a (new) workout"
    l.match(/\b(need|want)\b.{0,20}\b(a|new|custom)\b.{0,15}\bworkout\b/) ||
    // plain "new workout" or "a new workout"
    l.match(/\bnew workout\b/) ||
    // "start a workout" / "let's work out"
    l.match(/\bstart (a |my )?(new )?workout\b/)
  );
}
