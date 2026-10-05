import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, ShieldCheck, Search, Zap, ClipboardCheck,
  FileText, Image, Link, AlertTriangle, CheckCircle, Info,
  FlaskConical,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { demoReports } from '../data/demoReports'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ── Navigation ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-500 font-medium">
            <a href="#how-it-works" className="hover:text-slate-800 transition-colors">How it works</a>
            <a href="#what-we-verify" className="hover:text-slate-800 transition-colors">What we verify</a>
          </nav>
          <button
            onClick={() => navigate('/check')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Start checking
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-20 pb-16 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border border-indigo-100">
            <ShieldCheck size={13} strokeWidth={2.5} />
            Evidence-based decision verification
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Know what's real
            <br />
            <span className="text-indigo-600">before you act.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Analyze messages, screenshots, documents, and URLs to understand
            what is supported, what is unverified, what's missing, and what
            you should verify before acting.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button
              onClick={() => navigate('/check')}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Image size={18} />
              Upload Screenshot
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/check?mode=text')}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText size={18} />
              Paste Text
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            No account required · Screenshot, document, or text · Free to try
          </p>
        </div>
      </section>

      {/* ── Quick example chips ─────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-4">
          Try a demo example
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {DEMO_CHIPS.map((chip) => (
            <button
              key={chip.demoId}
              onClick={() => navigate(`/check?demo=${chip.demoId}`)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-700 text-sm font-medium px-4 py-2 rounded-full transition-all shadow-sm"
            >
              <span>{chip.emoji}</span>
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Try Demo (pre-generated reports, no API) ────────────── */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical size={16} className="text-violet-600" />
            <h2 className="text-sm font-bold text-violet-800 uppercase tracking-wider">
              Try a Demo
            </h2>
          </div>
          <p className="text-sm text-violet-600 mb-5">
            Explore Reality Check using realistic examples — no AI request required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {demoReports.map((demo) => (
              <button
                key={demo.id}
                onClick={() =>
                  navigate('/results', {
                    state: { report: demo.report, isDemo: true },
                  })
                }
                className="text-left bg-white hover:bg-violet-50 border border-violet-100 hover:border-violet-300 rounded-xl p-4 transition-all shadow-sm group"
              >
                <div className="text-2xl mb-2">{demo.emoji}</div>
                <p className="text-sm font-bold text-slate-800 group-hover:text-violet-800 transition-colors mb-1">
                  {demo.label}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">{demo.description}</p>
                <p className="text-xs text-violet-500 font-semibold mt-2 group-hover:text-violet-700 transition-colors">
                  View report →
                </p>
              </button>
            ))}
          </div>
          <p className="text-xs text-violet-400 mt-4 text-center">
            These are pre-generated example reports. No live AI request is made.
          </p>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="border-t border-slate-100" />
      </div>

      {/* ── How it works ────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Four steps from submission to clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <HowItWorksCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What your report includes ───────────────────────────── */}
      <section id="what-we-verify" className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
              What you get
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Not a verdict — a full evidence breakdown
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Reality Check doesn't tell you what to believe. It shows what is
              supported, what is unverified, what's missing, and what to check
              before acting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPORT_SECTIONS.map((s) => (
              <ReportFeatureCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Example callout ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header bar */}
            <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Example — how Reality Check handles a suspicious message
              </span>
            </div>

            <div className="px-6 py-8">
              {/* Fake message */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-sm text-slate-700 font-mono leading-relaxed">
                <p className="font-bold text-slate-900 mb-2">Congratulations!</p>
                <p>You have been selected for our AI/ML Internship.</p>
                <p>Stipend: ₹7,500 · Duration: 6 months</p>
                <p className="text-red-700 font-semibold mt-1">Pay ₹1,500 registration fee to confirm your seat.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <OutcomeChip color="green" icon="✅" label="1 supported claim" />
                <OutcomeChip color="yellow" icon="❓" label="3 unverified claims" />
                <OutcomeChip color="red" icon="⚠️" label="2 risk signals" />
              </div>

              <p className="text-sm text-slate-500 mb-6">
                Reality Check doesn't automatically call this a scam. It
                identifies specific risk signals, flags what information is
                missing, and tells you exactly what to verify before making
                any decision.
              </p>

              <button
                onClick={() => navigate('/check?demo=demo-1')}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Try this example
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Ready to check something?
          </h2>
          <p className="text-indigo-200 mb-8 text-lg">
            Upload a screenshot or paste a message to get your evidence-backed report in seconds.
          </p>
          <button
            onClick={() => navigate('/check')}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-indigo-700 font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
          >
            <ShieldCheck size={20} />
            Start a Reality Check
          </button>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-8 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-slate-400 text-center">
            Evidence-based decision verification · Not a substitute for professional advice
          </p>
          <p className="text-xs text-slate-400">
            Reality Check
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ── Sub-components ───────────────────────────────────────────────── */

function HowItWorksCard({ number, icon: Icon, title, description, color }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  }
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${colors[color]}`}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="text-xs font-bold text-slate-400 mb-2 tracking-wider">
        {String(number).padStart(2, '0')}
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  )
}

function ReportFeatureCard({ emoji, title, description, accent }) {
  return (
    <div className={`rounded-2xl border p-5 hover:shadow-sm transition-all ${accent}`}>
      <div className="text-2xl mb-3">{emoji}</div>
      <h3 className="font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  )
}

function OutcomeChip({ color, icon, label }) {
  const styles = {
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <div className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm font-medium ${styles[color]}`}>
      <span>{icon}</span>
      {label}
    </div>
  )
}

/* ── Static data ──────────────────────────────────────────────────── */

const DEMO_CHIPS = [
  { demoId: 'demo-1', emoji: '💼', label: 'Internship with fee' },
  { demoId: 'demo-2', emoji: '🏢', label: 'Standard job offer' },
  { demoId: 'demo-3', emoji: '📚', label: 'Course advertisement' },
]

const HOW_IT_WORKS = [
  {
    number: 1,
    icon: Image,
    color: 'indigo',
    title: 'Submit',
    description: 'Upload a screenshot, paste text, or enter a URL. No account required.',
  },
  {
    number: 2,
    icon: Search,
    color: 'violet',
    title: 'Extract',
    description: 'Key claims, contact details, conditions, and deadlines are identified.',
  },
  {
    number: 3,
    icon: Zap,
    color: 'amber',
    title: 'Check',
    description: 'Claims are evaluated for evidence, consistency, and risk signals.',
  },
  {
    number: 4,
    icon: ClipboardCheck,
    color: 'emerald',
    title: 'Decide',
    description: 'Get a prioritized verification checklist before taking any action.',
  },
]

const REPORT_SECTIONS = [
  {
    emoji: '✅',
    title: 'Supported Claims',
    description: 'Claims that are consistent with available information.',
    accent: 'bg-green-50 border-green-200',
  },
  {
    emoji: '❓',
    title: 'Unverified Claims',
    description: 'Claims that cannot be confirmed without independent sources.',
    accent: 'bg-amber-50 border-amber-200',
  },
  {
    emoji: '⚠️',
    title: 'Risk Signals',
    description: 'Patterns that indicate a higher chance of problems.',
    accent: 'bg-red-50 border-red-200',
  },
  {
    emoji: '🔍',
    title: 'Missing Information',
    description: 'Important details that were absent from the content.',
    accent: 'bg-slate-50 border-slate-200',
  },
  {
    emoji: '📋',
    title: 'Next Actions',
    description: 'Specific, prioritized verification steps you should take.',
    accent: 'bg-indigo-50 border-indigo-200',
  },
  {
    emoji: '🔗',
    title: 'Evidence & Sources',
    description: 'References that informed the analysis, clearly labeled.',
    accent: 'bg-violet-50 border-violet-200',
  },
]
