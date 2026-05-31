import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { getBurnoutBadgeClass } from '../utils/prediction'
import ConfirmModal from '../components/common/ConfirmModal'

export default function HistoryPage() {
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.listPredictions()
        setPredictions(data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchHistory()
  }, [])

  // Buka modal konfirmasi hapus
  const handleDeleteRequest = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  }

  // Lakukan hapus file setelah dikonfirmasi via modal
  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await api.deletePrediction(deleteTargetId)
      setPredictions((prev) => prev.filter(pred => pred.id !== deleteTargetId))
    } catch (err) {
      alert('Gagal menghapus prediksi.')
    } finally {
      setIsDeleteModalOpen(false)
      setDeleteTargetId(null)
    }
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/dashboard" className="text-slate-500 hover:text-brand font-semibold transition-colors flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </Link>
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Riwayat Prediksi
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : predictions.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-6">
              <i className="fa-solid fa-folder-open text-3xl"></i>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum ada riwayat</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Anda belum pernah melakukan prediksi tingkat stres.</p>
            <Link to="/predict" className="inline-block bg-brand text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-hover transition-colors shadow-md">
              Mulai Prediksi Pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {predictions.map((pred, index) => {
              const content = (
                <>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getBurnoutBadgeClass(pred.burnout_level)}`}>
                        {pred.burnout_level?.toUpperCase() || 'UNKNOWN'}
                      </span>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {pred.created_at ? new Date(pred.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) : 'Tanggal tidak tersedia'}
                      </span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-semibold">Tingkat Stres: {pred.stress_level}/10</p>
                    {!pred.id && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-2 font-semibold">
                        ID prediksi tidak tersedia.
                      </p>
                    )}
                  </div>
                  
                  {/* Container Tombol Detail & Hapus */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover/card:bg-brand group-hover/card:text-white transition-colors">
                      <i className={`fa-solid ${pred.id ? 'fa-chevron-right' : 'fa-circle-info'}`}></i>
                    </div>
                    {/* Tombol Hapus tampil di kanan menggunakan FontAwesome */}
                    {pred.id && (
                      <button
                        onClick={(e) => handleDeleteRequest(e, pred.id)}
                        className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-colors z-10"
                        title="Hapus riwayat"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </>
              )

              const cardClassName = "bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group/card w-full text-left"

              return (
                <div key={pred.id || `missing-id-${index}`} className="relative group/item">
                  {pred.id ? (
                    <Link to={`/history/${pred.id}`} className={`${cardClassName} hover:shadow-md block`}>
                      {content}
                    </Link>
                  ) : (
                    <div className={`${cardClassName} opacity-80`}>
                      {content}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
        
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Hapus Riwayat"
          message="Apakah Anda yakin ingin menghapus data riwayat ini? Data yang sudah dihapus tidak dapat dipulihkan."
        />
      </div>
    </div>
  )
}
