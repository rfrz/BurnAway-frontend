import { useState } from 'react'
import { Link } from 'react-router-dom'
import MetricForm from '../components/predict/MetricForm'
import ResultCard from '../components/predict/ResultCard'

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: '',
    experience_years: '',
    daily_work_hours: '',
    sleep_hours: '',
    caffeine_intake: '',
    bugs_per_day: '',
    commits_per_day: '',
    meetings_per_day: '',
    screen_time: '',
    exercise_hours: '',
    stress_level: '' // Skala 1-100 sesuai dokumen
  })
  
  const [predictionData, setPredictionData] = useState(null) // Menyimpan respon AI simulasi

  const handleChange = (e) => {
    const { name, value } = e.target
    // Memastikan input adalah angka (karena API meminta data numerik)
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log("Mengirim 11 Metrik Lengkap ke API Burnout:", formData)
    
    // Teks advice dikosongkan karena nanti akan diisi oleh Gemini
    const mockApiResponse = {
      prediction: {
        burnout_level: "High", // Simulasi: Dihitung secara acak agar UI bervariasi saat tes
        confidence: 0.92,
        stress_estimate: 78.5,
        probabilities: { "Low": 0.05, "Medium": 0.20, "High": 0.75 }
      },
      advice: "" // Placeholder untuk Gemini
    }
    
    // Simulasi jeda AI memproses data
    setTimeout(() => {
      // Sedikit bumbu simulasi agar level bervariasi saat kamu tes asal
      const level = formData.stress_level > 70 ? "High" : "Low"
      setPredictionData({
        ...mockApiResponse,
        prediction: {
          ...mockApiResponse.prediction,
          burnout_level: level 
        }
      })
    }, 800)
  }

  const handleReset = () => {
    // Reset form ke awal
    setFormData({ age: '', experience_years: '', daily_work_hours: '', sleep_hours: '', caffeine_intake: '', bugs_per_day: '', commits_per_day: '', meetings_per_day: '', screen_time: '', exercise_hours: '', stress_level: '' })
    setPredictionData(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 transition-colors duration-300 dark:bg-slate-950">
      
      {/* Container utama Full Width */}
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
            <Link to="/dashboard" className="text-slate-500 hover:text-slate-800 font-semibold transition-colors flex items-center gap-2 dark:text-slate-400 dark:hover:text-white">
              &larr; Kembali ke Dashboard
            </Link>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Analisis Burnout pada Developer
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Masukkan metrik harianmu untuk evaluasi preventif.
              </p>
            </div>
        </div>

        {/* Conditional Rendering (Render Bersyarat) */}
        {predictionData ? (
          <ResultCard 
            data={predictionData} // Kirim respon AI simulasi yang lengkap ke ResultCard
            onReset={handleReset} 
          />
        ) : (
          <MetricForm 
            formData={formData} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
          />
        )}

      </div>
    </div>
  )
}
