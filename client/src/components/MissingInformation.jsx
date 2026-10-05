import { Card, CardHeader, CardBody } from './Card'

export function MissingInformation({ items }) {
  if (!items?.length) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
          <span>❓</span>
          What We Don't Know
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Important details that were absent from the content and could not be verified
        </p>
      </CardHeader>
      <CardBody className="p-4">
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
            >
              <span className="text-slate-400 flex-shrink-0 text-base mt-0.5" aria-hidden="true">
                •
              </span>
              <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
