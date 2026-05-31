import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '../../contexts/ThemeContext'
import { normalizeBurnoutLevel } from '../../utils/prediction'

const BURNOUT_SCORES = {
  Low: 3,
  Medium: 6,
  High: 9
}

const formatChartDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('id-ID', { weekday: 'short' })
}

const buildTrendData = (data) => {
  if (!Array.isArray(data)) return []

  return [...data].slice(0, 7).reverse().map((item) => {
    const burnoutLevel = normalizeBurnoutLevel(item.burnout_level || item.prediction?.burnout_level)

    return {
      name: formatChartDate(item.created_at),
      stres: Number(item.stress_level) || 0,
      burnoutScore: BURNOUT_SCORES[burnoutLevel] ?? null,
      burnoutLevel: burnoutLevel || 'Unknown'
    }
  })
}

export default function TrendChart({ data }) {
  const { isDark } = useTheme()
  const chartData = buildTrendData(data)

  const textColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? '#334155' : '#e2e8f0'

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors duration-300">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tren Stres & Burnout (7 Terakhir)</h3>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand"></span>
            Stres
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
            Burnout
          </span>
        </div>
      </div>
      
      {chartData.length > 0 ? (
        <div className="w-full h-[280px] md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
              <Tooltip 
                formatter={(value, name, props) => {
                  if (props.dataKey === 'burnoutScore') {
                    return [props.payload.burnoutLevel, name]
                  }

                  return [`${Number(value).toFixed(1)}/10`, name]
                }}
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
                name="Stres"
                stroke="#23b1f5" 
                strokeWidth={4} 
                dot={{ fill: '#23b1f5', strokeWidth: 2, r: 5, stroke: isDark ? '#1e293b' : '#ffffff' }}
                activeDot={{ r: 7, strokeWidth: 0 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="burnoutScore"
                name="Burnout"
                stroke="#f97316"
                strokeWidth={4}
                connectNulls
                dot={{ fill: '#f97316', strokeWidth: 2, r: 5, stroke: isDark ? '#1e293b' : '#ffffff' }}
                activeDot={{ r: 7, strokeWidth: 0 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[280px] md:h-[320px] flex items-center justify-center text-center text-slate-500 dark:text-slate-400 font-medium">
          Belum ada data tren.
        </div>
      )}
    </div>
  )
}
