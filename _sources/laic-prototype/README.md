# L•AI•C Prototype

Coded clickable prototype of the L•AI•C workout-generation flow for moderated user testing. Source design: *LAIC Exploration* in Figma.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 on a phone (use the LAN IP printed in the terminal — e.g. `http://192.168.x.x:3000` — to test on a real iPhone or Android over the same Wi-Fi).

The viewport is locked to a 375×812 phone frame; on desktop the app is centered with a phone bezel for context.

## Scripted flow

| Step | What to do | Where you land |
|---|---|---|
| 1 | Land on `/` | Home |
| 2 | Tap the **+** button (bottom-right above the nav) | New Activity bottom sheet slides up |
| 3 | Tap **Workout** | Sheet slides into Workout sub-options |
| 4 | Tap **Generate a Workout with L•AI•C** | Sheet dismisses, routes to `/chat` |
| 5 | See the empty L•AI•C chat with suggestion chips | Empty state |
| 6 | Tap any chip (e.g. **Build a workout**) | "Build me a workout" posts; LAIC replies; Context Builder slides up |
| 7–9 | Pick an option for each of the 3 questions, advance with **→** | Q1 → Q2 → Q3 |
| 10 | Tap **→** on Q3 | Answers post as one user bubble; "Reading workout / Searching exercise library / Assembling personalized workout" thinking states cycle |
| 11 | Wait | LAIC responds with text + a Workout widget |
| 12 | Tap the Workout widget | Routes to `/workout/v1` (full workout detail) |
| 13 | Tap **✦ Edit** (bottom-left) | Routes back to `/chat` with the workout pinned as a context chip in the input |
| 14 | Type a custom prompt (e.g. *"I only have 30 minutes today, adjust workout"*) and tap **↑ Send** | Workout-context message + custom prompt post; thinking shows |
| 15 | Wait | LAIC responds with a revised Workout widget (`v2`) |
| 16 | Repeat from step 12 to keep iterating | Conversation history stays intact |

## Tech

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — bottom-sheet, sheet-step transitions, thinking-state animations, message slide-ins
- **Zustand** — chat history, context-builder answers, attached-workout state, thinking pipeline

## File layout

```
app/
  layout.tsx              # phone-frame wrapper, viewport, dark theme
  page.tsx                # Home route → HomeScreen
  chat/page.tsx           # Chat route → ChatScreen
  workout/[id]/page.tsx   # Workout detail route (async params, Next 16)
components/
  PhoneScreen.tsx         # background-image helper
  Home/HomeScreen.tsx     # uses 01-home.png + FAB hotspot
  Sheet/
    BottomSheet.tsx        # generic spring-animated sheet primitive
    NewActivitySheet.tsx   # 2-step internal flow (root → workout)
    ContextBuilderSheet.tsx# 3-question state machine
  Chat/
    ChatScreen.tsx         # scaffold: header, messages, input, bottom nav
    ChatHeader.tsx, ChatInput.tsx, EmptyState.tsx, BottomNav.tsx,
    StatusBar.tsx, Bubbles.tsx, WorkoutContextChip.tsx
  Workout/
    WorkoutDetailScreen.tsx
lib/
  store.ts                 # Zustand: messages, isThinking, contextAnswers, attachedWorkoutId
  canned.ts                # responses, thinking steps, workouts v1/v2
public/figma/              # backup screenshots of every Figma frame for visual QA
```

## Hybrid rendering strategy

- **Home** and **Workout detail** use Figma screenshot backgrounds with overlaid interactive buttons — pixel-perfect, low effort.
- **Chat surface, sheets, and message bubbles** are real React components so messages can be added dynamically and the input is a real `<textarea>`.

## State reset

Reloading any page resets all chat state. This is intentional for repeated test sessions — there is no persistence layer.

## Out of scope

- Real auth, real workout data, real LLM calls
- Bottom-nav routing other than the L•AI•C path (tabs are non-functional but visible)
- Search bar interactivity on Home
- Status bar is a static visual — battery/signal don't update

## Deploying

Push the directory to a Vercel project and deploy with default Next.js settings. No env vars required.

## Re-pulling Figma assets

Backup PNGs live in `public/figma/`. If a frame changes in Figma, re-export to the same filename (PNG, 375 width). All references are by file name in `01-home.png`, `13-workout-view.png`, etc.
