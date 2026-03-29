# SydeQuest - purely web compatible at the momment ✦

> go do things. explore. let your brain expand.

A quest board for SYDE friends to stop grinding and start living. Handwritten scrapbook aesthetic, shareable lists, and a work meter that tells you when it's time to GO OUT.

## Setup

```bash
git clone https://github.com/jadiha/sydequest.git
cd sydequest
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 15** (app router)
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Google Fonts** — Permanent Marker, Kalam, Caveat, Patrick Hand

## What's built

| Page | What it does |
|---|---|
| `/` | Your quest board — the paper list, work meter, friends card |
| `/explore` | KW-specific quest suggestions to steal |
| `/friends` | Invite your crew (invite link flow, stub for now) |

## Features

- **Quest list** — handwritten scrapbook aesthetic, each item has its own font size/weight/color
- **Check off quests** — satisfying cross-off animation + toast message
- **Add quests** — emoji picker, category, difficulty
- **Work meter** — tracks how much you've worked today and shows when your quest window opens
- **Who's down** — see which friends are interested in each quest

## Stretch goals (roadmap)

- [ ] Supabase auth — real accounts, shared quest state
- [ ] Friends real-time — see friends' lists live
- [ ] Calendar sync — connect your schedule to auto-calculate quest windows
- [ ] LEARN/Quest portal sync — pull in assignment deadlines
- [ ] Push notifications — "quest window open! priya is down for grannies 👵"
- [ ] Term timeline — track quests across 1A → 4B
