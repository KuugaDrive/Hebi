import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  Volume2, 
  VolumeX, 
  Camera, 
  Mail,
  ChevronDown,
  MapPin,
  Send,
  QrCode,
  Gift,
  Copy,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // States untuk Interaktivitas Baru
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('Hadir');
  const [showTicket, setShowTicket] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  
  const audioRef = useRef(null);
  const weddingDate = new Date('2026-04-02T08:00:00').getTime();

  useEffect(() => {
    // Timer Hitung Mundur
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    // Animasi Muncul saat Scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach((elem) => {
      observer.observe(elem);
    });

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [isOpened]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay ditahan", e));
    }
    setTimeout(() => {
      window.scrollTo({ top: document.getElementById('hero').offsetTop, behavior: 'smooth' });
    }, 100);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (rsvpName.trim() === '') return;
    setShowTicket(true);
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
    } catch (err) {
      console.error('Gagal menyalin', err);
    }
    document.body.removeChild(textArea);
  };

  // --- HALAMAN SAMPUL ---
  if (!isOpened) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center relative overflow-hidden">
        {/* Background Layer */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?auto=compress&cs=tinysrgb&w=2000)' }}
        ></div>
        
        {/* Floating Particles Animation */}
        <div className="absolute inset-0 z-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div key={i} 
                 className="absolute rounded-full bg-white animate-float"
                 style={{
                   width: Math.random() * 4 + 1 + 'px',
                   height: Math.random() * 4 + 1 + 'px',
                   left: Math.random() * 100 + '%',
                   top: Math.random() * 100 + '%',
                   animationDuration: Math.random() * 10 + 5 + 's',
                   animationDelay: Math.random() * 5 + 's'
                 }}>
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-0"></div>
        
        <div className="z-10 text-center px-6 w-full max-w-lg mx-auto flex flex-col items-center animate-fade-in-slow backdrop-blur-sm bg-black/20 p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <Heart className="w-8 h-8 text-[#D4AF37] mb-6 animate-pulse-slow opacity-80" />
          <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-4 font-light">The Wedding Of</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg">Aluqmana <br/><span className="text-3xl italic font-light text-[#D4AF37]">&</span><br/> Fitria</h1>
          
          <div className="w-12 h-px bg-[#D4AF37]/50 mb-8"></div>
          <p className="text-gray-300 text-sm mb-10 font-light tracking-wide">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          
          <button 
            onClick={handleOpenInvitation}
            className="group relative px-8 py-4 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-500 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <Mail className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
            <span className="text-sm uppercase tracking-widest relative z-10 font-medium">Buka Undangan</span>
          </button>
        </div>
      </div>
    );
  }

  // --- HALAMAN UTAMA ---
  return (
    <div className="font-sans text-[#2C302E] bg-[#F9F7F3] min-h-screen selection:bg-[#D4AF37]/30 selection:text-[#2C302E]">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', 'Baskerville', Georgia, serif; }
        
        .animate-fade-in-slow { animation: fadeIn 2s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F9F7F3; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
      `}} />

      <audio ref={audioRef} src="/YoungandBeautiful.mp3" loop />
>
      </div>

      {/* 1. HERO SECTION (Parallax) */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* bg-fixed creates the parallax effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1172849/pexels-photo-1172849.jpeg?auto=compress&cs=tinysrgb&w=2000)' }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 text-center px-4 w-full mt-20">
          <p className="text-[#D4AF37] tracking-[0.4em] text-xs md:text-sm mb-6 uppercase reveal-on-scroll font-medium shadow-black drop-shadow-md">We Are Getting Married</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl reveal-on-scroll delay-100">Aluqmana <br/><span className="text-3xl md:text-5xl font-light italic text-[#D4AF37]">&</span><br/> Fitria</h1>
          
          <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto my-8 reveal-on-scroll delay-200"></div>
          
          <p className="text-white text-sm md:text-base tracking-[0.2em] uppercase mb-12 reveal-on-scroll delay-200 drop-shadow-md">Kamis, 2 April 2026</p>
          
          <div className="flex justify-center gap-4 md:gap-8 text-white mb-16 reveal-on-scroll delay-300">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/10 backdrop-blur-md w-16 h-20 md:w-24 md:h-28 justify-center rounded-2xl border border-white/20 shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-2xl md:text-4xl font-serif mb-1 relative z-10">{item.value}</span>
                <span className="text-[9px] md:text-xs tracking-widest uppercase text-white/70 relative z-10">{item.label}</span>
              </div>
            ))}
          </div>

          <a href="#quote" className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors reveal-on-scroll delay-300">
            <span className="text-[10px] mb-2 uppercase tracking-[0.2em]">Scroll Kebawah</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section id="quote" className="py-24 px-6 bg-[#F9F7F3] relative flex items-center justify-center text-center">
        <div className="max-w-3xl mx-auto reveal-on-scroll">
          <Heart className="w-8 h-8 text-[#D4AF37] mx-auto mb-8 opacity-80" />
          <p className="text-xl md:text-2xl font-serif leading-loose text-[#2C302E] italic">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."
          </p>
          <p className="mt-8 text-sm tracking-[0.3em] text-[#D4AF37] uppercase font-medium">— Ar-Rum: 21 —</p>
        </div>
      </section>

      {/* 2. COUPLE SECTION */}
      <section id="couple" className="py-24 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 reveal-on-scroll">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">Sang Mempelai</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C302E]">Groom & Bride</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            {/* Groom */}
            <div className="flex flex-col items-center text-center reveal-on-scroll w-full md:w-1/3">
              <div className="w-64 h-[400px] mb-8 overflow-hidden rounded-t-full shadow-2xl relative group p-2 border border-[#D4AF37]/30 bg-[#F9F7F3]">
                <img 
                  src="https://images3.alphacoders.com/133/thumb-1920-1339467.png" 
                  alt="Groom" 
                  className="w-full h-full object-cover rounded-t-full transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <h3 className="text-3xl font-serif text-[#2C302E] mb-2">A W Aluqmana</h3>
              <p className="text-[#D4AF37] text-sm mb-4 font-medium tracking-wider">S.Farm.</p>
              <p className="text-[#2C302E]/60 text-sm">Putra Pertama dari</p>
              <p className="text-[#2C302E] font-medium text-sm mt-1">Bpk. Malikun & Ibu Erni</p>
            </div>

            <div className="text-4xl font-serif text-[#D4AF37]/40 md:translate-y-[-50px] reveal-on-scroll delay-100">&</div>

            {/* Bride */}
            <div className="flex flex-col items-center text-center reveal-on-scroll delay-200 w-full md:w-1/3">
              <div className="w-64 h-[400px] mb-8 overflow-hidden rounded-t-full shadow-2xl relative group p-2 border border-[#D4AF37]/30 bg-[#F9F7F3]">
                <img 
                  src="https://images5.alphacoders.com/134/thumb-1920-1340473.png" 
                  alt="Bride" 
                  className="w-full h-full object-cover rounded-t-full transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <h3 className="text-3xl font-serif text-[#2C302E] mb-2">Fitria Azzahra</h3>
              <p className="text-[#D4AF37] text-sm mb-4 font-medium tracking-wider">S.Farm.</p>
              <p className="text-[#2C302E]/60 text-sm">Putri Bungsu dari</p>
              <p className="text-[#2C302E] font-medium text-sm mt-1">Bpk. Haryanto & Ibu Ningsih</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT DETAILS */}
      <section className="py-24 px-6 bg-[#F9F7F3] relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C302E] mb-6">Waktu & Tempat</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { title: 'Akad Nikah', time: '08:00 - 10:00 WIB' },
              { title: 'Resepsi', time: '11:00 - 14:00 WIB' }
            ].map((event, i) => (
              <div key={i} className={`bg-white p-10 md:p-12 shadow-xl border border-[#D4AF37]/20 text-center reveal-on-scroll rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 ${i === 1 ? 'delay-100' : ''}`}>
                <div className="absolute inset-0 bg-[#D4AF37]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif text-[#2C302E] mb-8">{event.title}</h3>
                  <div className="space-y-6 text-[#2C302E]/70 mb-10">
                    <div className="flex flex-col items-center">
                      <Calendar className="w-6 h-6 mb-3 text-[#D4AF37]" />
                      <p className="font-medium text-lg">Kamis, 2 April 2026</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock className="w-6 h-6 mb-3 text-[#D4AF37]" />
                      <p className="tracking-widest font-medium">{event.time}</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/fEFo4M7WRv4g13wX6" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2C302E] text-white text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-colors shadow-lg"
                  >
                    <MapPin className="w-4 h-4" /> Buka Peta Lokasi
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

     
      {/* FOOTER */}
      <footer className="py-16 bg-[#111] text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 reveal-on-scroll">
          <p className="text-[#D4AF37] text-3xl mb-8 opacity-50 font-serif">A & F</p>
          <p className="text-white/50 text-sm leading-relaxed mb-10 font-light italic">
            "Terima kasih atas doa restu dan kehadiran Anda."
          </p>
          <div className="w-24 h-px bg-[#D4AF37]/30 mx-auto mb-8"></div>
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase">Built for Smart Glasses Verification</p>
        </div>
      </footer>
    </div>
  );
}