import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLanguage } from '../hooks/useLanguage.js'
import { useAuth } from '../hooks/useAuth.js'

export default function LandingPage() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const features = [
    { icon: 'fa-brain', title: t('landing.features.predictive_title'), desc: t('landing.features.predictive_desc') },
    { icon: 'fa-shield-heart', title: t('landing.features.privacy_title'), desc: t('landing.features.privacy_desc') },
    { icon: 'fa-bolt', title: t('landing.features.recovery_title'), desc: t('landing.features.recovery_desc') }
  ]
  const steps = [
    t('landing.steps.metrics'),
    t('landing.steps.analysis'),
    t('landing.steps.prediction'),
    t('landing.steps.recovery')
  ]

  return (
    // Pembungkus utama halaman
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300 flex flex-col">
      
      {/* 1. Navbar Paling Atas (Bersih, dipanggil dari komponen luar) */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <Navbar />
      </div>

      {/* 2. Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
              {/* Teks diambil dari file JSON */}
              {t('landing.hero_title')}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
              {/* Teks diambil dari file JSON */}
              {t('landing.hero_subtitle')}
            </p>
            <div className="flex gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="bg-[#23b1f5] text-white dark:bg-[#23b1f5] dark:text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <Link to="/register" className="bg-[#23b1f5] text-white dark:bg-[#23b1f5] dark:text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                  {t('landing.cta_button')}
                </Link>
              )}
              <a href="#how" className="border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                {t('landing.how_button')}
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-8 bg-[#98deff]/40 dark:bg-[#23b1f5]/10 blur-3xl rounded-full"></div>
            <img
              src={`${import.meta.env.BASE_URL}assets/hero illustration.svg`}
              alt="BurnAway hero illustration"
              className="relative w-full max-w-[21rem] lg:max-w-[27rem] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">{t('landing.features_title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#98deff]/30 dark:bg-[#23b1f5]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#23b1f5] dark:group-hover:bg-[#23b1f5] transition-colors">
                  <i className={`fa-solid ${f.icon} text-[#23b1f5] dark:text-[#23b1f5] text-2xl group-hover:text-white dark:group-hover:text-slate-950`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How it Works */}
      <section id="how" className="py-24 bg-[#23b1f5] dark:bg-[#23b1f5] text-white dark:text-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-16 text-center uppercase tracking-tighter">{t('landing.how_title')}</h2>
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black opacity-40 mb-4">0{i+1}</div>
                <h3 className="text-xl font-bold mb-2">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About Us */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <img 
            src={`${import.meta.env.BASE_URL}assets/logo-burnaway.png`} 
            alt="BurnAway Logo" 
            className="w-64 h-64 object-contain shrink-0 transition-all duration-300" 
          />
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">{t('landing.about_title')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {t('landing.about_body')}
            </p>
            <p className="text-[#23b1f5] dark:text-[#23b1f5] font-bold">- {t('landing.about_team')}</p>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500">
        <p>&copy; {t('landing.footer')}</p>
      </footer>
    </div>
  )
}
