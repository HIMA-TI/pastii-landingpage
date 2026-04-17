import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ArrowRight, Bell, Zap, ShieldCheck, MapPin, 
  Fingerprint, Calendar, Clock, Menu, Check, Users, 
  QrCode, BarChart3, Plus, Minus, FileText, Database, 
  FolderSync, LayoutDashboard, Target, Timer, Play,
  Map, WifiOff, Smartphone, ServerCog, Lock, Navigation, CloudLightning, BatteryMedium, AlertCircle, Heart, Image as ImageIcon
} from 'lucide-react';

/** * ==========================================
 * GLOBAL STYLES (For Custom Animations)
 * ========================================== */
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    html { scroll-behavior: smooth; }
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: inline-flex;
      animation: marquee 30s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
  `}} />
);

/** * ==========================================
 * SHADCN-LIKE UI COMPONENTS
 * ========================================== */
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({ className, variant = 'default', size = 'default', children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
    secondary: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200",
    dark: "bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-lg shadow-slate-900/10",
    white: "bg-white text-emerald-600 hover:bg-slate-50 shadow-sm"
  };
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 px-4 text-xs",
    lg: "h-14 px-8 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ className, variant = 'default', children, ...props }) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors";
  const variants = {
    default: "bg-slate-900 text-slate-50",
    outline: "text-slate-900 border border-slate-200 bg-white/50 backdrop-blur-sm",
    success: "bg-[#E6F9F0] text-emerald-700",
    white: "bg-white text-emerald-600 shadow-sm"
  };
  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

const Card = ({ className, children }) => (
  <div className={cn("rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between text-left focus:outline-none group"
      >
        <span className="font-semibold text-slate-900 text-base md:text-lg group-hover:text-emerald-600 transition-colors">{question}</span>
        <span className={cn("ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300", isOpen ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600")}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-4 pb-2 text-slate-600 leading-relaxed pr-8 whitespace-pre-line">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

/** * ==========================================
 * HELPER: DYNAMIC COUNTDOWN TARGET
 * ========================================== */
const getNextSaturday = () => {
  const now = new Date();
  const daysUntilSat = (6 - now.getDay() + 7) % 7;
  const target = new Date(now);
  
  if (daysUntilSat === 0 && now.getHours() >= 8) {
    target.setDate(now.getDate() + 7);
  } else {
    target.setDate(now.getDate() + daysUntilSat);
  }
  
  target.setHours(8, 0, 0, 0);
  return target;
};

/** * ==========================================
 * MAIN APPLICATION PAGE
 * ========================================== */

const App = () => {
  const [isReleased, setIsReleased] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const targetDate = getNextSaturday();
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <CustomStyles />

      {/* DEMO TOGGLE UI */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 bg-white/80 backdrop-blur-md p-3 rounded-[1.5rem] shadow-2xl border border-slate-200">
         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Ubah Tampilan</span>
         <div className="flex bg-slate-100 rounded-xl p-1 relative">
           <button 
             onClick={() => setIsReleased(false)} 
             className={cn("relative z-10 px-4 py-2 text-xs font-bold rounded-lg transition-all", !isReleased ? "text-emerald-700" : "text-slate-500 hover:text-slate-700")}
           >
             ⏳ Countdown
           </button>
           <button 
             onClick={() => setIsReleased(true)} 
             className={cn("relative z-10 px-4 py-2 text-xs font-bold rounded-lg transition-all", isReleased ? "text-emerald-700" : "text-slate-500 hover:text-slate-700")}
           >
             🚀 Rilis Beta
           </button>
           <div className={cn("absolute top-1 bottom-1 w-[50%] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-out", isReleased ? "translate-x-full left-[-2px]" : "translate-x-0 left-1")}></div>
         </div>
      </div>
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">PASTII<span className="text-emerald-500">.</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#fitur" className="hover:text-emerald-600 transition-colors">Fitur Utama</a>
            <a href="#keunggulan" className="hover:text-emerald-600 transition-colors">Keunggulan</a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">Tanya Jawab</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Button className="hidden sm:inline-flex bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold shadow-none">Admin Panel</Button>
            <Button className="hidden sm:inline-flex">{isReleased ? "Unduh Aplikasi" : "Daftar Tunggu"}</Button>
            <Button variant="ghost" size="icon" className="md:hidden text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full"><Menu className="h-5 w-5" /></Button>
          </div>
        </div>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 mb-32">
          <div className="relative overflow-hidden md:overflow-visible rounded-[3rem] bg-gradient-to-br from-[#E6F9F0] via-[#CDEFE0] to-[#8EE5B9] px-6 pt-16 sm:px-16 lg:flex lg:pt-20 lg:pb-0 pb-16">
            
            <motion.div className="relative z-10 flex flex-col justify-center pb-12 lg:w-1/2 lg:pb-28" initial="hidden" animate="visible" variants={staggerContainer}>
              
              {/* Dynamic Badge */}
              <motion.div variants={fadeUpVariant} className="mb-6">
                <Badge variant="white" className="border border-emerald-100/50 shadow-sm gap-2 pl-2">
                  <span className={cn("rounded-full px-3 py-1 text-[10px] uppercase font-bold text-white tracking-wider transition-colors", isReleased ? "bg-emerald-500" : "bg-slate-800")}>
                    {isReleased ? "Eksklusif" : "Segera Hadir"}
                  </span>
                  <span className="transition-all">
                    {isReleased ? "HIMA-TI UNIKU" : "Rilis Aplikasi Terbatas"}
                  </span>
                  <ArrowRight className="h-3 w-3 mr-1" />
                </Badge>
              </motion.div>

              <motion.h1 variants={fadeUpVariant} className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Catat Kehadiran <br />
                <span className="text-emerald-600">HIMA-TI</span> Lebih <br />
                Gampang & Cepat.
              </motion.h1>

              <motion.p variants={fadeUpVariant} className="mb-8 max-w-lg text-lg leading-relaxed text-emerald-950/70 font-medium">
                Tinggalkan absen kertas! PASTII bantu pantau kehadiran rapat dan acara kamu secara otomatis, aman dari titip absen, dan tetap bisa dipakai walau tanpa kuota.
              </motion.p>

              {/* Dynamic Content: Countdown vs Released Space */}
              <AnimatePresence mode="wait">
                {!isReleased && (
                  <motion.div 
                    key="countdown"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Timer className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Akses Dibuka Dalam:</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {[
                        { value: timeLeft.days, label: "Hari" },
                        { value: timeLeft.hours, label: "Jam" },
                        { value: timeLeft.minutes, label: "Menit" },
                        { value: timeLeft.seconds, label: "Detik" }
                      ].map((unit, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border border-emerald-200 shadow-sm rounded-2xl w-16 h-16 sm:w-20 sm:h-20">
                            <span className="text-2xl sm:text-3xl font-black text-slate-800">{String(unit.value).padStart(2, '0')}</span>
                            <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mt-0.5">{unit.label}</span>
                          </div>
                          {idx < 3 && <span className="text-2xl font-black text-emerald-400/60">:</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic CTA */}
              <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                {isReleased ? (
                  <Button variant="dark" size="lg" className="w-full sm:w-auto gap-2 bg-[#0f172a] hover:bg-[#1e293b]">
                    <Download className="h-5 w-5" /> Download Aplikasi
                  </Button>
                ) : (
                  <Button variant="dark" size="lg" className="w-full sm:w-auto gap-2 bg-slate-400 hover:bg-slate-400 cursor-not-allowed shadow-none" disabled>
                    <Clock className="h-5 w-5" /> Belum Tersedia
                  </Button>
                )}
                
                <div className="flex items-center gap-4 hidden sm:flex">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => <img key={i} className="inline-block h-11 w-11 rounded-full border-2 border-[#CDEFE0] object-cover shadow-sm" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />)}
                  </div>
                  <div className="text-sm font-medium text-emerald-900">
                    <span className="block font-extrabold text-base">100+</span>
                    <span className="text-emerald-800/80 text-xs uppercase tracking-wider font-bold transition-all">
                      {isReleased ? "Pengurus Menggunakan" : "Pengurus Menunggu"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* HERO MOCKUP PLACEHOLDER */}
            <motion.div className="relative z-20 mt-12 lg:absolute lg:-bottom-16 lg:right-12 lg:mt-0 lg:w-1/2 xl:right-24 w-full h-[600px]" initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.3 }}>
              {/* TODO: GANTI KOTAK PLACEHOLDER DI BAWAH INI DENGAN GAMBAR HP/MOCKUP ANDA 
                  Contoh: <img src="/mockup-hero.png" alt="App Mockup" className="w-full h-auto object-contain drop-shadow-2xl" />
              */}
              <div className="mx-auto w-full max-w-[320px] h-[640px] bg-emerald-50/70 border-4 border-dashed border-emerald-300 rounded-[3rem] flex flex-col items-center justify-center text-emerald-600 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm p-8 text-center transition-all hover:bg-emerald-100/50">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="font-extrabold text-lg mb-2">Slot Gambar HP</h3>
                  <p className="text-xs font-medium text-emerald-600/70">Masukkan gambar mockup desain HP atau Screenshot aplikasi Anda di sini.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LOGOS */}
        <motion.section 
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        >
          <p className="mb-8 text-center text-xs font-extrabold uppercase tracking-widest text-slate-400">Dirancang Khusus Untuk Keperluan</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
            <span className="text-xl md:text-2xl font-black text-slate-800">UNIVERSITAS KUNINGAN</span>
            <span className="text-xl md:text-2xl font-black text-slate-800">FKOM UNIKU</span>
            <span className="text-xl md:text-2xl font-black text-slate-800">HIMA-TI</span>
          </div>
        </motion.section>

        {/* 2. DISCOVER WHAT WE OFFER (FITUR UTAMA) */}
        <section id="fitur" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32 overflow-hidden">
          <motion.div 
            className="text-center mb-20"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.h2 variants={fadeUpVariant} className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl mb-6">
              Apa Saja yang Bisa <br className="md:hidden"/><span className="text-emerald-500">PASTII</span> Lakukan?
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Selamat tinggal absen manual. Kami membuat semuanya jadi serba otomatis, jujur, dan gampang dipakai.
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-12">
            
            {/* Feature Block 1: Smart Attendance */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="bg-[#F0FDF4] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-emerald-50 relative group overflow-hidden"
            >
              <div className="md:w-1/2 z-10">
                <Badge variant="success" className="mb-6 px-4 py-1.5"><MapPin className="w-3 h-3 mr-2"/> Absen Otomatis</Badge>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Absen Tepat Sasaran, <br/> Bebas Kecurangan.</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                  Aplikasi akan mengecek lokasimu menggunakan GPS. Kamu cuma bisa menekan tombol absen kalau sudah benar-benar sampai di tempat acara.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <b>Kunci Lokasi Akurat:</b> Jarak HP-mu dengan tempat acara langsung dihitung otomatis.</li>
                  <li className="flex items-start gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> <b>Anti Lokasi Palsu:</b> Sistem pintar kami bisa mendeteksi jika ada yang mencoba memalsukan lokasi/Fake GPS.</li>
                </ul>
              </div>
              
              {/* PLACEHOLDER MOCKUP 1 */}
              <div className="md:w-1/2 relative h-[280px] w-full flex justify-center items-center">
                 {/* GANTI KOTAK INI DENGAN GAMBAR FITUR 1 */}
                 <div className="w-64 h-56 bg-emerald-100/50 border-4 border-dashed border-emerald-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 transition-all group-hover:bg-emerald-200/50">
                   <ImageIcon className="w-10 h-10 text-emerald-400 mb-2" />
                   <p className="font-bold text-emerald-700 text-sm">Gambar Fitur Peta / GPS</p>
                   <p className="text-[10px] text-emerald-600/60 mt-1">Masukkan ilustrasi lacak lokasi di sini</p>
                 </div>
              </div>
            </motion.div>

            {/* Feature Block 2: Manajemen Histori */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="bg-[#F0FDF4] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row-reverse items-center justify-between gap-12 border border-emerald-50 overflow-hidden group"
            >
              <div className="md:w-1/2 z-10">
                <Badge variant="success" className="mb-6 px-4 py-1.5"><Clock className="w-3 h-3 mr-2"/> Riwayat Rapi</Badge>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Rekap Kedisiplinan <br/> Secara Otomatis.</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  Nggak perlu lagi ngerekap manual. Sistem otomatis menilai siapa yang tepat waktu (Gercep), siapa yang telat (beserta durasi telatnya), dan siapa yang izin.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Badge className="bg-emerald-100 text-emerald-700">Tepat Waktu</Badge>
                  <Badge className="bg-amber-100 text-amber-700">Telat 15 Menit</Badge>
                  <Badge className="bg-blue-100 text-blue-700">Izin Sakit</Badge>
                </div>
              </div>

              {/* PLACEHOLDER MOCKUP 2 */}
              <div className="md:w-1/2 relative h-[280px] w-full flex justify-center items-center">
                 {/* GANTI KOTAK INI DENGAN GAMBAR FITUR 2 */}
                 <div className="w-64 h-56 bg-emerald-100/50 border-4 border-dashed border-emerald-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 transition-all group-hover:bg-emerald-200/50">
                   <ImageIcon className="w-10 h-10 text-emerald-400 mb-2" />
                   <p className="font-bold text-emerald-700 text-sm">Gambar Fitur Histori</p>
                   <p className="text-[10px] text-emerald-600/60 mt-1">Masukkan ilustrasi list daftar hadir di sini</p>
                 </div>
              </div>
            </motion.div>

            {/* Feature Block 3: Offline Resilience */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="bg-[#F0FDF4] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-emerald-50 relative group overflow-hidden"
            >
              <div className="md:w-1/2 z-10">
                <Badge variant="success" className="mb-6 px-4 py-1.5"><WifiOff className="w-3 h-3 mr-2"/> Anti Sinyal Jelek</Badge>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Tetap Bisa Absen <br/> Walau Tanpa Kuota!</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                  Lagi di ruangan susah sinyal? Nggak masalah. Aplikasi bisa menyimpan data absenmu secara <i>offline</i>, dan akan mengirimkannya otomatis pas HP kamu dapet sinyal lagi.
                </p>
              </div>

              {/* PLACEHOLDER MOCKUP 3 */}
              <div className="md:w-1/2 relative h-[280px] w-full flex justify-center items-center">
                 {/* GANTI KOTAK INI DENGAN GAMBAR FITUR 3 */}
                 <div className="w-64 h-56 bg-emerald-100/50 border-4 border-dashed border-emerald-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 transition-all group-hover:bg-emerald-200/50">
                   <ImageIcon className="w-10 h-10 text-emerald-400 mb-2" />
                   <p className="font-bold text-emerald-700 text-sm">Gambar Fitur Offline</p>
                   <p className="text-[10px] text-emerald-600/60 mt-1">Masukkan ilustrasi tidak ada sinyal/wifi di sini</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. KEUNGGULAN */}
        <section id="keunggulan" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="bg-[#10B981] rounded-[3rem] p-8 md:p-16 lg:flex lg:gap-20 lg:items-center text-white shadow-2xl shadow-emerald-900/10"
          >
            <div className="lg:w-5/12 mb-12 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">
                Kenapa Harus <br /> Pindah ke PASTII?
              </h2>
              <p className="text-emerald-50 text-lg leading-relaxed mb-10 opacity-90">
                Aplikasi ini dibuat senyaman dan seringan mungkin biar HP kamu nggak gampang panas, tapi tetep canggih buat ngurusin acara HIMA.
              </p>
            </div>

            <div className="lg:w-7/12 flex flex-col gap-5">
              {[
                { icon: <ShieldCheck />, title: "Anti Titip Absen", desc: "Kombinasi pelacakan lokasi dan sistem keamanan kami bikin absen jadi 100% jujur. Nggak bisa diakali teman!" },
                { icon: <BatteryMedium />, title: "Sangat Hemat Baterai", desc: "Sistem pelacakan hanya menyala sekilas saat absen. Dijamin baterai HP kamu aman sampai acara selesai." },
                { icon: <Users />, title: "Praktis Untuk Semua", desc: "Anggota biasa bisa fokus absen, sedangkan panitia bisa bikin jadwal dan mengatur lokasi. Semua dalam satu aplikasi." }
              ].map((step, i) => (
                <div key={i} className="bg-white text-slate-900 rounded-[2rem] p-6 sm:p-8 flex items-center gap-6 shadow-lg transition-transform hover:-translate-y-1">
                  <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F0FDF4] text-emerald-600 border border-emerald-100">
                    {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold mb-2 text-slate-800">{step.title}</h4>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 4. FITUR CERDAS LAINNYA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Pintar Mengingatkan <span className="text-emerald-500">Hal Penting</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Detail kecil yang membuat pengalaman organisasimu menjadi jauh lebih baik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Bell />, title: "Pengingat Acara", desc: "Dapat notifikasi di HP 15 menit sebelum kumpul dimulai. Dijamin nggak ada lagi alasan lupa jadwal rapat!" },
              { icon: <CloudLightning />, title: "Notifikasi Instan", desc: "Setiap ada pengumuman mendadak, pesannya akan langsung masuk ke layar HP kamu secara langsung." },
              { icon: <AlertCircle />, title: "Pengingat Pulang", desc: "Sering lupa mencatat jam pulang? Layar utama akan mengingatkanmu kalau kamu belum absen selesai acara." }
            ].map((feat, idx) => (
              <motion.div 
                key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} custom={idx}
              >
                <Card className="p-10 h-full border-slate-200 group flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#F0FDF4] text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                    {React.cloneElement(feat.icon, { className: "h-10 w-10" })}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-base leading-relaxed text-slate-600">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. TECH STACK (Simplified) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="bg-[#0f172a] rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16 text-white overflow-hidden relative shadow-2xl"
          >
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="lg:w-1/2 z-10">
              <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 mb-6 border-none">Dapur Teknologi</Badge>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Dibuat Menggunakan Teknologi Terkini.</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-0">
                Kami membangun aplikasi ini menggunakan alat pengembangan modern agar aplikasi berjalan sangat mulus, responsif, dan mampu menampung data dengan aman.
              </p>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 z-10 w-full">
              {[
                { label: "Sistem Andal", icon: <Smartphone /> },
                { label: "Database Aman", icon: <Database /> },
                { label: "Proses Cepat", icon: <ServerCog /> },
                { label: "Notif Lancar", icon: <CloudLightning /> },
                { label: "Login Google", icon: <Lock /> },
                { label: "Peta Digital", icon: <Map /> }
              ].map((brand, i) => (
                <div key={i} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors h-28 group text-center">
                   {React.cloneElement(brand.icon, { className: "h-7 w-7 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0" })}
                   <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{brand.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. FAQ SECTION */}
        <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 bg-slate-50 rounded-[3rem] p-10 md:p-16">
          <div className="lg:flex lg:gap-20">
            <div className="lg:w-5/12 mb-12 lg:mb-0">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                Pertanyaan yang <br className="hidden lg:block" /> Sering Ditanya
              </h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Penjelasan singkat soal masalah sinyal, baterai, dan cara aplikasi mendeteksi kecurangan.
              </p>
            </div>
            
            <div className="lg:w-7/12 flex flex-col border-t border-slate-200">
              <FAQItem 
                question="Gimana kalau ada yang pakai aplikasi pemalsu lokasi?" 
                answer="Tenang saja, PASTII punya pelindung khusus. Sistem kami bisa membaca jika seseorang mengaktifkan lokasi palsu (Fake GPS), dan tombol absen mereka otomatis tidak bisa diklik."
              />
              <FAQItem 
                question="Kalau pas mau absen kuotanya habis gimana?" 
                answer="Kamu tetap bisa menekan tombol absen karena aplikasi memiliki mode Offline. Datanya bakal disimpan di HP kamu, dan nanti pas dapat sinyal/WiFi, absensinya akan langsung terkirim ke panitia."
              />
              <FAQItem 
                question="Aplikasi minta izin lokasi, bikin boros baterai nggak?" 
                answer="Sama sekali nggak. Pelacak lokasi hanya aktif saat layar absen dibuka saja. Selebihnya, GPS akan tertidur pulas agar baterai kamu tetap awet seharian."
              />
              <FAQItem 
                question="Gimana cara aplikasi nentuin kita telat atau nggak?" 
                answer="Aplikasi mencocokkan jam masuk absenmu dengan jadwal acara yang dibuat panitia. Kalau kamu absen melebihi batas waktu, otomatis statusmu berubah jadi 'Telat' lengkap dengan hitungan menitnya."
              />
            </div>
          </div>
        </section>

        {/* 8. MARQUEE BANNER */}
        <div className="w-full overflow-hidden border-y border-emerald-500/10 bg-emerald-50 py-8 mb-20 relative flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[1, 2].map((group) => (
              <div key={group} className="flex items-center gap-12 px-6">
                <span className="text-4xl md:text-6xl font-black text-emerald-500/20 tracking-tighter uppercase select-none flex items-center gap-4">
                  DIKEMBANGKAN DENGAN <Heart className="w-10 h-10 inline text-emerald-300 fill-emerald-300"/>
                </span>
                <span className="text-4xl md:text-6xl font-black text-emerald-500/20 tracking-tighter uppercase select-none">UNTUK KEMAJUAN HIMA-TI UNIKU</span>
                <span className="text-emerald-300"><Zap className="w-12 h-12" /></span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <MapPin className="h-6 w-6" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900">PASTII<span className="text-emerald-500">.</span></span>
              </div>
              <p className="text-slate-500 max-w-xs font-medium">Solusi absensi modern dan anti ribet khusus untuk mahasiswa Teknik Informatika (UNIKU).</p>
            </div>
            
            <div className="text-left md:text-right">
              <h4 className="font-extrabold text-slate-900 text-xl mb-4">Majukan Organisasimu, <br className="hidden md:block"/> Mulai Dari Tertib Absen.</h4>
              <Button className="bg-[#10B981] shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5">Dapatkan Akses</Button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-semibold text-slate-500">
            <p className="text-slate-400">Dibuat dengan ❤️ untuk HIMA-TI UNIKU © 2026</p>
            <div className="flex gap-6 flex-wrap justify-center">
              <a href="#" className="hover:text-emerald-600 transition-colors">Bantuan</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Privasi</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;