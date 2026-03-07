import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  Volume2, 
  VolumeX, 
  Mail,
  ChevronDown,
  MapPin,
  Gift,
  Copy,
  CheckCircle2,
  CreditCard,
  Camera
} from 'lucide-react';

// --- KOMPONEN MANDALA KERAWANG GAYO MURNI SVG ---
const KerawangMandala = ({ className }) => {
  const rotations = (count) => Array.from({ length: count }, (_, i) => i * (360 / count));

  return (
    <svg viewBox="0 0 500 500" className={`animate-[spin_40s_linear_infinite] ${className}`}>
      <g transform="translate(250, 250)">
        {/* 1. Duri Luar (Pucuk Rebung Kuning) */}
        {rotations(72).map(deg => (
          <polygon key={`spike-${deg}`} points="-3,-220 3,-220 0,-245" fill="#D4AF37" transform={`rotate(${deg})`} />
        ))}
        {rotations(72).map(deg => (
          <polygon key={`spike2-${deg}`} points="-1,-220 1,-220 0,-235" fill="#FFF" transform={`rotate(${deg + 2.5})`} />
        ))}

        {/* 2. Lingkaran Dasar Merah (Kerawang) */}
        <circle r="220" fill="#9B111E" />

        {/* 3. Motif Kotak (Emun / Spiral) */}
        {rotations(16).map((deg, i) => (
          <g key={`sq-${deg}`} transform={`rotate(${deg}) translate(0, -190)`}>
            <rect x="-16" y="-16" width="32" height="32" fill="#111" />
            <rect x="-12" y="-12" width="24" height="24" fill={i % 2 === 0 ? "#1E5631" : "#D4AF37"} />
            <circle cx="0" cy="0" r="5" fill="#FFF" />
          </g>
        ))}
        
        {/* Pembatas Hitam Tipis */}
        <circle r="165" fill="none" stroke="#111" strokeWidth="4" />

        {/* 4. Motif Segitiga Dalam (Pegar / Mata Itik) */}
        <circle r="160" fill="#111" />
        {rotations(24).map((deg, i) => {
          const colors = ["#1E5631", "#FFF", "#9B111E", "#D4AF37"];
          return (
            <polygon key={`tri-${deg}`} points="-15,-160 15,-160 0,-130" fill={colors[i % 4]} transform={`rotate(${deg})`} />
          );
        })}

        {/* 5. Motif Lingkaran Merah dengan Awan Kuning (Emun Berangkat) */}
        <circle r="130" fill="#9B111E" />
        {rotations(12).map(deg => (
          <path key={`emun-${deg}`} d="M -20 -115 C -30 -135, 30 -135, 20 -115 C 15 -100, -15 -100, -20 -115 Z" fill="#D4AF37" transform={`rotate(${deg})`} />
        ))}

        {/* 6. Ring Berlapis Hitam & Kuning */}
        <circle r="95" fill="#111" />
        {rotations(36).map(deg => (
          <circle key={`dot-${deg}`} cx="0" cy="-88" r="3" fill="#D4AF37" transform={`rotate(${deg})`} />
        ))}

        {/* 7. Inti Kerawang (Warna-warni berselang-seling) */}
        <circle r="80" fill="#9B111E" />
        {rotations(8).map((deg, i) => {
          const colors = ["#1E5631", "#FFF", "#D4AF37", "#9B111E"];
          return (
             <path key={`core-${deg}`} d="M -20 -75 L 20 -75 L 15 -55 L -15 -55 Z" fill={colors[i % 4]} transform={`rotate(${deg})`} />
          );
        })}

        {/* 8. Pusat Matahari (Sunburst) */}
        <circle r="50" fill="#FFF" />
        {rotations(36).map(deg => (
          <line key={`line-${deg}`} x1="0" y1="0" x2="0" y2="-45" stroke="#9B111E" strokeWidth="2.5" transform={`rotate(${deg})`} />
        ))}
        <circle r="18" fill="#D4AF37" />
        <circle r="8" fill="#FFF" />
      </g>
    </svg>
  );
};

// --- KOMPONEN PITA LURUS KERAWANG GAYO ---
const GayoStrip = ({ className }) => (
  <div className={`w-full h-2 ${className}`} style={{
    background: 'repeating-linear-gradient(90deg, #111 0%, #111 20%, #FFF 20%, #FFF 40%, #9B111E 40%, #9B111E 60%, #1E5631 60%, #1E5631 80%, #D4AF37 80%, #D4AF37 100%)',
    backgroundSize: '50px 100%'
  }}></div>
);

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedBank, setCopiedBank] = useState(false);
  
  // State baru untuk menyimpan nama tamu
  const [guestName, setGuestName] = useState('');
  
  const audioRef = useRef(null);
  const weddingDate = new Date('2026-04-02T08:00:00').getTime();

  useEffect(() => {
    // Membaca parameter '?to=Nama+Tamu' dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to');
    if (toParam) {
      setGuestName(toParam);
    }

    // Timer Hitung Mundur
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    // Animasi Reveal saat scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach((elem) => observer.observe(elem));

    return () => { clearInterval(timer); observer.disconnect(); };
  }, [isOpened]);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.play().catch(e => console.log("Autoplay ditahan", e));
    setTimeout(() => { window.scrollTo({ top: document.getElementById('hero').offsetTop, behavior: 'smooth' }); }, 100);
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  // --- HALAMAN SAMPUL ---
  if (!isOpened) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center relative overflow-hidden">
        {/* Latar Belakang Mandala Gayo yang Berputar */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none mix-blend-screen">
          <KerawangMandala className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] opacity-40" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#111111]/80 to-black/80 z-0"></div>
        
        <div className="z-10 text-center px-0 w-full max-w-lg mx-auto flex flex-col items-center animate-fade-in-slow">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden w-full mx-6 transform transition-transform hover:scale-[1.02] duration-500">
            
            <GayoStrip />
            
            <div className="p-10 md:p-14 flex flex-col items-center">
              <Heart className="w-8 h-8 text-[#9B111E] mb-6 animate-pulse-slow opacity-90" />
              <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-4 font-light">The Wedding Of</p>
              <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg">Aluqmana <br/><span className="text-3xl italic font-light text-[#9B111E]">&</span><br/> Fitria</h1>
              
              <div className="w-12 h-px bg-[#D4AF37]/50 mb-6"></div>
              
              <p className="text-gray-300 text-sm font-light tracking-wide mb-2">Kepada Yth. Bapak/Ibu/Saudara/i,</p>
              {/* Logika untuk menampilkan nama tamu jika ada di URL */}
              {guestName ? (
                <p className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-8 drop-shadow-md capitalize">
                  {guestName}
                </p>
              ) : (
                <p className="text-xl font-serif text-[#D4AF37] mb-8 drop-shadow-md opacity-50">
                  Tamu Undangan
                </p>
              )}
              
              <button 
                onClick={handleOpenInvitation}
                className="group relative px-8 py-4 bg-[#9B111E]/10 text-[#D4AF37] border border-[#9B111E]/50 rounded-full hover:bg-[#9B111E] hover:text-white transition-all duration-500 flex items-center gap-3 overflow-hidden shadow-[0_0_15px_rgba(155,17,30,0.3)] hover:shadow-[0_0_25px_rgba(155,17,30,0.6)]"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <Mail className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                <span className="text-sm uppercase tracking-widest relative z-10 font-medium">Buka Undangan</span>
              </button>
            </div>

            <GayoStrip />
          </div>
        </div>
      </div>
    );
  }

  // --- HALAMAN UTAMA ---
  return (
    <div className="font-sans text-white bg-[#111111] min-h-screen selection:bg-[#9B111E]/50 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', 'Baskerville', Georgia, serif; }
        .animate-fade-in-slow { animation: fadeIn 2s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .reveal-on-scroll { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.5, 0, 0, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #111111; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
      `}} />

      {/* Audio Element */}
      <audio ref={audioRef} src="/YoungandBeautiful.mp3" loop />

      {/* Floating Buttons Container (Disesuaikan tanpa tiket) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="#gift" className="p-4 bg-[#9B111E] text-white rounded-full shadow-lg hover:bg-[#D4AF37] transition-all duration-300 hover:scale-110 flex items-center justify-center" title="Amplop Digital">
          <Gift className="w-5 h-5" />
        </a>
        <button onClick={toggleMusic} className="p-4 bg-[#1a1a1a]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 rounded-full shadow-lg hover:bg-[#111] transition-transform duration-300 hover:scale-110 flex items-center justify-center" title="Putar/Jeda Musik">
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse-slow" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Latar Belakang Mandala di Hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 mix-blend-screen z-0">
          <KerawangMandala className="w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] text-white/10" />
        </div>
        <div className="absolute inset-0 bg-[#111111]/60 z-0"></div>

        <div className="relative z-10 text-center px-4 w-full mt-20">
          <p className="text-[#D4AF37] tracking-[0.4em] text-xs md:text-sm mb-6 uppercase reveal-on-scroll font-medium drop-shadow-md">We Are Getting Married</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl reveal-on-scroll delay-100">Aluqmana <br/><span className="text-3xl md:text-5xl font-light italic text-[#9B111E]">&</span><br/> Fitria</h1>
          
          <div className="w-px h-12 bg-gradient-to-b from-[#9B111E] to-transparent mx-auto my-6 reveal-on-scroll delay-200"></div>
          
          {/* TANGGAL TIPOGRAFI */}
          <div className="flex items-center justify-center gap-6 mb-12 reveal-on-scroll delay-200">
            <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-base font-light">Kamis</span>
            <div className="text-6xl md:text-7xl font-serif text-white leading-none drop-shadow-lg">02</div>
            <div className="flex flex-col text-left border-l border-[#9B111E] pl-6">
              <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-base mb-1">April</span>
              <span className="text-white/60 tracking-[0.3em] uppercase text-xs md:text-sm">2026</span>
            </div>
          </div>
          
          {/* Countdown Timer with Gayo Accents */}
          <div className="flex justify-center gap-4 md:gap-8 text-white mb-16 reveal-on-scroll delay-300">
            {[
              { label: 'Hari', value: timeLeft.days, color: 'border-[#9B111E]' },
              { label: 'Jam', value: timeLeft.hours, color: 'border-[#D4AF37]' },
              { label: 'Menit', value: timeLeft.minutes, color: 'border-[#1E5631]' },
              { label: 'Detik', value: timeLeft.seconds, color: 'border-white/30' }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center bg-[#1a1a1a]/60 backdrop-blur-md w-16 h-20 md:w-24 md:h-28 justify-center rounded-lg border-b-4 ${item.color} shadow-2xl relative overflow-hidden group hover:bg-[#1a1a1a] transition-colors`}>
                <span className="text-2xl md:text-4xl font-serif mb-1 relative z-10 text-white">{item.value}</span>
                <span className="text-[9px] md:text-xs tracking-widest uppercase text-gray-400 relative z-10">{item.label}</span>
              </div>
            ))}
          </div>

          <a href="#quote" className="inline-flex flex-col items-center text-white/50 hover:text-[#D4AF37] transition-colors reveal-on-scroll delay-300 cursor-pointer">
            <span className="text-[10px] mb-2 uppercase tracking-[0.2em]">Scroll Kebawah</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </section>
      
      {/* QUOTE SECTION DENGAN MANDALA KIRI KANAN */}
      <section id="quote" className="py-24 px-6 bg-[#1a1a1a] relative flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#D4AF37]/20">
        <div className="absolute -left-32 -top-32 opacity-10 pointer-events-none">
          <KerawangMandala className="w-96 h-96" />
        </div>
        <div className="absolute -right-32 -bottom-32 opacity-10 pointer-events-none">
          <KerawangMandala className="w-96 h-96" />
        </div>

        <div className="max-w-3xl mx-auto reveal-on-scroll my-12 relative z-10">
          <Heart className="w-8 h-8 text-[#9B111E] mx-auto mb-8 opacity-80" />
          <p className="text-xl md:text-2xl font-serif leading-loose text-white/90 italic">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."
          </p>
          <p className="mt-8 text-sm tracking-[0.3em] text-[#D4AF37] uppercase font-medium">— Ar-Rum: 21 —</p>
        </div>
      </section>

      {/* 2. COUPLE SECTION */}
      <section id="couple" className="py-24 px-6 bg-[#111111] relative border-y border-white/5 overflow-hidden">
        {/* Ornamen Latar Tipis */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-full flex justify-center">
           <KerawangMandala className="w-[800px] h-[800px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20 reveal-on-scroll">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">Sang Mempelai</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Groom & Bride</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            {/* Groom */}
            <div className="flex flex-col items-center text-center reveal-on-scroll w-full md:w-1/3">
              <div className="w-64 h-[400px] mb-8 overflow-hidden rounded-t-full shadow-[0_0_30px_rgba(155,17,30,0.2)] relative group p-2 border border-[#9B111E]/50 bg-[#1a1a1a]">
                <img src="https://images3.alphacoders.com/133/thumb-1920-1339467.png" alt="Groom" className="w-full h-full object-cover rounded-t-full transition-transform duration-[2s] group-hover:scale-110" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-2">A W Aluqmana</h3>
              <p className="text-[#D4AF37] text-sm mb-4 font-medium tracking-wider">S.Farm.</p>
              <div className="w-8 h-px bg-[#9B111E] mx-auto mb-4"></div>
              <p className="text-white/50 text-sm">Putra Pertama dari</p>
              <p className="text-white/80 font-medium text-sm mt-1">Bpk. Malikun & Ibu Erni</p>
            </div>

            <div className="text-4xl font-serif text-[#D4AF37]/40 md:translate-y-[-50px] reveal-on-scroll delay-100">&</div>

            {/* Bride */}
            <div className="flex flex-col items-center text-center reveal-on-scroll delay-200 w-full md:w-1/3">
              <div className="w-64 h-[400px] mb-8 overflow-hidden rounded-t-full shadow-[0_0_30px_rgba(212,175,55,0.1)] relative group p-2 border border-[#D4AF37]/50 bg-[#1a1a1a]">
                <img src="https://images5.alphacoders.com/134/thumb-1920-1340473.png" alt="Bride" className="w-full h-full object-cover rounded-t-full transition-transform duration-[2s] group-hover:scale-110" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-2">Fitria Azzahra</h3>
              <p className="text-[#D4AF37] text-sm mb-4 font-medium tracking-wider">S.Farm.</p>
              <div className="w-8 h-px bg-[#9B111E] mx-auto mb-4"></div>
              <p className="text-white/50 text-sm">Putri Bungsu dari</p>
              <p className="text-white/80 font-medium text-sm mt-1">Bpk. Haryanto & Ibu Ningsih</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT DETAILS (Kartu Beraksen Gayo) */}
      <section className="py-24 px-6 bg-[#1a1a1a] relative border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Waktu & Tempat</h2>
            <p className="text-white/60 max-w-lg mx-auto leading-relaxed">Dengan memohon rahmat Allah SWT, kami mengharapkan kehadiran Bapak/Ibu pada acara pernikahan kami.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { title: 'Akad Nikah', time: '08:00 - 10:00 WIB', color: 'from-[#9B111E]/20' },
              { title: 'Resepsi', time: '11:00 - 14:00 WIB', color: 'from-[#1E5631]/20' }
            ].map((event, i) => (
              <div key={i} className={`bg-[#111111] p-0 shadow-2xl border border-white/5 text-center reveal-on-scroll rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 ${i === 1 ? 'delay-100' : ''}`}>
                <GayoStrip />
                <div className={`absolute inset-0 bg-gradient-to-b ${event.color} to-transparent opacity-30`}></div>
                
                <div className="relative z-10 p-10 md:p-12">
                  <h3 className="text-3xl font-serif text-[#D4AF37] mb-8">{event.title}</h3>
                  <div className="flex flex-col items-center justify-center mb-8">
                    <div className="bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-xl p-4 w-32 shadow-sm">
                      <p className="text-[#9B111E] text-[10px] tracking-widest uppercase mb-1">Kamis</p>
                      <p className="text-4xl font-serif text-white mb-1">02</p>
                      <p className="text-white/60 text-xs tracking-widest uppercase">April 2026</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mb-10">
                    <Clock className="w-5 h-5 mb-2 text-[#D4AF37]" />
                    <p className="tracking-widest font-medium text-white/80">{event.time}</p>
                  </div>
                  <a href="https://maps.app.goo.gl/fEFo4M7WRv4g13wX6" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#111] font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-lg hover:shadow-[#D4AF37]/30">
                    <MapPin className="w-4 h-4" /> Buka Peta Lokasi
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIGITAL GIFT (NOMOR REKENING) */}
      <section id="gift" className="py-24 px-6 bg-[#1a1a1a] text-white text-center relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#9B111E]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 reveal-on-scroll">
          <Gift className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Wedding Gift</h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto font-light">
            Doa restu Anda merupakan karunia yang sangat berarti. Namun jika Anda bermaksud memberikan tanda kasih secara digital, Anda dapat mengirimkannya melalui:
          </p>

          <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 md:p-10 rounded-3xl border border-[#D4AF37]/30 max-w-md mx-auto shadow-[0_10px_40px_rgba(212,175,55,0.08)] relative overflow-hidden group hover:border-[#D4AF37] transition-all duration-500">
            <div className="absolute -right-10 -top-10 opacity-5"><CreditCard className="w-48 h-48 text-[#D4AF37]" /></div>
            <div className="relative z-10 text-left">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[#D4AF37] font-serif italic text-xl">Mandiri</span>
                <span className="text-xs tracking-[0.2em] text-[#9B111E] font-bold uppercase">Bank Transfer</span>
              </div>
              <p className="text-3xl md:text-4xl font-mono tracking-widest mb-4 text-white drop-shadow-md">1234 567 890</p>
              <p className="text-sm text-white/50 uppercase tracking-widest mb-8">A.N. Aluqmana</p>
              <button 
                onClick={() => copyToClipboard('1234567890')}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold tracking-[0.2em] text-xs uppercase overflow-hidden relative ${copiedBank ? 'bg-[#1E5631]/20 text-[#1E5631] border border-[#1E5631]/50' : 'bg-[#D4AF37] text-[#111] hover:bg-white border border-transparent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'}`}
              >
                {copiedBank ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedBank ? 'Berhasil Disalin' : 'Salin Rekening'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-[#111111] text-center border-t border-white/10 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 reveal-on-scroll flex flex-col items-center relative z-10">
          <p className="text-[#D4AF37] text-3xl mb-8 opacity-80 font-serif">A & F</p>
          <p className="text-white/50 text-sm leading-relaxed mb-10 font-light italic">
            "Terima kasih atas doa restu dan kehadiran Anda."
          </p>
          <div className="w-24 h-px bg-[#D4AF37]/30 mx-auto mb-8"></div>
        </div>
      </footer>
    </div>
  );
}