import { useState, useEffect } from 'react'
import WelcomeHeader from '../components/dashboard/WelcomeHeader'
import AIInsightCard from '../components/dashboard/AIInsightCard'
import ActionCard from '../components/dashboard/ActionCard'
import TrendChart from '../components/dashboard/TrendChart'
import CategoryChart from '../components/dashboard/CategoryChart'
import StatCard from '../components/dashboard/StatCard'
import LatestPredictionCard from '../components/dashboard/LatestPredictionCard'
import api from '../services/api'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await api.listPredictions()
        setPredictions(data || [])
      } catch (error) {
        console.error("Failed to fetch predictions", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPredictions()
  }, [])

  const latestPrediction = predictions.length > 0 ? predictions[0] : null
  const totalPredictions = predictions.length
  const highRiskCount = predictions.filter(p => p.burnout_level === 'High').length

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        <WelcomeHeader />

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Prediksi" 
            value={totalPredictions} 
            icon="fa-chart-simple" 
            colorClass="bg-blue-500 dark:bg-blue-600" 
          />
          <StatCard 
            title="Risiko Tinggi" 
            value={highRiskCount} 
            icon="fa-triangle-exclamation" 
            colorClass="bg-red-500 dark:bg-red-600" 
          />
          <StatCard 
            title="Tingkat Stres Saat Ini" 
            value={latestPrediction?.stress_level ? `${latestPrediction.stress_level}/10` : 'N/A'} 
            icon="fa-heart-pulse" 
            colorClass="bg-brand" 
          />
        </div>

        {/* Bento Layout Main Area */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          <div className="xl:col-span-8 flex flex-col gap-6">
            <AIInsightCard advice={latestPrediction?.advice} />
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrendChart data={predictions} />
              <CategoryChart />
            </div>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-6">
            <ActionCard />
            <LatestPredictionCard prediction={latestPrediction} />
          </div>

        </div>
      </div>
    </div>
  )
}
