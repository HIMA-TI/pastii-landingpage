import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import appLogo from './assets/presensi.png';
import heroImg from './assets/hero-img.png';
import {
    Download, ArrowRight, Bell, Zap, ShieldCheck, MapPin,
    Fingerprint, Calendar, Clock, Menu, Check, Users,
    QrCode, BarChart3, Plus, Minus, FileText, Database,
    FolderSync, LayoutDashboard, Target, Timer, Play, X,
    Map, WifiOff, Smartphone, ServerCog, Lock, Navigation, CloudLightning, BatteryMedium, AlertCircle, Heart, Image as ImageIcon
} from 'lucide-react';

/** * ==========================================
 * GLOBAL STYLES (For Custom Animations)
 * ========================================== */
const CustomStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
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
    const isReleased = false;
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [showDownloadModal, setShowDownloadModal] = useState(false);

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



            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img src={appLogo} alt="Logo PASTII" className="h-10 w-auto object-contain drop-shadow-sm" />
                        <span className="text-xl font-extrabold tracking-tight text-slate-900">PASTII<span className="text-emerald-500">.</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
                        <a href="#about" className="hover:text-emerald-600 transition-colors">Tentang</a>
                        <a href="#fitur" className="hover:text-emerald-600 transition-colors">Fitur Kece</a>
                        <a href="#keunggulan" className="hover:text-emerald-600 transition-colors">Kenapa PASTII?</a>
                        <a href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {isReleased ? (
                            <Button onClick={() => setShowDownloadModal(true)} className="hidden sm:inline-flex">Download Sekarang</Button>
                        ) : (
                            <a href="#kontak"><Button className="hidden sm:inline-flex">Ikut Waitlist</Button></a>
                        )}
                        <Button variant="ghost" size="icon" className="md:hidden text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full"><Menu className="h-5 w-5" /></Button>
                    </div>
                </div>
            </nav>

            <main>
                {/* 1. HERO SECTION */}
                <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 mb-32">
                    <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#E6F9F0] via-[#CDEFE0] to-[#8EE5B9] px-6 pt-16 sm:px-16 lg:flex lg:items-center lg:py-20 lg:gap-12 pb-16">

                        <motion.div className="relative z-10 flex flex-col justify-center pb-12 lg:w-1/2 lg:pb-0" initial="hidden" animate="visible" variants={staggerContainer}>

                            {/* Dynamic Badge */}
                            <motion.div variants={fadeUpVariant} className="mb-6">
                                <Badge variant="white" className="border border-emerald-100/50 shadow-sm gap-2 pl-2">
                                    <span className={cn("rounded-full px-3 py-1 text-[10px] uppercase font-bold text-white tracking-wider transition-colors", isReleased ? "bg-emerald-500" : "bg-slate-800")}>
                                        {isReleased ? "Rilis Beta" : "Closed Beta"}
                                    </span>
                                    <span className="transition-all text-sm font-semibold text-slate-700">
                                        {isReleased ? "Terbuka Khusus HIMA-TI UNIKU" : "Akses Pengujian Masih Terbatas"}
                                    </span>
                                    <ArrowRight className="h-4 w-4 mr-1 text-slate-400" />
                                </Badge>
                            </motion.div>

                            <motion.h1 variants={fadeUpVariant} className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                                Absen HIMA-TI, <br />
                                <span className="text-emerald-600">Sekarang Makin</span> <br />
                                Sat-Set!
                            </motion.h1>

                            <motion.p variants={fadeUpVariant} className="mb-8 max-w-lg text-lg leading-relaxed text-emerald-950/70 font-medium">
                                Nggak jaman lagi deh absen pakai kertas yang gampang basah atau ilang. Dengan PASTII, absen acara HIMA-TI jadi jauh lebih rapi, cepet, dan pastinya bebas dari drama titip-titipan absen. Cobain aja sendiri!
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
                                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Bisa Dipakai Dalam:</span>
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
                                    <Button onClick={() => setShowDownloadModal(true)} variant="dark" size="lg" className="w-full sm:w-auto gap-2 bg-[#0f172a] hover:bg-[#1e293b]">
                                        <Download className="h-5 w-5" /> Install Sekarang
                                    </Button>
                                ) : (
                                    <a href="#kontak" className="w-full sm:w-auto">
                                        <Button variant="dark" size="lg" className="w-full gap-2 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20">
                                            <Clock className="h-5 w-5" /> Ikut Waitlist
                                        </Button>
                                    </a>
                                )}

                                <div className="flex items-center gap-4 hidden sm:flex">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => <img key={i} className="inline-block h-11 w-11 rounded-full border-2 border-[#CDEFE0] object-cover shadow-sm" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />)}
                                    </div>
                                    <div className="text-sm font-medium text-emerald-900">
                                        <span className="block font-extrabold text-base">100+</span>
                                        <span className="text-emerald-800/80 text-xs uppercase tracking-wider font-bold transition-all">
                                            {isReleased ? "Pengurus Udah Pake" : "Anggota Udah Nunggu"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* HERO IMAGE */}
                        <motion.div className="relative z-20 mt-8 lg:mt-0 w-full lg:w-1/2 flex justify-center lg:justify-end" initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.3 }}>
                            <div className="w-full flex items-center justify-center transition-all hover:scale-[1.02] hover:-translate-y-2 duration-500 group relative lg:mr-0 lg:ml-10">
                                <img src={heroImg} alt="Mockup PASTII App" className="w-full max-w-[120%] lg:max-w-[150%] scale-125 sm:scale-110 lg:scale-[1.35] xl:scale-[1.45] origin-center lg:origin-right h-auto object-contain drop-shadow-[0_40px_60px_rgba(16,185,129,0.2)] lg:drop-shadow-[0_50px_80px_rgba(0,0,0,0.35)] pointer-events-none" />
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
                        <span className="text-xl md:text-2xl font-black text-slate-800">HIMPUNAN MAHASISWA TEKNIK INFORMATIKA</span>
                        <span className="text-xl md:text-2xl font-black text-slate-800">FKOM</span>
                        <span className="text-xl md:text-2xl font-black text-slate-800">UNIKU</span>
                    </div>
                </motion.section>

                {/* 1.5 TENTANG PASTII */}
                <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                        className="flex flex-col lg:flex-row items-center gap-12 rounded-[3rem] bg-[#F0FDF4] border border-emerald-50 p-8 md:p-14 shadow-sm relative overflow-hidden"
                    >
                        {/* Decorative Background blur */}
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="lg:w-5/12 relative z-10 text-left">
                            <div className="mb-6">
                                <img src={appLogo} alt="Logo PASTII" className="h-20 w-auto object-contain drop-shadow-md" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">PASTII</h2>
                            <p className="text-xl font-bold text-emerald-800 mb-2">Platform Absensi HIMA-TI UNIKU</p>
                            <p className="text-emerald-600 font-medium italic text-lg opacity-80">
                                Solusi presensi cerdas, akurat, dan bebas "titip absen".
                            </p>
                        </div>

                        <div className="lg:w-7/12 relative z-10">
                            <motion.div variants={fadeUpVariant} className="flex flex-col gap-6 text-slate-600 leading-relaxed text-lg font-medium">
                                <p>
                                    <strong className="text-slate-900 font-extrabold">PASTII (Platform Absensi HIMA-TI)</strong> itu ibarat asisten absensi modern di HP yang dibikin spesifik buat ngebantu kelancaran acara HIMA-TI UNIKU. Kita sengaja rancang aplikasi ini buat ninggalin jaman absen manual pake kertas, dan yang paling penting: ngehapus tuntas tradisi "titip absen".
                                </p>
                                <p>
                                    Lewat kombinasi pelacak posisi GPS yang super ngunci, keamanan ekstra via biometrik (sidik jari/wajah), sampe penyimpanan <span className="italic">cloud real-time</span>, PASTII bakal nge-track secara jujur apakah kamu emang beneran nongol di lokasi penyelenggaraan <span className="italic">event</span> pas mencet tombol <span className="italic">check-in</span> maupun <span className="italic">check-out</span>.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* 2. DISCOVER WHAT WE OFFER (FITUR UTAMA) */}
                <section id="fitur" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32 overflow-hidden">
                    <motion.div
                        className="text-center mb-20"
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeUpVariant} className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl mb-6">
                            Fitur OP yang Bikin <br className="md:hidden" /><span className="text-emerald-500">Hidup Lebih Nyantai</span>
                        </motion.h2>
                        <motion.p variants={fadeUpVariant} className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Udah nggak jaman pakai kertas buat absen. Kita bikin semuanya serba otomatis, asik, dan pastinya anti-ribet buat kegiatan HIMA-TI.
                        </motion.p>
                    </motion.div>

                    <div className="flex flex-col gap-12">

                        {/* Feature Block 1: Smart Attendance */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
                            className="bg-[#F0FDF4] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-emerald-50 relative group overflow-hidden"
                        >
                            <div className="md:w-1/2 z-10">
                                <Badge variant="success" className="mb-6 px-4 py-1.5"><MapPin className="w-3 h-3 mr-2" /> Anti Titip Absen</Badge>
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Absen Akurat <br /> Pas di Lokasi.</h3>
                                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                                    Nggak ada lagi cerita "titip absen". Sistem Geofencing GPS kita bakal nge-lock mutlak posisimu nyampe ke radius koordinat acara beneran baru tombol check-in/out bisa dipencet. GG kan?
                                </p>

                            </div>

                            {/* PLACEHOLDER MOCKUP 1 */}
                            <div className="md:w-1/2 relative h-[280px] w-full flex justify-center items-center">
                                {/* GANTI KOTAK INI DENGAN GAMBAR FITUR 1 */}
                                <img src="/images/feature_geofencing.png" alt="Ilustrasi Geofencing" className="w-[85%] h-auto rounded-[2rem] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        </motion.div>

                        {/* Feature Block 2: Manajemen Histori Dinamis */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
                            className="bg-[#F0FDF4] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row-reverse items-center justify-between gap-12 border border-emerald-50 overflow-hidden group"
                        >
                            <div className="md:w-1/2 z-10">
                                <Badge variant="success" className="mb-6 px-4 py-1.5"><Clock className="w-3 h-3 mr-2" /> Rekap Histori</Badge>
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Riwayat Transparan <br /> & Valid.</h3>
                                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                    Panitia nggak usah pusing rekap manual lagi. Semua riwayat kehadiran ditampilin real-time jam masuk/keluarnya dengan sangat detail, jadinya rekap kedisiplinan anggota auto-sah.
                                </p>
                                <div className="flex gap-3 flex-wrap">
                                    <Badge className="bg-emerald-100 text-emerald-700">Waktu Masuk & Keluar</Badge>
                                    <Badge className="bg-amber-100 text-amber-700">Status Kehadiran</Badge>
                                    <Badge className="bg-blue-100 text-blue-700">Export Rekap</Badge>
                                </div>
                            </div>

                            {/* PLACEHOLDER MOCKUP 2 */}
                            <div className="md:w-1/2 relative h-[280px] w-full flex justify-center items-center">
                                {/* GANTI KOTAK INI DENGAN GAMBAR FITUR 2 */}
                                <img src="/images/feature_history.png" alt="Ilustrasi Histori Dinamis" className="w-[85%] h-auto rounded-[2rem] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        </motion.div>

                        {/* Feature Block 3: Offline Resilience */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
                            className="bg-[#F0FDF4] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-emerald-50 relative group overflow-hidden"
                        >
                            <div className="md:w-1/2 z-10">
                                <Badge variant="success" className="mb-6 px-4 py-1.5"><WifiOff className="w-3 h-3 mr-2" /> Kebal Offline</Badge>
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Sinyal Ilang?<br /> Tetep Gass Absen!</h3>
                                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                                    Lagi di spot susah sinyal? Chill aja. Mode Offline kita bakal nyimpen absenmu sementara di HP, dan auto-kirim ke server begitu internetnya balik. Nggak ada alasan buat nggak absen!
                                </p>
                            </div>

                            {/* PLACEHOLDER MOCKUP 3 */}
                            <div className="md:w-1/2 relative h-[280px] w-full flex justify-center items-center">
                                {/* GANTI KOTAK INI DENGAN GAMBAR FITUR 3 */}
                                <img src="/images/feature_offline.png" alt="Ilustrasi Offline Resilience" className="w-[85%] h-auto rounded-[2rem] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105" />
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
                                Kenapa Harus <br /> Pilih PASTII?
                            </h2>
                            <p className="text-emerald-50 text-lg leading-relaxed mb-10 opacity-90">
                                Aplikasi ini kita rancang seringan dan se-smooth mungkin biar enak dipake. Fiturnya sekelas pro, tapi UI tetep simpel dan bikin betah.
                            </p>
                        </div>

                        <div className="lg:w-7/12 flex flex-col gap-5">
                            {[
                                { icon: <Fingerprint />, title: "Privasi Akun Super Aman", desc: "Cuma kamu doang yang bisa ngakses data absenmu karena butuh sidik jari atau Face ID. Dijamin nggak gampang dibajak temen!" },
                                { icon: <ShieldCheck />, title: "Tamat Sudah Titip Absen", desc: "Sistem cerdas kita bisa ngebaca siapa aja yang bohong. Ketauan nongkrong di kos, tapi nyoba absen? Auto ditolak sama aplikasinya." },
                                { icon: <Calendar />, title: "Panitia Juga Ikut Nyantai", desc: "Nggak perlu lagi ngurus Excel atau kertas ribet. Panitia gampang banget bikin jadwal mingguan dan misahin daftar hadir antardivisi." },
                                { icon: <BatteryMedium />, title: "HP Kentang Approved", desc: "Tenang, buka PASTII nggak bakal nyedot baterai atau bikin nge-lag. Semuanya kerasa lincah walau dipakai seharian full." }
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
                            Fitur Ekstra yang <span className="text-emerald-500">Bikin Paham</span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Detail-detail kecil ini sengaja kita taruh biar ngurus acara tuh kerasa gampang tanpa drama lupa-lupaan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Bell />, title: "Notif Anti Ketinggalan", desc: "HP kamu bakal nerima notifikasi otomatis sebelum acara dimulai. Nggak ada ceritanya absen telat gara-gara kelupaan cuy!" },
                            { icon: <Map />, title: "Maps Anti Nyasar", desc: "Disiapin fitur peta yang nuntun kamu persis ke lokasi acara. Dan yang pasti, udah diatur khusus biar navigasinya hemat kuota." },
                            { icon: <LayoutDashboard />, title: "Tampilan Super Mulus", desc: "Pindah-pindah menu kerasa sat-set banget. Nggak ada lagi drama nungguin loading lama atau aplikasi mendadak lemot." }
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
                            <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 mb-6 border-none">Tech Stack Kelas Atas</Badge>
                            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Di-build Pake Tech yang Lagi Hype.</h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-0">
                                Bangga dong aplikasinya dilancarkan pake formasi tekno yang mantul banget biar responsif, cepet banget, dan server tetep tangguh walau diserbu serentak.
                            </p>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 z-10 w-full">
                            {[
                                { label: "Flutter (SDK)", icon: <Smartphone /> },
                                { label: "Supabase (DB/Auth)", icon: <Database /> },
                                { label: "Deno Edge Functions", icon: <ServerCog /> },
                                { label: "FCM Push Notif", icon: <CloudLightning /> },
                                { label: "Riverpod State", icon: <FolderSync /> },
                                { label: "Maps & Geolocation", icon: <Map /> }
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
                                FAQ Buat Kamu yang <br className="hidden lg:block" /> Suka Kepo
                            </h2>
                            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                                Pertanyaan-pertanyaan yang sering nongol dikalangan mahasiswa soal sistem GPS, trik pas sinyal jelek, atau efisiensi baterai. Let's bahas bareng.
                            </p>
                        </div>

                        <div className="lg:w-7/12 flex flex-col border-t border-slate-200">
                            <FAQItem
                                question="Apakah aplikasi ini benar-benar bisa mencegah praktik titip absen?"
                                answer="Tentu! PASTII memadukan validasi radius lokasi (Geofencing GPS) yang memastikan kamu benar-benar berada di titik acara, serta ditambahkan verifikasi Biometrik (Sidik Jari/Face ID) untuk perlindungan ganda pada akunmu."
                            />
                            <FAQItem
                                question="Saya pengguna iPhone (iOS), apakah tetap bisa menggunakan PASTII?"
                                answer="Sangat bisa! Meskipun saat ini platform utamanya berfokus pada ekosistem Android, para pengguna iPhone atau PC tetap dapat melakukan presensi dengan lancar melalui versi Web App PASTII dari browser Safari atau Chrome."
                            />
                            <FAQItem
                                question="Apakah fitur pelacak lokasi dan peta akan membuat baterai HP cepat habis?"
                                answer="Tidak sama sekali. Modul navigasi peta didesain sangat efisien. Peta akan ditampilkan secara statis (Read-only) pada menu riwayat. Sedangkan fitur Live Tracker GPS hanya akan menyala singkat saat kamu menekan tombol Check-In/Check-Out."
                            />
                            <FAQItem
                                question="Apakah saya harus sering membuka aplikasi untuk mengingat jadwal kegiatan?"
                                answer="Tidak perlu repot. PASTII secara otomatis siap memberikan Push Notification pintar ke HP kamu berkat dukungan infrastruktur Cloud. Kamu bakal menerima bunyi/pesan pengingat sesaat sebelum suatu event HIMA-TI berlangsung."
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
                                    INOVASI TERINTEGRASI <Zap className="w-10 h-10 inline text-emerald-300 fill-emerald-300" />
                                </span>
                                <span className="text-4xl md:text-6xl font-black text-emerald-500/20 tracking-tighter uppercase select-none">UNTUK KEMAJUAN HIMA-TI UNIKU</span>
                                <span className="text-emerald-300"><Zap className="w-12 h-12" /></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9. CONTACT HIMA-TI SECTION */}
                <section id="kontak" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                        className="bg-slate-900 rounded-[3rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Hubungi HIMA-TI</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Temukan informasi pembaruan terbaru, ajukan pertanyaan, saran, dan tawaran kolaborasi langsung ke kanal resmi HIMA-TI Universitas Kuningan.
                            </p>
                        </div>
                        <div className="lg:w-1/2 flex flex-col sm:flex-row justify-center lg:justify-end relative z-10 gap-4 w-full">
                            <a href="https://instagram.com/hima.ti.uniku" target="_blank" rel="noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-200 bg-white/10 border border-white/20 text-white hover:bg-emerald-500 hover:border-emerald-500 h-14 px-6 md:px-8">
                                @hima.ti.uniku
                            </a>
                            <a href="mailto:hima.ti@uniku.ac.id" className="inline-flex w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-all duration-200 bg-emerald-500 text-white hover:bg-emerald-400 h-14 px-6 md:px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1">
                                Email Kami
                            </a>
                        </div>
                    </motion.div>
                </section>
            </main>

            {/* DOWNLOAD MODAL */}
            <AnimatePresence>
                {showDownloadModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowDownloadModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden flex flex-col"
                        >
                            <button onClick={() => setShowDownloadModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="p-8 pb-4 text-center bg-gradient-to-br from-emerald-50 to-white relative">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner rotate-3">
                                    <Download className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Unduh PASTII</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">Pilih preferensi sistem yang Anda gunakan untuk memulai.</p>
                            </div>

                            <div className="p-6 pt-2 flex flex-col gap-3">
                                <a href="/downloads/pastii-beta-release.apk" className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-400 transition-all group group-hover:shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                                            <Smartphone className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-slate-900">Android APK</h4>
                                            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Direkomendasikan • Os 8.0+</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                                </a>

                                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed relative overflow-hidden">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-200/50 rounded-lg flex items-center justify-center text-slate-400">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-slate-500">Web App (PWA)</h4>
                                                <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Coming Soon</span>
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Dukungan pengguna iOS / PC</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* FOOTER */}
            <footer className="bg-white py-16 border-t border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img src={appLogo} alt="Logo PASTII" className="h-12 w-auto object-contain drop-shadow-sm" />
                                <span className="text-2xl font-black tracking-tight text-slate-900">PASTII<span className="text-emerald-500">.</span></span>
                            </div>
                            <p className="text-slate-500 max-w-xs font-medium">Platform presensi digital tepercaya, dirancang khusus untuk memfasilitasi administrasi event HIMA-TI UNIKU.</p>
                        </div>

                        <div className="text-left md:text-right">
                            <h4 className="font-extrabold text-slate-900 text-xl mb-4">Bikin Organisasimu Makin Rapi, <br className="hidden md:block" /> Mulai Dari Disiplin Nge-Tap Absen.</h4>
                            <Button onClick={() => isReleased ? setShowDownloadModal(true) : window.location.href = '#kontak'} className="bg-[#10B981] shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5">Cobain Sekarang Kuy</Button>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-semibold text-slate-500">
                        <p className="text-slate-400">Dibuat dengan ❤️ oleh Divisi Ilmu Pengetahuan & Teknologi HIMA-TI UNIKU &copy; 2026</p>
                        <div className="flex gap-6 flex-wrap justify-center">
                            <a href="#kontak" className="hover:text-emerald-600 transition-colors">Kontak Bantuan</a>
                            <a href="https://instagram.com/himatiuniku" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">Instagram</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
