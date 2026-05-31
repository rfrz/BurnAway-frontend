import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '../../contexts/ThemeContext'

export default function TrendChart({ data }) {
  const { isDark } = useTheme()

  // Format data for chart
  const chartData = data ? [...data].reverse().slice(0, 7).map(item => ({
    name: new Date(item.created_at).toLocaleDateString('id-ID', { weekday: 'short' }),
    stres: item.stress_level
  })) : []

  // Fallback dummy data if no predictions
  const displayData = chartData.length > 0 ? chartData : [
    { name: 'Sen', stres: 3 },
    { name: 'Sel', stres: 4 },
    { name: 'Rab', stres: 7 },
    { name: 'Kam', stres: 6 },
    { name: 'Jum', stres: 8 },
  ]

  const textColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? '#334155' : '#e2e8f0'

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors duration-300">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tren Stres (7 Terakhir)</h3>
        <i className="fa-solid fa-chart-line text-slate-400"></i>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                color: isDark ? '#f8fafc' : '#0f172a',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="stres" 
              stroke="#23b1f5" 
              strokeWidth={4} 
              dot={{ fill: '#23b1f5', strokeWidth: 2, r: 6, stroke: isDark ? '#1e293b' : '#ffffff' }}
              activeDot={{ r: 8, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
