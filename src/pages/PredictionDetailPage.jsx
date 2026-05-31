import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import ResultCard from '../components/predict/ResultCard'
import ConfirmModal from '../components/common/ConfirmModal'

export default function PredictionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await api.getPrediction(id)
        setPrediction(data)
      } catch (err) {
        setError('Detail prediksi tidak ditemukan.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  const handleDelete = async () => {
    try {
      await api.deletePrediction(id)
      navigate('/history')
    } catch (err) {
      alert('Gagal menghapus prediksi.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !prediction) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-bold">{error}</p>
        <Link to="/history" className="text-brand hover:underline">Kembali ke Riwayat</Link>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/history" className="text-slate-500 hover:text-brand font-semibold transition-colors flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Riwayat
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 font-bold py-2 px-4 rounded-lg transition-colors border border-red-200 dark:border-red-500/30 flex items-center gap-2 text-sm"
            >
              <i className="fa-solid fa-trash"></i> Hapus
            </button>
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-slate-500 font-medium">
            Dianalisis pada: {new Date(prediction.created_at).toLocaleDateString('id-ID', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>

        <ResultCard 
          data={prediction} 
          onReset={() => navigate('/predict')} 
        />
        
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Hapus Prediksi"
          message="Apakah Anda yakin ingin menghapus data prediksi ini? Data yang sudah dihapus tidak dapat dipulihkan."
        />
      </div>
    </div>
  )
}
