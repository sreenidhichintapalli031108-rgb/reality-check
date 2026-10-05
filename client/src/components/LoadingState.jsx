import { ShieldCheck } from 'lucide-react'

export function LoadingState({ steps, currentStep }) {
  const progress = steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      {/* Animated icon */}
      <div className="relative mb-8">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-2xl bg-indigo-400 opacity-20 animate-ping" />
        <div className="relative w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-200">
          <ShieldCheck size={36} className="text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">
        Analyzing your submission
      </h2>
      <p className="text-sm text-slate-500 mb-8">
        This usually takes 10–20 seconds
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span>Processing</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step list */}
      <div className="w-full max-w-sm space-y-2">
        {steps.map((step, i) => {
          const isDone = i < currentStep
          const isActive = i === currentStep

          return (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-300 ${
                isActive ? 'bg-indigo-50 border border-indigo-100' : 'border border-transparent'
              }`}
            >
              {/* Status indicator */}
              <div className="flex-shrink-0 w-5 h-5">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                )}
              </div>

              <span
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-700'
                    : isDone
                    ? 'text-slate-400 line-through decoration-slate-300'
                    : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-xs text-slate-400 text-center max-w-xs">
        Reality Check does not claim to independently verify external sources.
        Analysis is based on the content you submitted.
      </p>
    </div>
  )
}
