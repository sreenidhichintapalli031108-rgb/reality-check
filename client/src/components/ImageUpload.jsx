import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image } from 'lucide-react'
import { formatFileSize } from '../utils/displayHelpers'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_MB = 10

export function ImageUpload({ value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Unsupported file type. Please upload a JPG, PNG, or WebP image.'
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`
    }
    return null
  }

  const handleFile = useCallback(
    (file) => {
      const err = validateFile(file)
      if (err) {
        setError(err)
        return
      }
      setError('')
      onChange(file)
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  const clear = () => {
    onChange(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  // Show preview if a file is selected
  if (value) {
    const previewUrl = URL.createObjectURL(value)
    return (
      <div className="relative border-2 border-indigo-200 rounded-xl overflow-hidden bg-slate-50">
        <img
          src={previewUrl}
          alt="Uploaded screenshot"
          className="w-full max-h-64 object-contain p-2"
        />
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Image size={14} className="text-indigo-500" />
            <span className="font-medium truncate max-w-[200px]">{value.name}</span>
            <span className="text-slate-400">{formatFileSize(value.size)}</span>
          </div>
          <button
            onClick={clear}
            className="text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${dragging
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 bg-white'
          }
        `}
      >
        <Upload
          size={32}
          className={`mx-auto mb-3 ${dragging ? 'text-indigo-500' : 'text-slate-400'}`}
        />
        <p className="text-slate-700 font-medium mb-1">
          Drag & drop a screenshot here
        </p>
        <p className="text-sm text-slate-400">
          or click to browse · JPG, PNG, WebP up to 10 MB
        </p>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload image"
      />
    </div>
  )
}
