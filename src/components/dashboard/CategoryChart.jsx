import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useTheme } from '../../contexts/ThemeContext'

const data = [
  { name: 'Beban Kerja', value: 8, color: '#f43f5e' }, // Rose
  { name: 'Waktu Lembur', value: 6, color: '#f59e0b' }, // Amber
  { name: 'Kualitas Tidur', value: 3, color: '#10b981' }, // Emerald
]

export default function CategoryChart() {
  const { isDark } = useTheme()
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? '#334155' : '#e2e8f0'

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors duration-300">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Faktor Dominan (Contoh)</h3>
        <i className="fa-solid fa-chart-bar text-slate-400"></i>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={gridColor} />
            <XAxis type="number" domain={[0, 10]} stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} width={80} />
            <Tooltip 
              cursor={{fill: isDark ? '#334155' : '#f1f5f9'}}
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
      </div>
    </div>
  )
}
