# ZED Daily Brief - Agentic Deal Intelligence

**Goal:** Help sales reps decide "What deals should I focus on today?" in under 30 seconds.

---

## 🌐 Live Demo & Links

| Resource | Link |
|----------|------|
| **Live Application** | [https://zeddailybrief.netlify.app](https://zeddailybrief.netlify.app) |
| **Video Walkthrough** | [Google Drive](https://drive.google.com/file/d/19xwEZ3bye15ElxWULCwJo6McpVjzFrcU/view?usp=drive_link) |
| **Source Code** | [GitHub](https://github.com/imsidharthj/zed_daily_brief) |

---

## 🚀 How This Helps Sales Reps

1. **Zero Searching:** Deals are pre-sorted so the most important items appear first, reducing time spent scanning inboxes or CRMs.

2. **Instant Clarity:** Clear visual signals (Urgent vs Important, confidence levels, time decay) allow for fast vertical scanning.

3. **One Decisive Action:** Each deal surfaces exactly one recommended next action (Reply, Follow up, Schedule call).

4. **Explainable Signals:** Confidence and urgency are shown explicitly, helping reps trust the system and know when to double-check.

---

## 🧠 Decision Logic (The "Why")

The system uses a deterministic, rule-based scoring model (implemented in `src/logic.ts`) to rank and group deals into three fixed sections:

### New Inbound Leads (Urgent)
- Always treated as high priority due to lead decay.
- Recent inbound activity and high urgency signals increase rank.

### Deals Waiting on Me (Important)
- Follow-ups where momentum is blocked by delayed responses.
- Time since last action increases priority.

### At-Risk / Negative Signals (Important)
- Negative sentiment or escalation signals indicating risk of churn or deal loss.
- Even with lower confidence, these are surfaced clearly with verification cues.

### Conflict Handling
- If urgency is high but confidence is weak, the deal is still shown but labeled with a **"Verify"** confidence tag.
- Urgency is modeled at the deal level, not the section level, ensuring consistent prioritization across categories.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 (utility-first for rapid iteration) |
| **Icons** | Lucide React |
| **Data** | Mocked JSON (no backend or persistence) |
| **Deployment** | Netlify |

---

## ❌ What Is NOT Built (Intentional MVP Scope)

| Feature | Reason |
|---------|--------|
| **Backend / Auth** | MVP focuses on decision surface, not infrastructure |
| **Edit Functionality** | Read-only brief; actions happen in external tools (Gmail, CRM) |
| **Detail View / Modals** | Single-screen constraint for speed; no navigation required |
| **Real AI/LLM Calls** | Classification assumed pre-computed; logic is rule-based |
| **Persistent State** | No local storage or database; fresh mock data on reload |

---

## 🔮 Future Improvement (One More Day)

**Interactive "Done" State:** Allow reps to swipe or tap "Done" to archive a deal from the list locally, giving immediate satisfaction for clearing the queue and reducing cognitive load.

---

## 📁 Project Structure

```
src/
├── App.tsx           # Main app shell and layout
├── logic.ts          # Decision logic, scoring, and enrichment
├── mockData.ts       # Mocked deal data
├── types.ts          # TypeScript interfaces
├── index.css         # Tailwind CSS imports
└── components/
    ├── DealCard.tsx  # Individual deal card UI
    └── MetricBadge.tsx # Reusable badge component
```

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.
