const unwrapPredictionPayload = (item) => {
  if (!item) return null
  if (item.data && typeof item.data === 'object') return unwrapPredictionPayload(item.data)
  return item
}

export const normalizeBurnoutLevel = (level) => {
  switch (String(level || '').trim().toLowerCase()) {
    case 'high':
      return 'High'
    case 'medium':
    case 'moderate':
      return 'Medium'
    case 'low':
      return 'Low'
    default:
      return level || ''
  }
}

export const normalizePrediction = (item) => {
  const payload = unwrapPredictionPayload(item)
  if (!payload) return null

  const prediction = payload.prediction || {}
  const id =
    payload.id ||
    payload.prediction_id ||
    payload.predictionId ||
    payload._id ||
    prediction.id ||
    prediction.prediction_id ||
    prediction.predictionId ||
    prediction._id
  const burnoutLevel = normalizeBurnoutLevel(payload.burnout_level || prediction.burnout_level)
  const confidence = payload.confidence ?? prediction.confidence
  const stressEstimate = payload.stress_estimate ?? prediction.stress_estimate
  const probabilities = payload.probabilities || prediction.probabilities

  return {
    ...payload,
    id,
    prediction_id: payload.prediction_id || payload.id || id,
    burnout_level: burnoutLevel,
    confidence,
    stress_estimate: stressEstimate,
    probabilities,
    advice: payload.advice || '',
    prediction: {
      ...prediction,
      id,
      prediction_id: payload.prediction_id || payload.id || id,
      burnout_level: burnoutLevel,
      confidence,
      stress_estimate: stressEstimate,
      probabilities
    }
  }
}

export const normalizePredictions = (items = []) => {
  const payload = unwrapPredictionPayload(items)
  if (!Array.isArray(payload)) return []
  return payload.map(normalizePrediction).filter(Boolean)
}

export const getBurnoutBadgeClass = (level) => {
  switch (normalizeBurnoutLevel(level).toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30'
    case 'medium':
    case 'moderate':
      return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
    case 'low':
      return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
    default:
      return 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300 border-slate-200 dark:border-slate-500/30'
  }
}
