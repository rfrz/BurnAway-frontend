import WelcomeHeader from '../components/dashboard/WelcomeHeader'
import AIInsightCard from '../components/dashboard/AIInsightCard'
import ActionCard from '../components/dashboard/ActionCard'
import TrendChart from '../components/dashboard/TrendChart'
import CategoryChart from '../components/dashboard/CategoryChart'

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-slate-50 py-8 px-4 sm:px-6 md:px-8">
      {/* Container Utama dengan Batas Maksimal Lebar Layar */}
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Row 1: Header Sapaan (Merentang Penuh 12 Kolom) */}
        <WelcomeHeader />

        {/* Grid Area Utama (Bento Layout) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Row 2 Kiri: AI Insight Card (Memakan 8 Kolom di Layar Lebar) */}
          <div className="xl:col-span-8">
            <AIInsightCard />
          </div>

          {/* Row 2 Kanan: Action Card (Memakan 4 Kolom Sisa) */}
          <div className="xl:col-span-4">
            <ActionCard />
          </div>

          {/* Row 3 Kiri: Grafik Tren (Memakan 6 Kolom / Setengah Lebar) */}
          <div className="xl:col-span-6">
            <TrendChart />
          </div>

          {/* Row 3 Kanan: Grafik Kategori (Memakan 6 Kolom Sisa) */}
          <div className="xl:col-span-6">
            <CategoryChart />
          </div>

        </div>
      </div>
    </div>
  )
}
