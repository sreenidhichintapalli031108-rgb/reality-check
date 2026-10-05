import { useState } from 'react'
import { Card, CardHeader, CardBody } from './Card'

/**
 * Builds checklist items from existing recommendedActions and missingInformation.
 * Only uses data already present in the report — no invented items.
 */
function buildChecklistItems(recommendedActions = [], missingInformation = []) {
  const items = []

  // Turn recommended actions into checklist items
  recommendedActions.forEach((a) => {
    if (a.action) items.push(a.action)
  })

  // Turn missing information into verification tasks
  missingInformation.forEach((m) => {
    const task = `Verify: ${m}`
    // Avoid duplicating something already in actions
    if (!items.some((i) => i.toLowerCase().includes(m.toLowerCase().slice(0, 20)))) {
      items.push(task)
    }
  })

  return items
}

export function VerificationChecklist({ recommendedActions, missingInformation }) {
  const items = buildChecklistItems(recommendedActions, missingInformation)

  // Track checked state entirely in component — no backend/storage needed
  const [checked, setChecked] = useState(() => new Array(items.length).fill(false))

  if (!items.length) return null

  const doneCount = checked.filter(Boolean).length

  const toggle = (i) => {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
            <span>✅</span>
            Verification Checklist
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {doneCount} / {items.length} done
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-0.5">
          Tick each item as you complete it. Progress is kept for this session only.
        </p>
      </CardHeader>
      <CardBody className="p-4">
        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: items.length ? `${(doneCount / items.length) * 100}%` : '0%' }}
          />
        </div>

        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i}>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => toggle(i)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                />
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    checked[i]
                      ? 'text-slate-400 line-through'
                      : 'text-slate-700 group-hover:text-slate-900'
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>

        {doneCount === items.length && items.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 font-medium text-center">
            All items checked. Remember to verify claims through official channels before acting.
          </div>
        )}
      </CardBody>
    </Card>
  )
}
