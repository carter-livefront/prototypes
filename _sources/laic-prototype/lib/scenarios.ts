// Canned scenario matching for workout edit chat.
// No AI — pure keyword matching. First scenario whose keywords appear in the
// user's message wins. Falls back to REVISED_WORKOUT_PREFACE if nothing matches.

export type Scenario = {
  keywords: string[];
  response: string;
  preface: string;
};

export const SCENARIOS: Scenario[] = [
  // ── Injury / Pain ──────────────────────────────────────────────────────────
  {
    keywords: ["knee hurts", "knee pain", "knee is sore", "bad knee", "hurt my knee"],
    response:
      "Got it — I'll swap out any knee-heavy movements and replace them with hip-hinge and upper body alternatives that won't aggravate it.",
    preface:
      "Here's your adjusted workout with knee-friendly substitutions. Let me know if you'd like any other changes!",
  },
  {
    keywords: ["shoulder hurts", "shoulder pain", "shoulder is sore", "bad shoulder", "hurt my shoulder", "rotator"],
    response:
      "Noted. I've removed all overhead pressing and rotator cuff stress. Swapping in cable rows and neutral-grip work instead.",
    preface:
      "Here's your shoulder-friendly version. Everything overhead has been replaced. Let me know if anything else needs adjusting!",
  },
  {
    keywords: ["back hurts", "back pain", "lower back", "back is sore", "hurt my back", "spine"],
    response:
      "I'll cut the heavy spinal loading and focus on unilateral movements and core stability work instead.",
    preface:
      "Here's your back-safe workout. Spinal compression moves are out, stability work is in. Let me know if you'd like more changes!",
  },
  {
    keywords: ["wrist hurts", "wrist pain", "wrist is sore", "hurt my wrist", "bad wrist"],
    response:
      "On it — I've replaced barbell and dumbbell gripping exercises with cable and machine alternatives to keep your wrists neutral throughout.",
    preface:
      "Here's your wrist-friendly version. All grip-heavy movements have been swapped. Let me know if you need anything else adjusted!",
  },
  {
    keywords: ["ankle hurts", "ankle pain", "ankle is sore", "hurt my ankle", "bad ankle", "twisted my ankle"],
    response:
      "I'll remove all single-leg and jumping movements and substitute seated or upper body exercises so you can still get a solid session in.",
    preface:
      "Here's your ankle-safe workout — no impact or balance work. Let me know if you'd like to tweak anything else!",
  },
  {
    keywords: ["hip hurts", "hip pain", "hip is sore", "hurt my hip", "bad hip"],
    response:
      "Got it — I'm removing hip flexion-heavy movements and rebuilding around upper body and core work so you don't aggravate it.",
    preface:
      "Here's your hip-friendly workout. Heavy hip flexion is out. Let me know if you'd like any other changes!",
  },
  {
    keywords: ["neck hurts", "neck pain", "neck is sore", "hurt my neck", "bad neck", "stiff neck"],
    response:
      "I'll remove overhead and heavy trap work and replace it with mobility-friendly movements that won't load your neck.",
    preface:
      "Here's your neck-safe version. Overhead and trap work has been removed. Let me know if you need anything else adjusted!",
  },
  {
    keywords: ["elbow hurts", "elbow pain", "elbow is sore", "hurt my elbow", "bad elbow", "tennis elbow"],
    response:
      "Noted. I've cut direct elbow flexion and extension work and replaced it with neutral-grip and cable alternatives.",
    preface:
      "Here's your elbow-friendly workout. Direct arm work has been swapped out. Let me know if you'd like any more changes!",
  },
  {
    keywords: ["hamstring hurts", "hamstring pain", "pulled my hamstring", "hamstring is tight"],
    response:
      "I'll remove all hamstring-loaded movements like deadlifts and leg curls and replace them with quad-dominant and upper body work.",
    preface:
      "Here's your hamstring-safe version. Loaded hip hinging is out. Let me know if you'd like to adjust anything else!",
  },
  {
    keywords: ["chest hurts", "chest pain", "pec hurts", "pec pain"],
    response:
      "I'll remove all pressing movements and replace them with back, shoulder, and arm work so your chest gets full rest.",
    preface:
      "Here's your chest-free workout. All pressing is out. Let me know if you'd like any other changes!",
  },

  // ── Energy / Fatigue ───────────────────────────────────────────────────────
  {
    keywords: ["really tired", "very tired", "super tired", "exhausted", "no energy", "drained", "running on empty"],
    response:
      "I'll convert this to a recovery-focused session — light movement, activation work, and stretching only. Your body needs it.",
    preface:
      "Here's a low-demand recovery session. Easy movement, no heavy loading. Let me know if you'd like it adjusted!",
  },
  {
    keywords: ["tired", "low energy", "feeling sluggish", "sluggish", "worn out"],
    response:
      "Let's dial it back. I'll switch this to a lower-intensity session with lighter loads and a bit more rest built in.",
    preface:
      "Here's your scaled-back version. Same structure, lower intensity. Let me know if you'd like anything else changed!",
  },
  {
    keywords: ["didn't sleep", "bad sleep", "no sleep", "not enough sleep", "poor sleep", "up all night"],
    response:
      "Sleep takes priority. I'll scale this down to a 30-minute active recovery session — enough to move without digging yourself into a hole.",
    preface:
      "Here's a short recovery session built around your sleep deficit. Let me know if you'd like it adjusted!",
  },
  {
    keywords: ["feel great", "feeling great", "feeling good", "energized", "full of energy", "on fire", "let's go"],
    response:
      "Love the energy — I'll ramp up the volume and add a few intensity techniques to match how you're feeling today.",
    preface:
      "Here's your amped-up version. Volume is up, intensity techniques added. Let me know if you want even more!",
  },

  // ── Time Constraints ───────────────────────────────────────────────────────
  {
    keywords: ["only have 20 minutes", "20 min", "20-minute", "short on time", "no time", "really short on time"],
    response:
      "No problem — I'll compress this into a 20-minute circuit hitting the same muscles in half the time.",
    preface:
      "Here's your 20-minute version. Same muscles, circuit format. Let me know if you'd like any tweaks!",
  },
  {
    keywords: ["only have 30 minutes", "30 min", "30-minute", "half an hour"],
    response:
      "Switching to a 30-minute format. I'll superset the movements to keep the intensity up while cutting the time down.",
    preface:
      "Here's your 30-minute superset version. Efficient and effective. Let me know if you'd like any changes!",
  },
  {
    keywords: ["only have 45 minutes", "45 min", "45-minute"],
    response:
      "I'll tighten the rest periods and trim the warmup to five minutes. You'll still hit everything that matters.",
    preface:
      "Here's your 45-minute version with tighter rest. Let me know if you'd like anything adjusted!",
  },
  {
    keywords: ["have an hour", "i have an hour", "60 minutes", "60 min", "full hour"],
    response:
      "Perfect — I'll add an extra accessory block and extend the warmup so you make the most of the full hour.",
    preface:
      "Here's your full 60-minute version with an added accessory block. Let me know if you'd like anything changed!",
  },

  // ── Equipment ─────────────────────────────────────────────────────────────
  {
    keywords: ["no equipment", "at home", "home workout", "no gym"],
    response:
      "Switching to bodyweight only. I'll use progressions and tempo to maintain the challenge without any equipment.",
    preface:
      "Here's your bodyweight-only version. No equipment needed. Let me know if you'd like any changes!",
  },
  {
    keywords: ["no dumbbells", "no weights", "don't have weights", "no free weights"],
    response:
      "I'll replace all dumbbell work with resistance bands and bodyweight alternatives that hit the same muscles.",
    preface:
      "Here's your dumbbell-free version. Same movement patterns, no weights needed. Let me know if you'd like any adjustments!",
  },
  {
    keywords: ["no barbell", "no bar", "don't have a barbell"],
    response:
      "Swapped all barbell lifts to dumbbell and machine equivalents. Same movement patterns, no bar required.",
    preface:
      "Here's your barbell-free version. Dumbbells and machines throughout. Let me know if you'd like anything else changed!",
  },
  {
    keywords: ["only have dumbbells", "just dumbbells", "dumbbell only", "dumbbell-only"],
    response:
      "I'll restructure this as a full dumbbell-only session — no barbell or machines needed.",
    preface:
      "Here's your all-dumbbell version. Just grab one set and you're good to go. Let me know if you'd like any tweaks!",
  },
  {
    keywords: ["hotel", "traveling", "on a trip", "away from home", "on the road"],
    response:
      "Hotel workout mode — I'll build this around bodyweight and minimal equipment so you can do it anywhere.",
    preface:
      "Here's your travel-friendly version. Bodyweight and space is all you need. Let me know if you'd like any changes!",
  },
  {
    keywords: ["gym is busy", "crowded gym", "can't get equipment", "equipment is taken", "packed gym"],
    response:
      "I'll swap to a single-station routine — all you need is one set of dumbbells and a bench. No waiting required.",
    preface:
      "Here's your minimal-equipment version you can do in a busy gym. Let me know if you'd like anything adjusted!",
  },
  {
    keywords: ["outside", "outdoors", "park", "outdoor workout", "outside workout"],
    response:
      "Taking it outside — I'll build this around benches, open space, and bodyweight movements.",
    preface:
      "Here's your outdoor version. No gym equipment needed. Let me know if you'd like any changes!",
  },
  {
    keywords: ["have a treadmill", "on a treadmill", "treadmill"],
    response:
      "I'll anchor the cardio block to the treadmill and keep everything else equipment-optional around it.",
    preface:
      "Here's your treadmill-based version. Cardio is locked in, strength work is optional. Let me know if you'd like any adjustments!",
  },
  {
    keywords: ["have a bike", "on a bike", "stationary bike", "cycling", "spin bike"],
    response:
      "I'll swap the cardio block to the bike and pair it with complementary strength movements.",
    preface:
      "Here's your bike-based version. Cardio is on the bike, strength is paired in. Let me know if you'd like any tweaks!",
  },

  // ── Intensity / Difficulty ─────────────────────────────────────────────────
  {
    keywords: ["too hard", "too difficult", "too challenging", "way too hard", "really hard"],
    response:
      "I'll pull back the intensity — lighter loads, fewer sets, and more rest built in so you can move well through the whole thing.",
    preface:
      "Here's your scaled-down version. Easier loads and more rest. Let me know if you'd like it adjusted further!",
  },
  {
    keywords: ["too easy", "not challenging", "need more challenge", "way too easy", "boring"],
    response:
      "Let's make this harder — I'm adding a drop set to each major lift and cutting your rest by 15 seconds.",
    preface:
      "Here's your ramped-up version. Drop sets added, rest reduced. Let me know if you want even more!",
  },
  {
    keywords: ["make it harder", "increase difficulty", "level up", "more intense", "push me harder", "harder workout"],
    response:
      "Bumping up the challenge. I'll add supersets, pause reps, and tempo work to each block.",
    preface:
      "Here's your advanced version. Supersets, pauses, and tempo throughout. Let me know if you'd like any changes!",
  },
  {
    keywords: ["make it easier", "scale it down", "scale back", "easier workout", "dial it back"],
    response:
      "I'll regress the movements and reduce the overall volume so you can move with confidence throughout.",
    preface:
      "Here's your scaled-back version. Lower volume, regressed movements. Let me know if you'd like any adjustments!",
  },

  // ── Cardio ────────────────────────────────────────────────────────────────
  {
    keywords: ["more cardio", "add cardio", "want cardio", "need cardio", "cardio focused"],
    response:
      "I'll add conditioning finishers between blocks and bring in supersets to keep your heart rate elevated throughout.",
    preface:
      "Here's your cardio-boosted version. Conditioning work added throughout. Let me know if you'd like any changes!",
  },
  {
    keywords: ["less cardio", "no cardio", "hate cardio", "remove cardio", "skip cardio"],
    response:
      "Done — I've cut the conditioning work and replaced it with an extra strength accessory block.",
    preface:
      "Here's your cardio-free version. Extra strength work added in its place. Let me know if you'd like anything else changed!",
  },
  {
    keywords: ["love running", "add running", "more running", "running workout", "run"],
    response:
      "I'll weave running intervals into the warm-up and cardio blocks so you get your miles in.",
    preface:
      "Here's your running-integrated version. Intervals built throughout. Let me know if you'd like any tweaks!",
  },

  // ── Muscle Focus ───────────────────────────────────────────────────────────
  {
    keywords: ["leg day", "work legs", "want legs", "focus on legs", "lower body", "lower body day"],
    response:
      "Shifting the focus to legs — I'll build out a full lower-body session hitting quads, hamstrings, and glutes.",
    preface:
      "Here's your leg day version. Full lower body focus. Let me know if you'd like anything adjusted!",
  },
  {
    keywords: ["arm day", "work arms", "want arms", "focus on arms", "biceps", "triceps"],
    response:
      "Pivoting to arms — I'll add bicep, tricep, and forearm work throughout the session.",
    preface:
      "Here's your arm-focused version. Bis, tris, and forearms throughout. Let me know if you'd like any changes!",
  },
  {
    keywords: ["chest day", "work chest", "want chest", "focus on chest", "pecs"],
    response:
      "I'll anchor this around chest — pressing, flyes, and cable crossovers to hit it from every angle.",
    preface:
      "Here's your chest-focused version. Pressing and isolation work throughout. Let me know if you'd like any tweaks!",
  },
  {
    keywords: ["back day", "work back", "want back", "focus on back", "posterior chain"],
    response:
      "Building around the back — rows, pulldowns, and face pulls to hit the full posterior chain.",
    preface:
      "Here's your back-focused version. Full posterior chain covered. Let me know if you'd like any changes!",
  },
  {
    keywords: ["shoulder day", "work shoulders", "want shoulders", "focus on shoulders", "delts", "deltoids"],
    response:
      "Shoulder focus — I'll add lateral raises, face pulls, and overhead pressing to build that cap.",
    preface:
      "Here's your shoulder-focused version. Lateral, front, and rear delts all covered. Let me know if you'd like any adjustments!",
  },
  {
    keywords: ["glutes", "glute day", "work glutes", "want glutes", "booty", "butt"],
    response:
      "Glute day it is — hip thrusts, RDLs, and abduction work to really isolate the posterior chain.",
    preface:
      "Here's your glute-focused version. Hip thrusts and isolation work throughout. Let me know if you'd like any changes!",
  },
  {
    keywords: ["core", "ab work", "abs", "want abs", "work core", "focus on core", "six pack"],
    response:
      "I'll weave core work throughout the session and add a dedicated ab finisher at the end.",
    preface:
      "Here's your core-focused version. Ab work throughout with a finisher at the end. Let me know if you'd like any tweaks!",
  },
  {
    keywords: ["full body", "total body", "full body workout", "everything"],
    response:
      "Going full body — I'll hit every major muscle group with compound movements and keep it balanced.",
    preface:
      "Here's your full-body version. All major muscle groups covered. Let me know if you'd like any changes!",
  },

  // ── Goals ─────────────────────────────────────────────────────────────────
  {
    keywords: ["lose weight", "weight loss", "burn fat", "fat loss", "cut", "cutting", "lose fat"],
    response:
      "I'll shift this to a fat-loss structure — higher reps, shorter rest, and a metabolic finisher at the end.",
    preface:
      "Here's your fat-loss version. High rep, short rest, metabolic finisher included. Let me know if you'd like any adjustments!",
  },
  {
    keywords: ["build muscle", "gain muscle", "bulk", "bulking", "build mass", "get bigger", "hypertrophy"],
    response:
      "Switching to a hypertrophy focus — heavier loads, more volume, and 60–90 second rest periods for maximum muscle stimulus.",
    preface:
      "Here's your muscle-building version. Volume and rest periods optimized for hypertrophy. Let me know if you'd like any changes!",
  },
  {
    keywords: ["get stronger", "strength training", "powerlifting", "strength", "stronger", "max strength"],
    response:
      "I'll restructure this around compound lifts with heavier weights and longer rest periods for full recovery between sets.",
    preface:
      "Here's your strength-focused version. Heavy compounds with full rest. Let me know if you'd like any tweaks!",
  },
  {
    keywords: ["tone up", "toning", "lean out", "get toned", "look toned"],
    response:
      "I'll dial in moderate weight with higher reps and keep the rest periods tight to give you that toned look.",
    preface:
      "Here's your toning version. Moderate weight, high reps, short rest. Let me know if you'd like any changes!",
  },

  // ── Recovery ──────────────────────────────────────────────────────────────
  {
    keywords: ["rest day", "active recovery", "taking it easy", "light day", "easy day"],
    response:
      "Switching to an active recovery session — light movement, stretching, and foam rolling only. Let your body rebuild.",
    preface:
      "Here's your active recovery session. Light and easy throughout. Let me know if you'd like anything adjusted!",
  },
  {
    keywords: ["sore", "muscle soreness", "really sore", "super sore", "doms", "aching"],
    response:
      "I'll shift this to a recovery session — light movement to flush the soreness without adding more stress to your muscles.",
    preface:
      "Here's your soreness-friendly version. Light work to help you recover faster. Let me know if you'd like any changes!",
  },
  {
    keywords: ["already worked out", "already trained", "already exercised", "worked out today", "trained today"],
    response:
      "I'll scale this way down — a short mobility session to keep you active without overtraining.",
    preface:
      "Here's a short mobility session to complement what you already did today. Let me know if you'd like any adjustments!",
  },
  {
    keywords: ["coming back from injury", "returning from injury", "getting back into it", "haven't worked out in a while", "been a while", "long break", "out of shape"],
    response:
      "Welcome back — I'll start conservative with lower loads and build from there. Safety first, progress second.",
    preface:
      "Here's your comeback version. Conservative loads, controlled movements. Let me know if you'd like anything changed!",
  },

  // ── Preferences ───────────────────────────────────────────────────────────
  {
    keywords: ["hate burpees", "no burpees", "don't like burpees", "remove burpees"],
    response:
      "Burpees are gone. I've replaced them with battle rope intervals and jumping jacks for the same cardio hit.",
    preface:
      "Here's your burpee-free version. Same conditioning, different exercises. Let me know if you'd like any other changes!",
  },
  {
    keywords: ["hate squats", "no squats", "don't like squats", "remove squats"],
    response:
      "Squats are out. I'll replace them with leg press and Bulgarian split squats to hit the same muscles differently.",
    preface:
      "Here's your squat-free version. Same muscles, different movements. Let me know if you'd like anything else adjusted!",
  },
  {
    keywords: ["want more stretching", "add stretching", "more flexibility", "flexibility work", "stretch more"],
    response:
      "I'll add a proper mobility block at the start and a full cool-down stretching sequence at the end.",
    preface:
      "Here's your flexibility-focused version. Mobility at the start, stretching at the end. Let me know if you'd like any changes!",
  },
  {
    keywords: ["pregnant", "prenatal", "postpartum", "just had a baby", "after pregnancy"],
    response:
      "I'll adapt this to a prenatal/postnatal safe format — no lying flat on your back, no high-impact, and reduced core load.",
    preface:
      "Here's your pregnancy-safe version. All movements modified for safety. Let me know if you'd like anything adjusted!",
  },
  {
    keywords: ["beginner", "just starting out", "new to working out", "never worked out", "never lifted", "first time"],
    response:
      "Let's start from the ground up — I'll simplify the movements, reduce the volume, and make sure everything has a clear form cue.",
    preface:
      "Here's your beginner-friendly version. Simple movements, manageable volume. Let me know if you'd like anything changed!",
  },
  {
    keywords: ["want to sweat", "make me sweat", "sweat a lot", "intense workout", "killer workout", "destroy me"],
    response:
      "Challenge accepted — I'm loading this with supersets, AMRAPs, and a brutal finisher. You'll definitely sweat.",
    preface:
      "Here's your sweat-fest version. Supersets, AMRAPs, and a finisher. Let me know if you want it even harder!",
  },
];

/** Return the first scenario whose keywords appear in the user's message, or null. */
export function matchScenario(text: string): Scenario | null {
  const lower = text.toLowerCase();
  return SCENARIOS.find((s) => s.keywords.some((kw) => lower.includes(kw))) ?? null;
}
