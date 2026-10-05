import { ShieldCheck } from 'lucide-react'

export function Logo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 16, text: 'text-sm', pad: 'p-1.5' },
    md: { icon: 20, text: 'text-lg', pad: 'p-2' },
    lg: { icon: 28, text: 'text-2xl', pad: 'p-2.5' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className="flex items-center gap-2.5">
      <div className={`bg-indigo-600 text-white rounded-xl ${s.pad} flex items-center justify-center shadow-sm shadow-indigo-200`}>
        <ShieldCheck size={s.icon} strokeWidth={2.5} />
      </div>
      <span className={`font-extrabold text-slate-900 tracking-tight ${s.text}`}>
        Reality<span className="text-indigo-600">Check</span>
      </span>
    </div>
  )
}
