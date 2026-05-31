import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useTheme } from '../../contexts/ThemeContext'

const clampScore = (value) => Math.max(0, Math.min(10, Number(value) || 0))

const buildFactorData = (prediction) => {
  if (!prediction) return []

  const sleepDeficit = Math.max(0, 8 - Number(prediction.sleep_hours || 0))
  const overtime = Math.max(0, Number(prediction.daily_work_hours || 0) - 8)

  return [
    {
      name: 'Stres',
      value: clampScore(prediction.stress_level),
      color: '#f43f5e'
    },
    {
      name: 'Lembur',
      value: clampScore((overtime / 8) * 10),
      color: '#f97316'
    },
    {
      name: 'Kurang Tidur',
      value: clampScore((sleepDeficit / 8) * 10),
      color: '#f59e0b'
    },
    {
      name: 'Screen Time',
      value: clampScore((Number(prediction.screen_time || 0) / 16) * 10),
      color: '#23b1f5'
    },
    {
      name: 'Meeting',
      value: clampScore((Number(prediction.meetings_per_day || 0) / 10) * 10),
      color: '#8b5cf6'
    },
    {
      name: 'Bug',
      value: clampScore((Number(prediction.bugs_per_day || 0) / 20) * 10),
      color: '#ef4444'
    },
    {
      name: 'Kafein',
      value: clampScore((Number(prediction.caffeine_intake || 0) / 10) * 10),
      color: '#10b981'
    }
  ]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
}

export default function CategoryChart({ prediction }) {
  const { isDark } = useTheme()
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? '#334155' : '#e2e8f0'
  const data = buildFactorData(prediction)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors duration-300">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Faktor Dominan</h3>
        <i className="fa-solid fa-chart-bar text-slate-400"></i>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={gridColor} />
              <XAxis type="number" domain={[0, 10]} stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} width={90} />
              <Tooltip 
                cursor={{fill: isDark ? '#334155' : '#f1f5f9'}}
                formatter={(value) => [Number(value).toFixed(1), 'Skor Risiko']}
                contentStyle={{ 
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1500}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full min-h-[250px] flex items-center justify-center text-center text-slate-500 dark:text-slate-400 font-medium">
            Belum ada data prediksi.
          </div>
        )}
      </div>
    </div>
  )
}
