import { useState } from 'react'
import { Link } from 'react-router-dom'
import MetricForm from '../components/predict/MetricForm'
import ResultCard from '../components/predict/ResultCard'
import api from '../services/api'

export default function PredictPage() {
  const [formData, setFormData] = useState({
    daily_work_hours: '',
    sleep_hours: '',
    caffeine_intake: '',
    bugs_per_day: '',
    commits_per_day: '',
    meetings_per_day: '',
    screen_time: '',
    exercise_hours: '',
    stress_level: 0
  })
  
  const [predictionData, setPredictionData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const response = await api.createPrediction(formData)
      setPredictionData(response)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Gagal membuat prediksi.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({ 
      daily_work_hours: '', 
      sleep_hours: '', 
      caffeine_intake: '', 
      bugs_per_day: '', 
      commits_per_day: '', 
      meetings_per_day: '', 
      screen_time: '', 
      exercise_hours: '', 
      stress_level: 0 
    })
    setPredictionData(null)
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <Link to="/dashboard" className="text-slate-500 hover:text-brand font-semibold transition-colors flex items-center gap-2">
              <i className="fa-solid fa-arrow-left"></i> Kembali ke Dashboard
            </Link>
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Analisis Burnout
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Masukkan metrik harianmu untuk evaluasi.
              </p>
            </div>
        </div>

        {error && (
          <div className="alert-banner alert-error mb-6">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        {predictionData ? (
          <ResultCard 
            data={predictionData}
            onReset={handleReset} 
          />
        ) : (
          <MetricForm 
            formData={formData} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            isLoading={isLoading}
          />
        )}

      </div>
    </div>
  )
}
