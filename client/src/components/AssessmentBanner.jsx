import { ShieldCheck, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react'
import { getAssessmentStyle } from '../utils/displayHelpers'

const ICONS = {
  LOW_CONCERN: ShieldCheck,
  NEEDS_VERIFICATION: AlertTriangle,
  HIGH_CAUTION: AlertCircle,
  CRITICAL_CAUTION: ShieldAlert,
}

export function AssessmentBanner({ assessment }) {
  const style = getAssessmentStyle(assessment?.label)
  const Icon = ICONS[assessment?.label] || AlertTriangle

  return (
    <div className={`rounded-2xl border-2 overflow-hidden shadow-sm ${style.bgClass}`}>
      {/* Coloured header bar */}
      <div className={`${style.headerBg} px-6 py-3 flex items-center gap-3`}>
        <Icon size={20} className="text-white flex-shrink-0" strokeWidth={2.5} />
        <span className="text-white text-xs font-bold uppercase tracking-widest">
          Reality Check
        </span>
      </div>

      {/* Main content */}
      <div className="px-6 py-5">
        <div className="flex items-start gap-4">
          {/* Large status indicator */}
          <div className="flex-shrink-0 text-4xl leading-none mt-0.5" aria-hidden="true">
            {style.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={`text-2xl font-extrabold tracking-tight ${style.textClass}`}>
              {style.text}
            </h2>
            <p className={`text-sm font-semibold mt-1 ${style.subtextClass}`}>
              {style.description}
            </p>
            {assessment?.summary && (
              <p className="text-sm text-slate-700 mt-3 leading-relaxed border-t border-slate-200 pt-3">
                {assessment.summary}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="px-6 pb-4">
        <p className="text-xs text-slate-500 italic">
          This is not a verdict. It reflects what could and could not be verified from the provided content.
        </p>
      </div>
    </div>
  )
}
