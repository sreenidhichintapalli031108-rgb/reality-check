import { Card, CardHeader, CardBody } from './Card'
import { getPriorityStyle } from '../utils/displayHelpers'

export function RecommendedActions({ actions }) {
  if (!actions?.length) return null

  // Highest priority action for the "Do This First" box
  const topAction = actions.find((a) => a.priority === 'HIGH') || actions[0]
  const rest = actions.filter((a) => a !== topAction)

  return (
    <div className="space-y-3">
      {/* DO THIS FIRST — prominent box */}
      <div className="rounded-2xl border-2 border-red-300 bg-red-50 overflow-hidden shadow-sm">
        <div className="bg-red-600 px-5 py-3 flex items-center gap-2">
          <span className="text-white text-lg" aria-hidden="true">🚨</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest">
            Do This First
          </span>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-red-900 leading-relaxed">
            {topAction.action}
          </p>
        </div>
      </div>

      {/* Full recommended steps */}
      {rest.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
              <span>📋</span>
              Recommended Next Steps
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              What you should do before making a decision
            </p>
          </CardHeader>
          <CardBody className="p-4">
            <ol className="space-y-3">
              {rest.map((item, i) => {
                const priorityStyle = getPriorityStyle(item.priority)
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 2}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium leading-snug">
                        {item.action}
                      </p>
                      {item.priority && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dotClass}`} />
                          <span className="text-xs text-slate-400">{priorityStyle.text}</span>
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
