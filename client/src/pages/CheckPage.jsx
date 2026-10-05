import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Image, FileText, Link, Sparkles, AlertCircle, FlaskConical } from 'lucide-react'
import { Logo } from '../components/Logo'
import { ImageUpload } from '../components/ImageUpload'
import { LoadingState } from '../components/LoadingState'
import { useAnalysis } from '../hooks/useAnalysis'
import { demoExamples } from '../data/demoExamples'
import { demoReports } from '../data/demoReports'

const TABS = [
  { id: 'image', label: 'Screenshot', icon: Image, description: 'Upload or drag a screenshot' },
  { id: 'text', label: 'Paste Text', icon: FileText, description: 'Paste message or offer text' },
  { id: 'url', label: 'URL', icon: Link, description: 'Enter a link to analyze' },
]

const CATEGORIES = [
  { id: 'internship', label: 'Internship', emoji: '💼' },
  { id: 'job', label: 'Job Offer', emoji: '📄' },
  { id: 'scholarship', label: 'Scholarship', emoji: '🎓' },
  { id: 'course', label: 'Course', emoji: '📚' },
  { id: 'purchase', label: 'Purchase', emoji: '🛒' },
  { id: 'other', label: 'Other', emoji: '🔍' },
]

export function CheckPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [activeTab, setActiveTab] = useState('image')
  const [imageFile, setImageFile] = useState(null)
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('internship')

  const { status, report, error, loadingStep, loadingSteps, analyze, reset } = useAnalysis()

  // Handle query params: ?mode=text or ?demo=demo-1
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'text') setActiveTab('text')

    const demoId = searchParams.get('demo')
    if (demoId) {
      const demo = demoExamples.find((d) => d.id === demoId)
      if (demo) {
        setActiveTab('text')
        setText(demo.text)
        setCategory(demo.category || 'internship')
      }
    }
  }, [searchParams])

  // Navigate to results once report is ready
  useEffect(() => {
    if (status === 'success' && report) {
      navigate('/results', { state: { report } })
    }
  }, [status, report, navigate])

  const canSubmit =
    (activeTab === 'image' && imageFile) ||
    (activeTab === 'text' && text.trim().length >= 10) ||
    (activeTab === 'url' && url.trim().length > 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    analyze({
      imageFile: activeTab === 'image' ? imageFile : null,
      text: activeTab === 'text' ? text : '',
      url: activeTab === 'url' ? url : '',
      category,
    })
  }

  const loadDemo = (demo) => {
    reset()
    setActiveTab('text')
    setText(demo.text)
    setCategory(demo.category || 'internship')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50">
        <PageHeader />
        <div className="max-w-lg mx-auto px-5">
          <LoadingState steps={loadingSteps} currentStep={loadingStep} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader />

      <main className="max-w-2xl mx-auto px-5 sm:px-6 py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
            Check an offer or claim
          </h1>
          <p className="text-slate-500 text-sm">
            Upload a screenshot, paste text, or enter a URL — then get an evidence-based verification report.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input type tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 flex gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all
                    ${active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Input area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-5">
              {activeTab === 'image' && (
                <ImageUpload value={imageFile} onChange={setImageFile} />
              )}

              {activeTab === 'text' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Paste the content you want to verify
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste the full text of the offer, message, or claim here..."
                    rows={10}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 focus:bg-white transition-colors resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    {text.length} characters
                    {text.length > 0 && text.trim().length < 10 && (
                      <span className="text-amber-500 ml-1">· minimum 10 required</span>
                    )}
                  </p>
                </div>
              )}

              {activeTab === 'url' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Paste a URL to analyze
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/job-offer"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 focus:bg-white transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    URL analysis uses publicly visible page text. Some sites may block automated access.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Category selector */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              What type of content is this?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all text-left ${
                    category === cat.id
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error message */}
          {status === 'error' && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 mb-0.5">Analysis failed</p>
                <p className="text-sm text-red-700">{error}</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs text-red-600 hover:text-red-800 underline font-medium"
                  >
                    Dismiss and try again
                  </button>
                  <span className="text-red-200 text-xs">|</span>
                  <button
                    type="button"
                    onClick={() => navigate('/results', {
                      state: { report: demoReports[0].report, isDemo: true },
                    })}
                    className="inline-flex items-center gap-1 text-xs text-violet-600 hover:text-violet-800 font-semibold"
                  >
                    <FlaskConical size={12} />
                    View Demo Instead
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 disabled:shadow-none hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles size={18} />
            Analyze with Reality Check
          </button>
        </form>

        {/* Demo examples */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              Demo Examples
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="grid gap-2.5">
            {demoExamples.map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => loadDemo(demo)}
                className="text-left bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm p-4 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {demo.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{demo.description}</p>
                  </div>
                  <span className="text-xs text-indigo-500 font-semibold flex-shrink-0 mt-0.5 group-hover:text-indigo-700 transition-colors">
                    Load →
                  </span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Demo examples are fictional test cases and not real-world data.
          </p>
        </div>
      </main>
    </div>
  )
}

function PageHeader() {
  const navigate = useNavigate()
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur px-5 sm:px-6 py-4 sticky top-0 z-20 shadow-sm">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100"
          aria-label="Back to home"
        >
          <ArrowLeft size={18} />
        </button>
        <Logo size="sm" />
      </div>
    </header>
  )
}
