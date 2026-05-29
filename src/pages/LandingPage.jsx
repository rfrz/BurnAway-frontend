import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 font-sans selection:bg-[#98deff]/50 dark:selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Header & Navbar */ }
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="BurnAway Logo" className="h-10 w-auto object-contain" />
            <div className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Burn<span className="text-[#23b1f5] dark:text-emerald-500">Away</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-10 items-center text-sm font-medium">
            <a href="#dashboard" className="hover:text-[#23b1f5] dark:hover:text-emerald-400 transition-colors text-slate-600 dark:text-slate-300">Dashboard</a>
            <a href="#features" className="hover:text-[#23b1f5] dark:hover:text-emerald-400 transition-colors text-slate-600 dark:text-slate-300">Features</a>
            <a href="#how" className="hover:text-[#23b1f5] dark:hover:text-emerald-400 transition-colors text-slate-600 dark:text-slate-300">How it Works</a>
            <a href="#about" className="hover:text-[#23b1f5] dark:hover:text-emerald-400 transition-colors text-slate-600 dark:text-slate-300">About Us</a>
            <Link 
              to="/login" 
              className="bg-[#23b1f5] text-white dark:bg-emerald-500 dark:text-slate-950 px-6 py-2 rounded-full font-bold hover:bg-[#1a9add] dark:hover:bg-emerald-400 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
              Navigate Stress <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#23b1f5] to-[#98deff] dark:from-emerald-400 dark:to-cyan-400">
                Without Burnout.
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
              Predictive mental health insights designed for high-performance individuals. 
              Mencegah burnout sebelum terjadi dengan kekuatan analisis data.
            </p>
            <div className="flex gap-4">
              <Link to="/register" className="bg-[#23b1f5] text-white dark:bg-emerald-500 dark:text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
                Get Started
              </Link>
              <a href="#how" className="border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                How it Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Built for High Stakes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-brain', title: 'Predictive Analysis', desc: 'Predicting future burnout risk using historical sleep and stress trends.' },
              { icon: 'fa-shield-heart', title: 'Privacy First', desc: 'Your mental health data is encrypted and remains under your total control.' },
              { icon: 'fa-bolt', title: 'Instant Recovery', desc: 'Actionable micro-interventions to reset your nervous system in minutes.' }
            ].map((f, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm dark:shadow-none transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-[#98deff]/30 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#23b1f5] dark:group-hover:bg-emerald-500 transition-colors">
                  <i className={`fa-solid ${f.icon} text-[#23b1f5] dark:text-emerald-400 text-2xl group-hover:text-white dark:group-hover:text-slate-950`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it Works */}
      <section id="how" className="py-24 bg-[#23b1f5] dark:bg-emerald-500 text-white dark:text-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-16 text-center uppercase tracking-tighter">How BurnAway Works</h2>
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {['Log Daily Metrics', 'AI Signal Analysis', 'Burnout Prediction', 'Guided Recovery'].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black opacity-20 mb-4">0{i+1}</div>
                <h3 className="text-xl font-bold mb-2">{step}</h3>
                <div className="h-1 w-12 bg-white dark:bg-slate-950 mx-auto rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About Us */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
         <div className="w-64 h-64 rounded-full border-8 border-[#23b1f5] dark:border-emerald-500/20 shadow-xl shadow-[#98deff]/40 dark:shadow-none overflow-hidden shrink-0 transition-all duration-300">
         <img 
          src="https://placehold.co/400x400/f8fafc/23b1f5?text=Team" 
          alt="About" 
          className="w-full h-full object-cover dark:hidden" 
         />
         <img 
            src="https://placehold.co/400x400/1e293b/10b981?text=Team" 
            alt="About" 
            className="w-full h-full object-cover hidden dark:block" 
         />
</div>
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Bridging Data & Humanity</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              BurnAway lahir dari kebutuhan akan sistem pendukung performa yang berkelanjutan. Kami menggabungkan psikologi klinis dengan AI neural network untuk memberikan kamu kejelasan di tengah tekanan pekerjaan.
            </p>
            <p className="text-[#23b1f5] dark:text-emerald-400 font-bold">— The BurnAway Founding Team</p>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500">
        <p>© 2026 BurnAway Project. Empathetic Intelligence for Excellence.</p>
      </footer>
    </div>
  )
}
