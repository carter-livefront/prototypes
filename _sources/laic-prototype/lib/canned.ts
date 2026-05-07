import { getCachedBlocks, getCachedSummary } from "./workout-generator";

export type WorkoutSummary = {
  id: string;
  title: string;
  subtitle?: string;
};

export const WORKOUT_V1: WorkoutSummary = {
  id: "v1",
  title: "Upper Body Strength",
  subtitle: "Workout at Home",
};

export const WORKOUT_V2: WorkoutSummary = {
  id: "v2",
  title: "Quick Lower Back",
  subtitle: "Friendly Upper Body Strength",
};

export const WORKOUT_NEW: WorkoutSummary = {
  id: "new",
  title: "New Workout",
};

export const SUGGESTION_CHIPS = [
  "Build a workout",
  "Create a program",
  "Recipe ideas",
  "Club amenities",
  "Club hours",
  "Recommend supplements",
];

export const Q1 = {
  title: "What are you targeting?",
  options: ["Full Body", "Upper Body", "Lower Body", "Core"],
  freeform: "Something Else",
} as const;

export const Q2 = {
  title: "How long do you want to train?",
  options: ["Under 30 min", "30–60 min", "90+ min"],
  freeform: "Something Else",
} as const;

export const Q3 = {
  title: "Where will you be training?",
  options: ["Life Time Club", "Home gym with equipment", "At home without equipment"],
  freeform: "Add equipment (Optional)",
} as const;

export const FIRST_RESPONSE_TEXT =
  "I'd love to help, tell me more about your ideal workout";

export const THINKING_STEPS_FIRST = [
  "Reading workout",
  "Searching exercise library",
  "Assembling personalized workout",
];

export const THINKING_STEPS_REVISE = ["Reading workout"];

export const FIRST_WORKOUT_PREFACE =
  "Done. Here is your workout. Here you can view, manually edit, start, or schedule. Let me know if there is anything you would like to change!";

export const REVISED_WORKOUT_PREFACE =
  "Done. Here is new version of your workout that is only 30 minutes long while still hitting all of the key muscles. Is there anything you would like to change?";

export type WorkoutBlock = {
  name: string;
  groupRounds: number;
  exercises: { name: string; reps: string; rir: string }[];
};

export const WORKOUT_V1_DETAIL: WorkoutBlock[] = [
  {
    name: "Warmup",
    groupRounds: 1,
    exercises: [
      { name: "4 Point Thoracic Rotation", reps: "5 Reps", rir: "RIR: 2" },
      { name: "Bodyweight Knelling Hip Stretch Rotation", reps: "5 Reps", rir: "RIR: 2" },
      { name: "Box Jump", reps: "5 Reps", rir: "RIR: 2" },
    ],
  },
  {
    name: "Primary Block",
    groupRounds: 1,
    exercises: [
      { name: "4 Point Thoracic Rotation", reps: "5 Reps", rir: "RIR: 2" },
      { name: "Bodyweight Knelling Hip Stretch Rotation", reps: "5 Reps", rir: "RIR: 2" },
    ],
  },
];

export const WORKOUT_V2_DETAIL: WorkoutBlock[] = [
  {
    name: "Warmup",
    groupRounds: 1,
    exercises: [
      { name: "Cat-Cow Stretch", reps: "8 Reps", rir: "RIR: 2" },
      { name: "Glute Bridge", reps: "10 Reps", rir: "RIR: 2" },
    ],
  },
  {
    name: "Primary Block",
    groupRounds: 2,
    exercises: [
      { name: "Push-Up", reps: "8 Reps", rir: "RIR: 1" },
      { name: "Bent-Over Row", reps: "10 Reps", rir: "RIR: 1" },
    ],
  },
];

export function getWorkoutById(id: string): WorkoutSummary | null {
  if (id === "v1") return WORKOUT_V1;
  if (id === "v2") return WORKOUT_V2;
  if (id === "new") return WORKOUT_NEW;
  const s = getCachedSummary(id);
  if (s) return { id, title: s.title, subtitle: s.subtitle };
  return null;
}

export function getWorkoutDetailById(id: string): WorkoutBlock[] {
  if (id === "new") return [];
  const cached = getCachedBlocks(id);
  if (cached) return cached;
  if (id === "v2") return WORKOUT_V2_DETAIL;
  return WORKOUT_V1_DETAIL;
}
