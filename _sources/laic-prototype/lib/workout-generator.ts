import type { WorkoutBlock } from "./canned";

// Local mirror of the store's ContextAnswers — avoids a circular import.
type ContextAnswers = { q1?: string; q2?: string; q3?: string };

// ── Types ──────────────────────────────────────────────────────────────────

export type EquipmentTier = "bodyweight" | "dumbbell" | "full";
export type MuscleGroup =
  | "chest" | "back" | "shoulders" | "biceps" | "triceps"
  | "quads" | "hamstrings" | "glutes" | "core" | "calves";

type ExDef = {
  name: string;
  tier: EquipmentTier;
  muscles: MuscleGroup[];
  reps: string;
  rir: string;
  tags?: string[]; // "knee-stress" | "shoulder-stress" | "spinal-load" | "wrist-stress" | "elbow-stress" | "high-impact"
};

export type WorkoutConfig = {
  focus: MuscleGroup[];
  duration: "short" | "medium" | "long";
  equipment: EquipmentTier;
  intensity: "light" | "moderate" | "heavy";
  excludeTags: string[];
};

// ── Exercise Library ───────────────────────────────────────────────────────

const WARMUP: ExDef[] = [
  { name: "Cat-Cow Stretch",           tier: "bodyweight", muscles: ["core", "back"],              reps: "10 Reps",            rir: "N/A" },
  { name: "World's Greatest Stretch",  tier: "bodyweight", muscles: ["quads", "back"],              reps: "5 Reps each side",   rir: "N/A" },
  { name: "Hip Circle",                tier: "bodyweight", muscles: ["glutes"],                     reps: "10 Reps each side",  rir: "N/A" },
  { name: "Arm Circle",                tier: "bodyweight", muscles: ["shoulders"],                  reps: "15 Reps each dir",   rir: "N/A" },
  { name: "Leg Swing",                 tier: "bodyweight", muscles: ["hamstrings", "quads"],         reps: "10 Reps each",       rir: "N/A" },
  { name: "Inchworm",                  tier: "bodyweight", muscles: ["back", "shoulders"],           reps: "6 Reps",             rir: "N/A" },
  { name: "4 Point Thoracic Rotation", tier: "bodyweight", muscles: ["back", "shoulders"],           reps: "8 Reps each",        rir: "N/A" },
  { name: "Glute Bridge Activation",   tier: "bodyweight", muscles: ["glutes"],                     reps: "12 Reps",            rir: "N/A" },
  { name: "Dead Bug",                  tier: "bodyweight", muscles: ["core"],                       reps: "8 Reps each",        rir: "N/A" },
  { name: "Hip 90/90 Stretch",         tier: "bodyweight", muscles: ["glutes", "hamstrings"],        reps: "5 Reps each side",   rir: "N/A" },
  { name: "Lateral Leg Swing",         tier: "bodyweight", muscles: ["glutes", "quads"],             reps: "10 Reps each",       rir: "N/A" },
  { name: "Shoulder Roll",             tier: "bodyweight", muscles: ["shoulders"],                  reps: "10 Reps each dir",   rir: "N/A" },
  { name: "Standing Quad Stretch",     tier: "bodyweight", muscles: ["quads"],                      reps: "20 Sec each",        rir: "N/A" },
  { name: "Band Pull-Apart",           tier: "bodyweight", muscles: ["back", "shoulders"],           reps: "15 Reps",            rir: "N/A" },
];

const EXERCISES: ExDef[] = [
  // ── Chest
  { name: "Push-Up",                   tier: "bodyweight", muscles: ["chest", "triceps"],           reps: "12 Reps", rir: "RIR: 2" },
  { name: "Wide Push-Up",              tier: "bodyweight", muscles: ["chest"],                      reps: "12 Reps", rir: "RIR: 2" },
  { name: "Decline Push-Up",           tier: "bodyweight", muscles: ["chest", "shoulders"],         reps: "10 Reps", rir: "RIR: 2", tags: ["shoulder-stress"] },
  { name: "Dumbbell Bench Press",      tier: "dumbbell",   muscles: ["chest", "triceps"],           reps: "10 Reps", rir: "RIR: 2" },
  { name: "Dumbbell Incline Press",    tier: "dumbbell",   muscles: ["chest", "shoulders"],         reps: "10 Reps", rir: "RIR: 2", tags: ["shoulder-stress"] },
  { name: "Dumbbell Fly",              tier: "dumbbell",   muscles: ["chest"],                      reps: "12 Reps", rir: "RIR: 1" },
  { name: "Barbell Bench Press",       tier: "full",       muscles: ["chest", "triceps"],           reps: "8 Reps",  rir: "RIR: 2" },
  { name: "Cable Fly",                 tier: "full",       muscles: ["chest"],                      reps: "12 Reps", rir: "RIR: 1" },
  { name: "Machine Chest Press",       tier: "full",       muscles: ["chest", "triceps"],           reps: "10 Reps", rir: "RIR: 1" },
  // ── Back
  { name: "Superman Hold",             tier: "bodyweight", muscles: ["back"],                       reps: "10 Reps", rir: "RIR: 2", tags: ["spinal-load"] },
  { name: "Inverted Row",              tier: "bodyweight", muscles: ["back", "biceps"],             reps: "10 Reps", rir: "RIR: 2" },
  { name: "Pull-Up",                   tier: "bodyweight", muscles: ["back", "biceps"],             reps: "8 Reps",  rir: "RIR: 2", tags: ["shoulder-stress"] },
  { name: "Dumbbell Row",              tier: "dumbbell",   muscles: ["back", "biceps"],             reps: "10 Reps each", rir: "RIR: 2" },
  { name: "Dumbbell Renegade Row",     tier: "dumbbell",   muscles: ["back", "core"],               reps: "8 Reps each",  rir: "RIR: 2", tags: ["wrist-stress"] },
  { name: "Lat Pulldown",              tier: "full",       muscles: ["back", "biceps"],             reps: "10 Reps", rir: "RIR: 2" },
  { name: "Cable Row",                 tier: "full",       muscles: ["back", "biceps"],             reps: "10 Reps", rir: "RIR: 2" },
  { name: "Barbell Row",               tier: "full",       muscles: ["back", "biceps"],             reps: "8 Reps",  rir: "RIR: 2", tags: ["spinal-load"] },
  { name: "Machine Row",               tier: "full",       muscles: ["back", "biceps"],             reps: "12 Reps", rir: "RIR: 1" },
  { name: "Face Pull",                 tier: "full",       muscles: ["shoulders", "back"],          reps: "15 Reps", rir: "RIR: 1" },
  // ── Shoulders
  { name: "Pike Push-Up",              tier: "bodyweight", muscles: ["shoulders", "triceps"],       reps: "10 Reps", rir: "RIR: 2", tags: ["shoulder-stress"] },
  { name: "Dumbbell Shoulder Press",   tier: "dumbbell",   muscles: ["shoulders", "triceps"],       reps: "10 Reps", rir: "RIR: 2", tags: ["shoulder-stress"] },
  { name: "Dumbbell Lateral Raise",    tier: "dumbbell",   muscles: ["shoulders"],                  reps: "15 Reps", rir: "RIR: 1" },
  { name: "Dumbbell Front Raise",      tier: "dumbbell",   muscles: ["shoulders"],                  reps: "12 Reps", rir: "RIR: 1" },
  { name: "Dumbbell Rear Delt Fly",    tier: "dumbbell",   muscles: ["shoulders", "back"],          reps: "15 Reps", rir: "RIR: 1" },
  { name: "Barbell Overhead Press",    tier: "full",       muscles: ["shoulders", "triceps"],       reps: "8 Reps",  rir: "RIR: 2", tags: ["shoulder-stress", "spinal-load"] },
  { name: "Cable Lateral Raise",       tier: "full",       muscles: ["shoulders"],                  reps: "15 Reps", rir: "RIR: 1" },
  { name: "Machine Shoulder Press",    tier: "full",       muscles: ["shoulders"],                  reps: "10 Reps", rir: "RIR: 1", tags: ["shoulder-stress"] },
  // ── Biceps
  { name: "Dumbbell Bicep Curl",       tier: "dumbbell",   muscles: ["biceps"],                     reps: "12 Reps", rir: "RIR: 1" },
  { name: "Hammer Curl",               tier: "dumbbell",   muscles: ["biceps"],                     reps: "12 Reps", rir: "RIR: 1" },
  { name: "Concentration Curl",        tier: "dumbbell",   muscles: ["biceps"],                     reps: "12 Reps each", rir: "RIR: 1" },
  { name: "Barbell Curl",              tier: "full",       muscles: ["biceps"],                     reps: "10 Reps", rir: "RIR: 1" },
  { name: "Cable Curl",                tier: "full",       muscles: ["biceps"],                     reps: "12 Reps", rir: "RIR: 1" },
  { name: "Preacher Curl",             tier: "full",       muscles: ["biceps"],                     reps: "10 Reps", rir: "RIR: 1", tags: ["elbow-stress"] },
  // ── Triceps
  { name: "Diamond Push-Up",           tier: "bodyweight", muscles: ["triceps", "chest"],           reps: "10 Reps", rir: "RIR: 2", tags: ["wrist-stress"] },
  { name: "Tricep Dip",                tier: "bodyweight", muscles: ["triceps"],                    reps: "12 Reps", rir: "RIR: 2", tags: ["shoulder-stress", "elbow-stress"] },
  { name: "Dumbbell Tricep Extension", tier: "dumbbell",   muscles: ["triceps"],                    reps: "12 Reps", rir: "RIR: 1" },
  { name: "Skull Crusher",             tier: "dumbbell",   muscles: ["triceps"],                    reps: "12 Reps", rir: "RIR: 1", tags: ["elbow-stress"] },
  { name: "Cable Pushdown",            tier: "full",       muscles: ["triceps"],                    reps: "15 Reps", rir: "RIR: 1" },
  { name: "Rope Pushdown",             tier: "full",       muscles: ["triceps"],                    reps: "15 Reps", rir: "RIR: 1" },
  // ── Quads
  { name: "Bodyweight Squat",          tier: "bodyweight", muscles: ["quads", "glutes"],            reps: "15 Reps", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Jump Squat",                tier: "bodyweight", muscles: ["quads", "glutes"],            reps: "12 Reps", rir: "RIR: 2", tags: ["knee-stress", "high-impact"] },
  { name: "Reverse Lunge",             tier: "bodyweight", muscles: ["quads", "glutes"],            reps: "10 Reps each", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Step-Up",                   tier: "bodyweight", muscles: ["quads", "glutes"],            reps: "12 Reps each", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Wall Sit",                  tier: "bodyweight", muscles: ["quads"],                      reps: "30 Seconds",   rir: "RIR: N/A", tags: ["knee-stress"] },
  { name: "Dumbbell Goblet Squat",     tier: "dumbbell",   muscles: ["quads", "glutes"],            reps: "12 Reps", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Dumbbell Bulgarian Split Squat", tier: "dumbbell", muscles: ["quads", "glutes"],         reps: "10 Reps each", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Dumbbell Step-Up",          tier: "dumbbell",   muscles: ["quads", "glutes"],            reps: "12 Reps each", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Barbell Squat",             tier: "full",       muscles: ["quads", "glutes"],            reps: "8 Reps",  rir: "RIR: 2", tags: ["knee-stress", "spinal-load"] },
  { name: "Leg Press",                 tier: "full",       muscles: ["quads", "glutes"],            reps: "10 Reps", rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Leg Extension",             tier: "full",       muscles: ["quads"],                      reps: "15 Reps", rir: "RIR: 1", tags: ["knee-stress"] },
  // ── Hamstrings
  { name: "Good Morning",              tier: "bodyweight", muscles: ["hamstrings", "back"],         reps: "12 Reps", rir: "RIR: 2", tags: ["spinal-load"] },
  { name: "Nordic Curl",               tier: "bodyweight", muscles: ["hamstrings"],                 reps: "6 Reps",  rir: "RIR: 2", tags: ["knee-stress"] },
  { name: "Dumbbell Romanian Deadlift",tier: "dumbbell",   muscles: ["hamstrings", "glutes"],       reps: "10 Reps", rir: "RIR: 2", tags: ["spinal-load"] },
  { name: "Barbell Romanian Deadlift", tier: "full",       muscles: ["hamstrings", "glutes"],       reps: "8 Reps",  rir: "RIR: 2", tags: ["spinal-load"] },
  { name: "Barbell Deadlift",          tier: "full",       muscles: ["hamstrings", "back", "glutes"], reps: "5 Reps", rir: "RIR: 2", tags: ["spinal-load"] },
  { name: "Leg Curl",                  tier: "full",       muscles: ["hamstrings"],                 reps: "12 Reps", rir: "RIR: 1" },
  // ── Glutes
  { name: "Glute Bridge",              tier: "bodyweight", muscles: ["glutes", "hamstrings"],       reps: "15 Reps", rir: "RIR: 2" },
  { name: "Bodyweight Hip Thrust",     tier: "bodyweight", muscles: ["glutes"],                     reps: "15 Reps", rir: "RIR: 2" },
  { name: "Donkey Kick",               tier: "bodyweight", muscles: ["glutes"],                     reps: "15 Reps each", rir: "RIR: 2" },
  { name: "Fire Hydrant",              tier: "bodyweight", muscles: ["glutes"],                     reps: "15 Reps each", rir: "RIR: 2" },
  { name: "Clamshell",                 tier: "bodyweight", muscles: ["glutes"],                     reps: "15 Reps each", rir: "RIR: 2" },
  { name: "Dumbbell Hip Thrust",       tier: "dumbbell",   muscles: ["glutes"],                     reps: "12 Reps", rir: "RIR: 1" },
  { name: "Barbell Hip Thrust",        tier: "full",       muscles: ["glutes", "hamstrings"],       reps: "10 Reps", rir: "RIR: 2" },
  { name: "Cable Kickback",            tier: "full",       muscles: ["glutes"],                     reps: "15 Reps each", rir: "RIR: 1" },
  { name: "Hip Abduction Machine",     tier: "full",       muscles: ["glutes"],                     reps: "15 Reps", rir: "RIR: 1" },
  // ── Core
  { name: "Plank",                     tier: "bodyweight", muscles: ["core"],                       reps: "30 Seconds", rir: "RIR: N/A" },
  { name: "Side Plank",                tier: "bodyweight", muscles: ["core"],                       reps: "20 Sec each", rir: "RIR: N/A" },
  { name: "Crunch",                    tier: "bodyweight", muscles: ["core"],                       reps: "20 Reps", rir: "RIR: 2" },
  { name: "Bicycle Crunch",            tier: "bodyweight", muscles: ["core"],                       reps: "20 Reps each", rir: "RIR: 2" },
  { name: "Leg Raise",                 tier: "bodyweight", muscles: ["core"],                       reps: "15 Reps", rir: "RIR: 2" },
  { name: "Russian Twist",             tier: "bodyweight", muscles: ["core"],                       reps: "20 Reps each", rir: "RIR: 2" },
  { name: "Mountain Climbers",         tier: "bodyweight", muscles: ["core"],                       reps: "20 Reps each", rir: "RIR: 2", tags: ["high-impact", "wrist-stress"] },
  { name: "Hollow Body Hold",          tier: "bodyweight", muscles: ["core"],                       reps: "20 Seconds", rir: "RIR: N/A" },
  { name: "Dead Bug",                  tier: "bodyweight", muscles: ["core"],                       reps: "8 Reps each", rir: "RIR: 2" },
  { name: "Pallof Press",              tier: "full",       muscles: ["core"],                       reps: "12 Reps each", rir: "RIR: 1" },
  { name: "Cable Crunch",              tier: "full",       muscles: ["core"],                       reps: "15 Reps", rir: "RIR: 1" },
  { name: "Hanging Leg Raise",         tier: "full",       muscles: ["core"],                       reps: "12 Reps", rir: "RIR: 2", tags: ["shoulder-stress"] },
  // ── Calves
  { name: "Standing Calf Raise",       tier: "bodyweight", muscles: ["calves"],                     reps: "20 Reps", rir: "RIR: 1" },
  { name: "Single-Leg Calf Raise",     tier: "bodyweight", muscles: ["calves"],                     reps: "15 Reps each", rir: "RIR: 1" },
  { name: "Dumbbell Calf Raise",       tier: "dumbbell",   muscles: ["calves"],                     reps: "20 Reps", rir: "RIR: 1" },
  { name: "Seated Calf Raise",         tier: "full",       muscles: ["calves"],                     reps: "15 Reps", rir: "RIR: 1" },
];

// ── Cache (module-level, persists for session) ─────────────────────────────

const blockCache = new Map<string, WorkoutBlock[]>();
const summaryCache = new Map<string, { title: string; subtitle: string }>();
let genCounter = 0;

export function nextWorkoutId(): string { return `gen-${++genCounter}`; }

export function cacheWorkout(
  id: string,
  blocks: WorkoutBlock[],
  summary: { title: string; subtitle: string },
): void {
  blockCache.set(id, blocks);
  summaryCache.set(id, summary);
}

export function getCachedBlocks(id: string): WorkoutBlock[] | null {
  return blockCache.get(id) ?? null;
}

export function getCachedSummary(id: string): { title: string; subtitle: string } | null {
  return summaryCache.get(id) ?? null;
}

// ── Config parsing ─────────────────────────────────────────────────────────

export function buildWorkoutConfig(answers: ContextAnswers): WorkoutConfig {
  return {
    focus: parseFocus(answers.q1 ?? "Full Body"),
    duration: parseDuration(answers.q2 ?? "30–60 min"),
    equipment: parseEquipment(answers.q3 ?? "Life Time Club"),
    intensity: "moderate",
    excludeTags: [],
  };
}

function parseFocus(q1: string): MuscleGroup[] {
  const l = q1.toLowerCase();
  if (l.includes("full body")) return ["chest", "back", "quads", "glutes", "core"];
  if (l.includes("upper body")) return ["chest", "back", "shoulders", "biceps", "triceps"];
  if (l.includes("lower body")) return ["quads", "hamstrings", "glutes", "calves"];
  if (l.includes("core")) return ["core", "back"];
  // freeform keyword detection
  if (l.match(/leg|squat|lunge/)) return ["quads", "hamstrings", "glutes", "calves"];
  if (l.match(/glute|booty|butt/)) return ["glutes", "hamstrings"];
  if (l.match(/chest|push|pec/)) return ["chest", "triceps", "shoulders"];
  if (l.match(/back|pull|row/)) return ["back", "biceps"];
  if (l.match(/shoulder|delt/)) return ["shoulders", "back"];
  if (l.match(/arm|bicep|tricep/)) return ["biceps", "triceps", "shoulders"];
  return ["chest", "back", "quads", "glutes", "core"];
}

function parseDuration(q2: string): "short" | "medium" | "long" {
  const l = q2.toLowerCase();
  if (l.match(/under 30|20 ?min|15 ?min|quick/)) return "short";
  if (l.match(/90|2 hour|120|long/)) return "long";
  return "medium";
}

function parseEquipment(q3: string): EquipmentTier {
  const l = q3.toLowerCase();
  // If any selection includes "without equipment" → bodyweight
  if (l.includes("without equipment")) return "bodyweight";
  // If home gym or equipment mentioned → dumbbell
  if (l.match(/home gym|with equipment/)) return "dumbbell";
  // Life Time or similar full gym
  if (l.match(/life time|lifetime|club/)) return "full";
  // Freeform fallback
  if (l.match(/hotel|travel|park|outside|outdoors/)) return "bodyweight";
  return "full";
}

// ── Message-based config modification (for revisions) ─────────────────────

export function applyUserMessageToConfig(base: WorkoutConfig, message: string): WorkoutConfig {
  const l = message.toLowerCase();
  const c: WorkoutConfig = { ...base, excludeTags: [...base.excludeTags], focus: [...base.focus] };

  // Injuries → exclude tags
  if (l.match(/knee/))                           c.excludeTags.push("knee-stress");
  if (l.match(/shoulder/))                       c.excludeTags.push("shoulder-stress");
  if (l.match(/back hurts|lower back|back pain/))c.excludeTags.push("spinal-load");
  if (l.match(/wrist/))                          c.excludeTags.push("wrist-stress");
  if (l.match(/ankle/))                          c.excludeTags.push("high-impact");
  if (l.match(/elbow/))                          c.excludeTags.push("elbow-stress");

  // Time
  if (l.match(/20 min|only.*20/))               c.duration = "short";
  if (l.match(/30 min|half an hour/))            c.duration = "short";
  if (l.match(/45 min/))                         c.duration = "medium";
  if (l.match(/90 min|hour and a half/))         c.duration = "long";
  if (l.match(/have an hour|60 min|full hour/))  c.duration = "medium";

  // Equipment
  if (l.match(/no equipment|bodyweight|at home|hotel|outdoors|outside/)) c.equipment = "bodyweight";
  if (l.match(/only.*dumbbell|dumbbell only|no barbell|no machines/))    c.equipment = "dumbbell";

  // Intensity
  if (l.match(/too hard|tired|exhausted|sore|rest day|scale back|make it easier|recovery|beginner/)) c.intensity = "light";
  if (l.match(/too easy|feel great|energized|make it harder|more intense|sweat|destroy|killer/))     c.intensity = "heavy";

  // Focus redirects
  if (l.match(/leg day|work legs|lower body/))      c.focus = ["quads", "hamstrings", "glutes", "calves"];
  if (l.match(/arm day|work arms|bicep|tricep/))     c.focus = ["biceps", "triceps", "shoulders"];
  if (l.match(/chest day|work chest/))               c.focus = ["chest", "triceps", "shoulders"];
  if (l.match(/back day|work back/))                 c.focus = ["back", "biceps"];
  if (l.match(/shoulder day|work shoulder|delt/))    c.focus = ["shoulders", "back"];
  if (l.match(/glute|booty/))                        c.focus = ["glutes", "hamstrings"];
  if (l.match(/\bcore\b|ab work|\babs\b/))           c.focus = ["core"];
  if (l.match(/full body|total body/))               c.focus = ["chest", "back", "quads", "glutes", "core"];

  return c;
}

// ── Generation ─────────────────────────────────────────────────────────────

const EX_COUNT  = { short: 3, medium: 4, long: 5 } as const;
const ROUNDS    = { short: 2, medium: 3, long: 4  } as const;
const WU_COUNT  = { short: 3, medium: 4, long: 5  } as const;

type BlockSpec = { name: string; muscles: MuscleGroup[] };

function blockSpecs(focus: MuscleGroup[], dur: WorkoutConfig["duration"]): BlockSpec[] {
  const hasChest = focus.includes("chest");
  const hasQuads = focus.includes("quads") || focus.includes("hamstrings");
  const isUpper  = hasChest && !hasQuads;
  const isLower  = hasQuads && !hasChest;
  const isFull   = hasChest && hasQuads;
  const isCore   = focus.includes("core") && !hasChest && !hasQuads;
  const isGlutes = focus.includes("glutes") && !hasChest && !hasQuads && !focus.includes("quads");

  if (isFull) {
    if (dur === "short") return [{ name: "Main Block", muscles: focus }];
    if (dur === "medium") return [
      { name: "Upper Block", muscles: ["chest", "back", "shoulders"] },
      { name: "Lower Block", muscles: ["quads", "glutes", "core"] },
    ];
    return [
      { name: "Upper Block",   muscles: ["chest", "back", "shoulders"] },
      { name: "Lower Block",   muscles: ["quads", "hamstrings", "glutes"] },
      { name: "Core & Arms",   muscles: ["core", "biceps", "triceps"] },
    ];
  }
  if (isUpper) {
    if (dur === "short") return [{ name: "Push & Pull", muscles: ["chest", "back", "shoulders"] }];
    if (dur === "medium") return [
      { name: "Push Block", muscles: ["chest", "triceps", "shoulders"] },
      { name: "Pull Block", muscles: ["back", "biceps"] },
    ];
    return [
      { name: "Push Block",    muscles: ["chest", "shoulders"] },
      { name: "Pull Block",    muscles: ["back", "biceps"] },
      { name: "Arm Finisher",  muscles: ["triceps", "biceps"] },
    ];
  }
  if (isLower || isGlutes) {
    if (dur === "short") return [{ name: "Main Block", muscles: focus }];
    if (dur === "medium") return [
      { name: "Strength Block", muscles: ["quads", "hamstrings"] },
      { name: "Glute Block",    muscles: ["glutes", "calves"] },
    ];
    return [
      { name: "Quad Block",      muscles: ["quads"] },
      { name: "Hamstring Block", muscles: ["hamstrings", "glutes"] },
      { name: "Glute Finisher",  muscles: ["glutes", "calves", "core"] },
    ];
  }
  if (isCore) {
    if (dur === "short") return [{ name: "Core Block", muscles: ["core"] }];
    if (dur === "medium") return [
      { name: "Stability Block", muscles: ["core"] },
      { name: "Dynamic Core",    muscles: ["core"] },
    ];
    return [
      { name: "Stability Block", muscles: ["core"] },
      { name: "Dynamic Core",    muscles: ["core"] },
      { name: "Core Finisher",   muscles: ["core"] },
    ];
  }
  // Generic fallback
  return [{ name: "Main Block", muscles: focus }];
}

function compatibleTier(exTier: EquipmentTier, cfgTier: EquipmentTier): boolean {
  if (cfgTier === "full") return true;
  if (cfgTier === "dumbbell") return exTier !== "full";
  return exTier === "bodyweight";
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const r = [...arr];
  let s = seed | 0;
  for (let i = r.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 17), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    const j = Math.abs(s) % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function configSeed(c: WorkoutConfig): number {
  const key = [...c.focus].sort().join(",") + "|" + c.duration + "|" + c.equipment + "|" + c.intensity + "|" + [...c.excludeTags].sort().join(",");
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickExercises(muscles: MuscleGroup[], config: WorkoutConfig, count: number, seed: number): ExDef[] {
  const pool = EXERCISES.filter(e =>
    compatibleTier(e.tier, config.equipment) &&
    !(e.tags ?? []).some(t => config.excludeTags.includes(t)) &&
    e.muscles.some(m => muscles.includes(m))
  );
  const shuffled = seededShuffle(pool, seed);
  const seen = new Set<string>();
  const picked: ExDef[] = [];
  for (const ex of shuffled) {
    if (picked.length >= count) break;
    if (!seen.has(ex.name)) { seen.add(ex.name); picked.push(ex); }
  }
  return picked;
}

function pickWarmup(focus: MuscleGroup[], count: number, seed: number): ExDef[] {
  const relevant = WARMUP.filter(e => e.muscles.some(m => focus.includes(m)));
  const rest     = WARMUP.filter(e => !relevant.includes(e));
  const pool     = [...seededShuffle(relevant, seed), ...seededShuffle(rest, seed + 1)];
  const seen = new Set<string>();
  const picked: ExDef[] = [];
  for (const e of pool) {
    if (picked.length >= count) break;
    if (!seen.has(e.name)) { seen.add(e.name); picked.push(e); }
  }
  return picked;
}

function adjustReps(reps: string, intensity: WorkoutConfig["intensity"]): string {
  const m = reps.match(/^(\d+)(\s+Reps.*)$/);
  if (!m) return reps; // Seconds / N/A — leave untouched
  const n = parseInt(m[1]);
  if (intensity === "heavy") return `${Math.max(n - 4, 4)}${m[2]}`;
  if (intensity === "light")  return `${n + 4}${m[2]}`;
  return reps;
}

export function generateWorkoutBlocks(config: WorkoutConfig): WorkoutBlock[] {
  const seed   = configSeed(config);
  const specs  = blockSpecs(config.focus, config.duration);
  const warmup = pickWarmup(config.focus, WU_COUNT[config.duration], seed);

  const warmupBlock: WorkoutBlock = {
    name: "Warmup",
    groupRounds: 1,
    exercises: warmup.map(e => ({ name: e.name, reps: e.reps, rir: e.rir })),
  };

  const workingBlocks: WorkoutBlock[] = specs.map((spec, i) => ({
    name: spec.name,
    groupRounds: ROUNDS[config.duration],
    exercises: pickExercises(spec.muscles, config, EX_COUNT[config.duration], seed + i + 1)
      .map(e => ({ name: e.name, reps: adjustReps(e.reps, config.intensity), rir: e.rir })),
  }));

  return [warmupBlock, ...workingBlocks];
}

// ── Exercise directory (for Add Exercise sheet) ────────────────────────────

/** Returns all exercise names (warmup + working) sorted alphabetically. */
export function getAllExerciseNames(): string[] {
  return [...new Set([...WARMUP, ...EXERCISES].map((e) => e.name))].sort();
}

// ── Title generation ───────────────────────────────────────────────────────

export function generateWorkoutSummary(config: WorkoutConfig): { title: string; subtitle: string } {
  const f = config.focus;
  const hasChest = f.includes("chest"), hasQuads = f.includes("quads") || f.includes("hamstrings");

  let title: string;
  if (hasChest && hasQuads)            title = config.duration === "short" ? "Full Body Express" : config.duration === "long" ? "Full Body Extended" : "Full Body Strength";
  else if (hasChest)                   title = "Upper Body Strength";
  else if (f.includes("glutes") && !hasQuads) title = "Glute Focus";
  else if (hasQuads)                   title = "Lower Body Power";
  else if (f.includes("core") && f.length <= 2) title = "Core & Stability";
  else if (f.includes("biceps"))       title = "Arms & Shoulders";
  else if (f.includes("shoulders"))    title = "Shoulder & Back";
  else                                 title = "Personalized Workout";

  const loc = config.equipment === "bodyweight" ? "At Home" : config.equipment === "dumbbell" ? "Home Gym" : "At Life Time";
  const dur = config.duration === "short" ? "~20 min" : config.duration === "long" ? "~90 min" : "~45 min";

  return { title, subtitle: `${loc} · ${dur}` };
}
