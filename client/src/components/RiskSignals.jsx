import { Card, CardHeader, CardBody } from './Card'
import { Badge } from './Badge'
import { getSeverityStyle } from '../utils/displayHelpers'

export function RiskSignals({ signals }) {
  if (!signals?.length) return null

  // Sort: HIGH first, then MEDIUM, then LOW
  const sorted = [...signals].sort((a, b) => {
    const order = { HIGH: 0, MEDIUM: 1, LOW: 2 }
    return (order[a.severity] ?? 3) - (order[b.severity] ?? 3)
  })

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
          <span>⚠️</span>
          Risk Signals
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Patterns that warrant closer scrutiny, and why they matter
        </p>
      </CardHeader>
      <CardBody className="space-y-3 p-4">
        {sorted.map((item, i) => {
          const severityStyle = getSeverityStyle(item.severity)
          return (
            <div
              key={i}
              className="rounded-xl border border-slate-200 overflow-hidden"
            >
              {/* Signal header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white">
                <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${severityStyle.barColor}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`text-xs flex-shrink-0 ${severityStyle.badgeClass}`}>
                      {severityStyle.icon} {severityStyle.text} risk
                    </Badge>
                    <p className="text-sm font-semibold text-slate-800">{item.signal}</p>
                  </div>
                </div>
              </div>

              {/* Why it matters */}
              {item.reason && (
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Why it matters
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.reason}</p>
                </div>
              )}
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
