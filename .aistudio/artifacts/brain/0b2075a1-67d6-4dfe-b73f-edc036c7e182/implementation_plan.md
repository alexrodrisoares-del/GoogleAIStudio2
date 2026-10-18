# CyberQuest: Android Gamified Life Tasks RPG

A touch-first Android-styled cyberpunk productivity RPG where completing real-life daily chores earns experience points, levels up character ranks, deals direct raid damage to cybernetic boss monsters, unboxes mystery loot chests, builds skill trees, and unlocks neon gear upgrades in the black-market armory.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during clarification and form the foundation of our implementation:

- **Confirmed Visual Aesthetic**: Modern Cyberpunk RPG with obsidian slate surfaces, crisp neon cyan/amber/violet accents, holographic badges, tech ranks, and tactical grid styling.
- **Confirmed Gamification Suite**: 
  1. *Core Progression*: XP, Tech Level, Character Title Ranks (from Script Kiddie to Cyber Overlord), and Level-Up celebrations.
  2. *Boss Raid Battles*: Daily and weekly cyber bosses (e.g., "Procrastination Daemon", "Entropy Titan") whose shields and HP are chipped down as chores are checked off.
  3. *Skill Trees*: Chores categorized into three tactical attributes: **Strength** (physical chores, fitness, deep cleaning), **Vitality** (nutrition, sleep, hydration, self-care), and **Mind** (work, study, finances, organization), unlocking passive perks and bonuses.
  4. *Economy & Gear Shop*: Earn Credits/Gold to equip cyber-implants, visors, exo-frames, and companion cyber-drones that provide cosmetic flair and stat boosts.
  5. *Streaks, Combos & Mystery Loot*: Daily completion streaks, combo XP multipliers, and instant reward loot crates with randomized drop rarities (Common, Rare, Epic, Legendary).
- **Confirmed Layout Structure**: High-fidelity Android mobile device frame with responsive desktop expansion, bottom thumb navigation bar (Quests, Boss Raid, Skill Tree, Armory, Cyber Profile), floating quick-add chore FAB, and built-in Web Audio API sound synthesizer with mute toggles.

---

### 1. Overview & Core Concept

- **What It Does**: Transforms mundane daily chores and habits into high-stakes cyberpunk RPG missions. Checking off a task doesn't just clean the room—it delivers 85 plasma damage to the "Procrastination Daemon", triggers a Web Audio cyber chime, awards 45 XP and 20 Neon Credits, contributes to the user's Strength skill tree, and charges the daily combo meter for a mystery tech crate.
- **Target Audience / Persona**: Everyday individuals, gamers, ADHD self-starters, and productivity enthusiasts seeking dopamine-driven motivation and tangible feedback for completing domestic, health, and career tasks.
- **Key Value**: Turns chore resistance into game momentum by coupling instant tactile feedback (Web Audio synthesizer, celebratory particle bursts, damage popups) with medium-term goals (boss raids, skill unlocks) and long-term prestige (tech ranks, custom cyber loadouts).

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Daily Mission Briefing (Quests View)**:
   - User reviews chores grouped by category (Strength, Vitality, Mind) with difficulty tiers (Easy: +25 XP, Medium: +50 XP, Hard: +100 XP, Epic: +200 XP).
   - Tapping the completion ring plays an energizing synth chime, triggers a neon float-up score popup (`+50 XP`, `+25 Gold`, `-50 Boss HP`), updates the streak counter, and triggers a level-up or loot-drop event if thresholds are met.
   - Quick-add modal allows creating custom chores with recurrence (daily, weekdays, weekly), attribute affiliation, and XP weights.
2. **Boss Battle Raid (Raids View)**:
   - Dynamic boss arena displaying the current active boss monster with cybernetic avatar art, active HP shield gauge, boss attack timer, and raid log.
   - Special "Power Strike": Completing high-difficulty chores or multi-chore streaks executes critical hits on the boss.
   - Defeating the boss triggers an epic raid victory sequence, awarding rare loot crates and boss bounty trophies.
3. **Cyber Matrix Skill Trees (Skills View)**:
   - Three interactive branching skill tracks (Strength, Vitality, Mind) with level nodes.
   - Allocating earned skill points unlocks passive benefits such as "Caffeine Overclock" (+10% Mind XP) or "Iron Discipline" (streak protection shield).
4. **Armory & Black Market (Shop View)**:
   - Neon catalog of cyber gear: Neural Visor, Exo-Skeleton Spine, Plasma Vacuum, Cybernetic Pet Drone.
   - Purchasing items deducts Gold credits and updates the equipped loadout shown on the player's avatar card.
5. **Mystery Loot Unboxing Modal**:
   - Tapping an earned loot crate initiates a suspenseful high-tech unboxing sequence that reveals Credits, rare titles, or equipment with rarity glow.

#### Visual Identity & Theme
- **Aesthetic Direction**: Sleek, high-contrast cyberpunk terminal. Deep dark obsidian canvas with surgical neon accents (Cyan `#06B6D4`, Electric Emerald `#10B981`, Amber Gold `#F59E0B`, Neon Magenta `#EC4899`).
- **Color Discipline (60-30-10)**:
  - *60% Neutral Canvas*: Rich obsidian slate (`#0B0F19`, `#0F172A`).
  - *30% Structural Panels*: Dark translucent cards (`rgba(17, 24, 39, 0.75)` with 1px slate-800 borders and subtle backdrop-blur).
  - *10% Focal Accents*: Neon cyan for active navigation and level bars; amber for gold credits; emerald for vitality; magenta for boss HP damage.
- **Typography & Hierarchy**:
  - Display / Ranks: `Plus Jakarta Sans` / `Outfit` with crisp semi-bold weight.
  - Data / Numbers: Strict tabular numerals (`font-mono tabular-nums`) for XP, credits, HP, countdown timers, and multipliers.
  - Text Discipline: Unboxed metadata tags separated by typographic dots (`·`), no generic AI pill badges, no pseudo-code comments.
- **Android Ergonomics & Thumb Zone**:
  - Minimum touch hitboxes $\ge 44 \times 44\text{px}$ across all interactive items.
  - Fixed bottom navigation bar with 5 thumb-friendly tabs: Quests, Boss Raid, Skill Tree, Armory, Profile.
  - Floating Action Button (FAB) positioned in the natural thumb reach zone to add new chores instantly.
  - Audio toggle in the top bar to enable/mute sound effects with a single tap.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Synthesized Web Audio API vs. External Audio Files**:
  - *Chosen Approach*: Pure client-side Web Audio API synthesizer generating clean retro-cyberpunk arpeggios, completion pings, level-up fanfares, and boss hit impacts.
  - *Why*: 100% reliable zero-latency audio that never fails due to network buffering, broken CDN URLs, or CORS restrictions. Works completely offline.
- **Decision 2: LocalStorage Persistent Engine with Demo Preset**:
  - *Chosen Approach*: Robust client state store with full `localStorage` persistence, initial seeded preset with realistic chores and starter boss, and export/import JSON capability.
  - *Why*: Immediate instant reactivity without auth delays or network hops, guaranteeing full data persistence across browser reloads while functioning as a self-contained progressive web app.
- **Decision 3: Android Mobile Shell with Desktop Responsive Mode**:
  - *Chosen Approach*: Centered Android device container with mobile viewport frame (status bar, camera punch-hole, bottom navigation bar) on large desktop screens, which seamlessly adapts to 100% full-screen on real mobile viewports.
  - *Why*: Gives users the genuine feeling of holding an Android RPG companion app on desktop while remaining completely functional on touch devices.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CyberQuest App Engine                           │
│  (React 19 + TypeScript + Tailwind CSS v4 + Web Audio Synthesizer)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────┐                         ┌──────────────────────┐
│  State & Persistence  │                         │ Web Audio Sound FX   │
│  - User Profile & XP  │                         │ - Quest Complete FX  │
│  - Chores & Streaks   │                         │ - Boss Hit & Laser   │
│  - Boss Raid HP/Stats │                         │ - Level-Up Fanfare   │
│  - Skill Trees (3x)   │                         │ - Crate Unlock Ping  │
│  - Equipment Armory   │                         │ - Mute / Unmute Vol  │
│  - Loot Crates        │                         └──────────────────────┘
└──────────┬────────────┘
           │
           ├─────────────────┬─────────────────┬─────────────────┐
           ▼                 ▼                 ▼                 ▼
   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
   │ Quests View   │ │ Boss Raid     │ │ Skill Matrix  │ │ Armory & Shop │
   │ - Daily Chores│ │ - Daemon HP   │ │ - Strength    │ │ - Cyber Gear  │
   │ - Category Tab│ │ - Power Strike│ │ - Vitality    │ │ - Stats Boost │
   │ - Streak Multi│ │ - Battle Log  │ │ - Mind Tree   │ │ - Credit Bal  │
   │ - Add Quest   │ │ - Victory Drop│ │ - Perk Unlock │ │ - Inventory   │
   └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘
```

#### Core Data Entities
- **UserProfile**: `id`, `name`, `rankTitle`, `level`, `currentXP`, `nextLevelXP`, `credits`, `streakDays`, `comboMultiplier`, `lastActiveDate`.
- **ChoreTask**: `id`, `title`, `description`, `category` (`strength` | `vitality` | `mind`), `difficulty` (`easy` | `medium` | `hard` | `epic`), `xpReward`, `creditReward`, `bossDamage`, `completed`, `streak`, `frequency` (`daily` | `weekdays` | `weekly`).
- **BossMonster**: `id`, `name`, `title`, `currentHp`, `maxHp`, `shield`, `bountyCredits`, `bountyXP`, `avatarKey`, `status` (`active` | `defeated`).
- **SkillNode**: `id`, `category`, `tier`, `name`, `description`, `unlocked`, `cost`, `perkEffect`.
- **ShopItem**: `id`, `name`, `type` (`implant` | `visor` | `exoskeleton` | `drone`), `cost`, `bonusStat`, `equipped`, `rarity`.
- **LootCrate**: `id`, `rarity` (`common` | `rare` | `epic` | `legendary`), `obtainedAt`.
