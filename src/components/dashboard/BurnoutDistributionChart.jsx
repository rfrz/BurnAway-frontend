import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '../../hooks/useTheme.js'
import { normalizeBurnoutLevel } from '../../utils/prediction'

const LEVELS = [
  { name: 'Low', label: 'Aman', color: '#10b981' },
  { name: 'Medium', label: 'Sedang', color: '#f59e0b' },
  { name: 'High', label: 'Tinggi', color: '#f43f5e' }
]

const buildDistributionData = (data) => {
  const counts = { Low: 0, Medium: 0, High: 0 }

  if (Array.isArray(data)) {
    data.forEach((item) => {
      const level = normalizeBurnoutLevel(item.burnout_level || item.prediction?.burnout_level)

      if (counts[level] !== undefined) {
        counts[level] += 1
      }
    })
  }

  return LEVELS.map((level) => ({
    ...level,
    value: counts[level.name]
  }))
}

export default function BurnoutDistributionChart({ data }) {
  const { isDark } = useTheme()
  const distributionData = buildDistributionData(data)
  const pieData = distributionData.filter((item) => item.value > 0)
  const total = distributionData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors duration-300">
      <div className="mb-6 flex justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Distribusi Level Burnout</h3>
        <i className="fa-solid fa-chart-pie text-slate-400"></i>
      </div>

      {total > 0 ? (
        <div className="flex-1 flex flex-col">
          <div className="relative w-full h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={86}
                  paddingAngle={3}
                  stroke={isDark ? '#1e293b' : '#ffffff'}
                  strokeWidth={4}
                  animationDuration={1200}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} prediksi`, 'Jumlah']}
                  contentStyle={{
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900 dark:text-white">{total}</div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Total</div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {distributionData.map((item) => (
              <div key={item.name} className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-3 text-center">
                <div className="mx-auto mb-2 h-2 w-8 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div className="text-sm font-black text-slate-900 dark:text-white">{item.value}</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[280px] flex items-center justify-center text-center text-slate-500 dark:text-slate-400 font-medium">
          Belum ada data prediksi.
        </div>
      )}
    </div>
  )
}
