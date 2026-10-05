/**
 * Displays compact summary counts derived entirely from existing report arrays.
 * No new backend fields required.
 */
export function SummaryCounts({ claims = [], riskSignals = [], missingInformation = [] }) {
  const supported = claims.filter((c) => c.status === 'SUPPORTED').length
  const unverified = claims.filter((c) => c.status === 'UNVERIFIED').length
  const contradicted = claims.filter((c) => c.status === 'CONTRADICTED').length
  const highRisk = riskSignals.filter((s) => s.severity === 'HIGH').length

  const stats = [
    { value: claims.length, label: 'Claims', color: 'text-slate-700', bg: 'bg-slate-100' },
    { value: supported, label: 'Supported', color: 'text-green-700', bg: 'bg-green-50 border border-green-200' },
    { value: unverified, label: 'Unverified', color: 'text-amber-700', bg: 'bg-amber-50 border border-amber-200' },
    { value: contradicted, label: 'Contradicted', color: 'text-red-700', bg: 'bg-red-50 border border-red-200' },
    { value: riskSignals.length, label: 'Risk Signals', color: 'text-orange-700', bg: 'bg-orange-50 border border-orange-200' },
    { value: missingInformation.length, label: 'Missing Details', color: 'text-slate-600', bg: 'bg-slate-50 border border-slate-200' },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Report Summary
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-lg p-3 text-center ${s.bg}`}>
            <div className={`text-2xl font-extrabold leading-none ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
      {highRisk > 0 && (
        <p className="text-xs text-red-600 font-medium mt-3 flex items-center gap-1">
          <span>🔴</span>
          {highRisk} high-severity risk signal{highRisk > 1 ? 's' : ''} detected
        </p>
      )}
    </div>
  )
}
