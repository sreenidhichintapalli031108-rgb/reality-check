/**
 * Maps an assessment label to a human-friendly display string and color.
 */
export function getAssessmentStyle(label) {
  switch (label) {
    case 'LOW_CONCERN':
      return {
        text: 'Low Concern',
        emoji: '🟢',
        description: 'No major issues detected. Standard verification still recommended.',
        color: 'green',
        bgClass: 'bg-green-50 border-green-300',
        headerBg: 'bg-green-600',
        textClass: 'text-green-900',
        subtextClass: 'text-green-700',
        badgeClass: 'bg-green-100 text-green-800 border border-green-200',
        iconColor: 'text-green-600',
        pillBg: 'bg-green-600',
      }
    case 'NEEDS_VERIFICATION':
      return {
        text: 'Needs Verification',
        emoji: '🟡',
        description: 'Some claims require independent verification before acting.',
        color: 'yellow',
        bgClass: 'bg-amber-50 border-amber-300',
        headerBg: 'bg-amber-500',
        textClass: 'text-amber-900',
        subtextClass: 'text-amber-700',
        badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200',
        iconColor: 'text-amber-600',
        pillBg: 'bg-amber-500',
      }
    case 'HIGH_CAUTION':
      return {
        text: 'High Caution',
        emoji: '🔴',
        description: 'Significant risk signals detected. Do not act without thorough verification.',
        color: 'red',
        bgClass: 'bg-red-50 border-red-300',
        headerBg: 'bg-red-600',
        textClass: 'text-red-900',
        subtextClass: 'text-red-700',
        badgeClass: 'bg-red-100 text-red-800 border border-red-200',
        iconColor: 'text-red-600',
        pillBg: 'bg-red-600',
      }
    case 'CRITICAL_CAUTION':
      return {
        text: 'Critical Caution',
        emoji: '🚨',
        description: 'Multiple serious risk signals detected. Do not take any action until everything is independently verified.',
        color: 'red',
        bgClass: 'bg-red-50 border-red-400',
        headerBg: 'bg-red-700',
        textClass: 'text-red-900',
        subtextClass: 'text-red-700',
        badgeClass: 'bg-red-200 text-red-900 border border-red-300',
        iconColor: 'text-red-700',
        pillBg: 'bg-red-700',
      }
    default:
      return {
        text: 'Unknown',
        emoji: '⚪',
        description: 'Assessment could not be determined.',
        color: 'gray',
        bgClass: 'bg-gray-50 border-gray-200',
        headerBg: 'bg-gray-500',
        textClass: 'text-gray-800',
        subtextClass: 'text-gray-600',
        badgeClass: 'bg-gray-100 text-gray-700 border border-gray-200',
        iconColor: 'text-gray-500',
        pillBg: 'bg-gray-500',
      }
  }
}

/**
 * Maps a claim status to display styles.
 */
export function getClaimStatusStyle(status) {
  switch (status) {
    case 'SUPPORTED':
      return {
        text: 'Supported',
        icon: '✅',
        badgeClass: 'bg-green-100 text-green-700 border border-green-200',
        rowBg: 'bg-green-50/50',
      }
    case 'UNVERIFIED':
      return {
        text: 'Unverified',
        icon: '❓',
        badgeClass: 'bg-amber-100 text-amber-700 border border-amber-200',
        rowBg: 'bg-amber-50/40',
      }
    case 'CONTRADICTED':
      return {
        text: 'Contradicted',
        icon: '❌',
        badgeClass: 'bg-red-100 text-red-700 border border-red-200',
        rowBg: 'bg-red-50/40',
      }
    default:
      return {
        text: 'Unknown',
        icon: '⚪',
        badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200',
        rowBg: 'bg-gray-50/40',
      }
  }
}

/**
 * Maps severity to display styles.
 */
export function getSeverityStyle(severity) {
  switch (severity) {
    case 'LOW':
      return {
        text: 'Low',
        icon: '🔵',
        badgeClass: 'bg-blue-100 text-blue-700 border border-blue-200',
        barColor: 'bg-blue-400',
      }
    case 'MEDIUM':
      return {
        text: 'Medium',
        icon: '🟡',
        badgeClass: 'bg-amber-100 text-amber-700 border border-amber-200',
        barColor: 'bg-amber-400',
      }
    case 'HIGH':
      return {
        text: 'High',
        icon: '🔴',
        badgeClass: 'bg-red-100 text-red-700 border border-red-200',
        barColor: 'bg-red-500',
      }
    default:
      return {
        text: 'Unknown',
        icon: '⚪',
        badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200',
        barColor: 'bg-gray-300',
      }
  }
}

/**
 * Maps priority to display styles.
 */
export function getPriorityStyle(priority) {
  switch (priority) {
    case 'HIGH':
      return { text: 'Do first', dotClass: 'bg-red-500' }
    case 'MEDIUM':
      return { text: 'Do next', dotClass: 'bg-amber-500' }
    case 'LOW':
      return { text: 'Optional', dotClass: 'bg-blue-400' }
    default:
      return { text: '', dotClass: 'bg-gray-400' }
  }
}

/**
 * Format file size for display.
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
