import { Card, CardHeader, CardBody } from './Card'
import { Badge } from './Badge'
import { getClaimStatusStyle } from '../utils/displayHelpers'

export function ClaimsList({ claims }) {
  if (!claims?.length) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
          <span>📋</span>
          Claims vs. Evidence
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Every claim found in the content, its status, and why that status was assigned
        </p>
      </CardHeader>
      <CardBody className="space-y-3 p-4">
        {claims.map((item, i) => {
          const statusStyle = getClaimStatusStyle(item.status)
          return (
            <div
              key={i}
              className={`rounded-xl border border-slate-200 overflow-hidden ${statusStyle.rowBg}`}
            >
              {/* Claim row */}
              <div className="px-4 pt-3 pb-2">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    Claim
                  </span>
                  <Badge className={`flex-shrink-0 text-xs ${statusStyle.badgeClass}`}>
                    <span className="mr-1">{statusStyle.icon}</span>
                    {statusStyle.text}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  "{item.claim}"
                </p>
                {item.category && (
                  <span className="inline-block mt-1 text-xs text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Why row */}
              {item.reason && (
                <div className="px-4 py-2 bg-white/60 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Why
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
