import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  // Simulasi memori state untuk data profil
  const [profileData, setProfileData] = useState({
    name: 'name',
    email: 'name@contoh.com',
    role: 'Software Engineer'
  })

  // Simulasi memori state untuk form ubah password
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    // Logika integrasi API Backend nanti diletakkan di sini
    console.log('Menyimpan data profil...', profileData)
    alert('Profil berhasil diperbarui! (Simulasi)')
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Password baru tidak cocok!')
      return
    }
    console.log('Mengubah password...', passwords)
    alert('Password berhasil diubah! (Simulasi)')
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }) // Reset form
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] p-6 md:p-10 transition-colors duration-300 selection:bg-[#98deff]/50 dark:selection:bg-emerald-500/30">
      
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
            <Link to="/dashboard" className="text-slate-500 hover:text-[#23b1f5] font-semibold transition-colors flex items-center gap-2 dark:text-slate-400 dark:hover:text-emerald-400">
              &larr; Kembali ke Dashboard
            </Link>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Pengaturan Profil
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Kelola informasi personal dan keamanan akunmu.
              </p>
            </div>
        </div>

        {/* Bento UI Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sisi Kiri: Kartu Identitas (4 Kolom) */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-sm text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-[#98deff]/30 dark:bg-emerald-500/10 flex items-center justify-center text-[#23b1f5] dark:text-emerald-400 text-5xl font-black border-4 border-white dark:border-slate-800 shadow-xl shadow-[#98deff]/40 dark:shadow-none">
                  {profileData.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#23b1f5] dark:bg-emerald-500 rounded-full flex items-center justify-center text-white dark:text-slate-950 border-4 border-white dark:border-slate-800 hover:scale-110 transition-transform">
                  <i className="fa-solid fa-camera"></i>
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{profileData.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">{profileData.role}</p>
              
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
                Akun Terverifikasi
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Form Edit (8 Kolom) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Form Informasi Personal */}
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <i className="fa-solid fa-user-pen text-[#23b1f5] dark:text-emerald-400"></i>
                Informasi Personal
              </h3>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Nama Lengkap</label>
                    <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Pekerjaan / Peran</label>
                    <input type="text" name="role" value={profileData.role} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Email</label>
                  <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all" required />
                </div>
                <div className="pt-2">
                  <button type="submit" className="bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-emerald-400 transition-all shadow-md">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>

            {/* Form Ubah Password */}
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <i className="fa-solid fa-lock text-[#23b1f5] dark:text-emerald-400"></i>
                Keamanan & Password
              </h3>
              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Password Saat Ini</label>
                  <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Password Baru</label>
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Konfirmasi Password</label>
                    <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all" required />
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-transparent dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 font-bold px-6 py-3 rounded-xl transition-all">
                    Ubah Password
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
