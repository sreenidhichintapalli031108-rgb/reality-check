# Reality Check

> **Turn an offer or online claim into an evidence-backed decision report.**

Reality Check is an evidence-based decision verification system. It analyzes screenshots, text, and URLs to separate verified information from unverified claims — giving you a clear, structured report instead of a simple "scam/safe" verdict.

---

## Quick Start

### Prerequisites

- Node.js v18+ (v24 recommended)
- A Gemini API key → [Get one free at Google AI Studio](https://aistudio.google.com/)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd reality-check
npm run install:all
```

### 2. Configure the API key

```bash
# Copy the example file
cp .env.example server/.env

# Edit server/.env and set your key:
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run in development

**Option A — Start everything together (from root):**
```bash
npm run dev
```

**Option B — Start separately:**

Terminal 1 (backend):
```bash
cd server
npm run dev
```

Terminal 2 (frontend):
```bash
cd client
npm run dev
```

### 4. Open the app

Demo : https://reality-check-red.vercel.app/

---

## Project Structure

```
reality-check/
├── client/                    # React + Vite + Tailwind frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── pages/             # LandingPage, CheckPage, ResultsPage
│       ├── hooks/             # useAnalysis (state management)
│       ├── services/          # api.js (Axios calls to backend)
│       ├── utils/             # displayHelpers.js
│       ├── data/              # demoExamples.js (test cases)
│       └── types/             # JSDoc type definitions
│
├── server/                    # Node.js + Express backend
│   └── src/
│       ├── routes/            # health.js, analyze.js
│       ├── controllers/       # analyzeController.js
│       ├── services/          # geminiService.js, aiServiceFactory.js, verificationService.js
│       ├── prompts/           # analysisPrompt.js
│       ├── middleware/        # errorHandler.js
│       └── utils/             # reportSchema.js (Zod validation)
│
├── .env.example               # Environment variable template
├── .gitignore
└── package.json               # Root scripts
```

---

## Core User Flow

```
Upload screenshot / Paste text
         ↓
  Extract information
         ↓
   Identify claims
         ↓
       Analyze
         ↓
   Generate report
         ↓
  Show: Verified · Unverified · Risk Signals
        Missing Info · Next Actions · Evidence
```

---

## API

### `GET /api/health`
Returns server status and whether the API key is configured.

### `POST /api/analyze`
**Content-Type:** `multipart/form-data`

| Field     | Type   | Description                              |
|-----------|--------|------------------------------------------|
| `text`    | string | Text content to analyze (min 10 chars)   |
| `image`   | file   | Screenshot/image (JPG, PNG, WebP, max 10MB) |
| `url`     | string | URL for analysis                         |
| `category`| string | `internship` · `job` · `scholarship` · `course` · `purchase` · `other` |

**Response:** JSON matching the `AnalysisReport` schema.

---

## Report Schema

```json
{
  "overallAssessment": {
    "label": "LOW_CONCERN | NEEDS_VERIFICATION | HIGH_CAUTION",
    "summary": "..."
  },
  "claims": [{ "claim": "...", "category": "...", "status": "SUPPORTED|UNVERIFIED|CONTRADICTED", "reason": "..." }],
  "riskSignals": [{ "signal": "...", "severity": "LOW|MEDIUM|HIGH", "reason": "..." }],
  "missingInformation": ["..."],
  "recommendedActions": [{ "action": "...", "priority": "HIGH|MEDIUM|LOW" }],
  "evidence": [{ "source": "...", "url": "...", "supports": "...", "type": "OFFICIAL|USER_PROVIDED|OTHER" }]
}
```

---

## Demo Examples

Three built-in demo cases are available on the Check page:

1. **Internship with upfront fee** — High caution scenario
2. **Standard internship offer** — Low concern, normal verification
3. **Online course with vague claims** — Needs verification

These are fictional test cases, clearly labeled as demo data.

---

## Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Routing  | React Router v7               |
| Backend  | Node.js, Express v4           |
| AI       | Google Gemini 2.0 Flash       |
| Validation | Zod                         |
| Icons    | Lucide React                  |

---

## Important Notes

- **No database required** for this MVP.
- API key is **never exposed to the frontend** — all AI calls go through the backend.
- The AI is instructed **not to invent evidence** or make unsupported accusations.
- All analysis is AI-generated and should be treated as a starting point for verification, not a final verdict.

---

*Built for Reality Check Hackathon · Evidence-based decisions*
