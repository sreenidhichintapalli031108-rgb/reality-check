import { Card, CardHeader, CardBody } from './Card'
import { ExternalLink } from 'lucide-react'
import { Badge } from './Badge'

const TYPE_CONFIG = {
  OFFICIAL: {
    label: 'Official Source',
    badgeClass: 'bg-green-100 text-green-700 border border-green-200',
    note: null,
  },
  USER_PROVIDED: {
    label: 'From Submitted Content',
    badgeClass: 'bg-blue-100 text-blue-700 border border-blue-200',
    note: 'This information came directly from the uploaded/pasted content. It has not been independently verified.',
  },
  OTHER: {
    label: 'Reference',
    badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200',
    note: null,
  },
}

export function EvidenceSection({ evidence }) {
  if (!evidence?.length) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
          <span>🔗</span>
          Evidence &amp; References
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Sources referenced during this analysis. User-provided content is not independently verified.
        </p>
      </CardHeader>
      <CardBody className="space-y-3 p-4">
        {evidence.map((item, i) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.OTHER

          return (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <div className="flex items-start gap-3 px-4 py-3">
                <Badge className={`flex-shrink-0 mt-0.5 text-xs ${config.badgeClass}`}>
                  {config.label}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{item.source}</p>

                  {item.supports && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.supports}</p>
                  )}

                  {item.url && item.url !== 'N/A' && item.url !== '' && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 mt-1.5"
                    >
                      <ExternalLink size={11} />
                      {item.url}
                    </a>
                  )}
                </div>
              </div>

              {/* Disclaimer for user-provided items */}
              {config.note && (
                <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                  <p className="text-xs text-blue-600 italic">{config.note}</p>
                </div>
              )}
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
