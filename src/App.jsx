import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Volume2, 
  VolumeX, 
  Gift, 
  Camera, 
  Mail,
  ChevronDown,
  Copy,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('Hadir');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [wishes, setWishes] = useState([
    { name: 'Budi & Keluarga', status: 'Hadir', message: 'Selamat menempuh hidup baru! Semoga samawa ya.' },
    { name: 'Siska', status: 'Hadir', message: 'Lancar sampai hari H kesayanganku! ❤️' }
  ]);
  const [copiedBank, setCopiedBank] = useState(false);

  // Tanggal Pernikahan (Contoh: 20 Desember 2026)
  const weddingDate = new Date('2026-04-02T08:00:00').getTime();

  useEffect(() => {
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

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Di aplikasi nyata, Anda akan mengontrol tag <audio> di sini
    // const audio = document.getElementById('bg-music');
    // if (isPlaying) audio.pause(); else audio.play();
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    window.scrollTo({ top: document.getElementById('hero').offsetTop, behavior: 'smooth' });
  };

  const submitRsvp = (e) => {
    e.preventDefault();
    if (!rsvpName || !rsvpMessage) return;
    
    setWishes([{ name: rsvpName, status: rsvpStatus, message: rsvpMessage }, ...wishes]);
    setRsvpName('');
    setRsvpMessage('');
    alert('Terima kasih atas ucapan dan konfirmasinya!');
  };

  const copyToClipboard = (text) => {
    // navigator.clipboard.writeText tidak selalu jalan di iframe, kita pakai cara ini:
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin', err);
    }
    document.body.removeChild(textArea);
  };

  if (!isOpened) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/169203/pexels-photo-169203.jpeg?_gl=1*1wtv0nn*_ga*MTAyMzAzODg3Mi4xNzcyNjAwNTM4*_ga_8JE65Q40S6*czE3NzI2MDA1MzckbzEkZzEkdDE3NzI2MDA1NDMkajU0JGwwJGgw)' }}
        ></div>
        
        <div className="z-10 text-center px-6 max-w-lg mx-auto bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-2xl animate-fade-in">
          <p className="text-rose-200 text-sm tracking-widest uppercase mb-4 font-semibold">Undangan Pernikahan</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">A W Aluqmana & Fitria Azzahra</h1>
          <p className="text-gray-200 mb-8 italic">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <button 
            onClick={handleOpenInvitation}
            className="group relative px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto overflow-hidden shadow-lg shadow-rose-600/30"
          >
            <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
            Buka Undangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-800 bg-rose-50/30 min-h-screen selection:bg-rose-200 selection:text-rose-900">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white/80 backdrop-blur-md text-rose-600 rounded-full shadow-xl shadow-rose-200/50 hover:bg-rose-50 transition-all duration-300"
      >
        {isPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* 1. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1172849/pexels-photo-1172849.jpeg?_gl=1*12mki7f*_ga*MTAyMzAzODg3Mi4xNzcyNjAwNTM4*_ga_8JE65Q40S6*czE3NzI2MDA1MzckbzEkZzEkdDE3NzI2MDA2MDgkajYwJGwwJGgw)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90"></div>
        
        <div className="relative z-10 text-center px-4 animate-slide-up">
          <p className="text-rose-300 tracking-[0.3em] text-sm md:text-base mb-6 font-medium uppercase">We Are Getting Married</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-lg">A W Aluqmana <span className="text-rose-400">&</span> Fitria Azzahra</h1>
          <p className="text-gray-300 text-lg md:text-xl mb-12">Kamis, 2 April 2026</p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 md:gap-6 text-white mb-16">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-xl border border-white/20">
                <span className="text-3xl md:text-4xl font-serif mb-1">{item.value}</span>
                <span className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>

          <a href="#couple" className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors animate-bounce">
            <span className="text-sm mb-2 uppercase tracking-widest">Scroll ke bawah</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section id="couple" className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-10 h-10 text-rose-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-6">Mempelai</h2>
          <p className="text-slate-600 mb-16 leading-relaxed max-w-2xl mx-auto italic">
            "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan di antara putra-putri kami."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* Groom */}
            <div className="flex flex-col items-center group">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 border-rose-100 shadow-xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="https://images3.alphacoders.com/133/thumb-1920-1339467.png" 
                  alt="Groom" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif text-slate-800 mb-2">A W Aluqmana, S.Farm.</h3>
              <p className="text-slate-500 text-sm">Putra Pertama dari</p>
              <p className="text-slate-700 font-medium">Bpk. Malikun & Ibu Erni</p>
            </div>

            <div className="text-4xl font-serif text-rose-300 md:translate-y-[-20px]">&</div>

            {/* Bride */}
            <div className="flex flex-col items-center group">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 border-rose-100 shadow-xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="https://images5.alphacoders.com/134/thumb-1920-1340473.png" 
                  alt="Bride" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif text-slate-800 mb-2">Fitria Azzahra, S.Farm.</h3>
              <p className="text-slate-500 text-sm">Putri Bungsu dari</p>
              <p className="text-slate-700 font-medium">Bpk. Haryanto & Ibu Ningsih</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Event Details */}
      <section className="py-24 px-6 bg-rose-50 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Waktu & Tempat</h2>
            <p className="text-slate-600">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-rose-100 text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-300"></div>
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-slate-800 mb-4">Akad Nikah</h3>
              <div className="space-y-4 text-slate-600 mb-8">
                <p className="font-medium text-lg">Kamis, 2 April 2026</p>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-rose-400" />
                  <span>08:00 - 10:00 WIB</span>
                  
                </div>
                
              </div>
                            <a 
                href="https://maps.app.goo.gl/fEFo4M7WRv4g13wX6" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-6 py-2 bg-slate-800 text-white rounded-full text-sm hover:bg-slate-700 transition-colors"
              >
                Buka Google Maps
              </a>
            </div>

            {/* Resepsi Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-rose-100 text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-400"></div>
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 group-hover:scale-110 transition-transform">
                <Music className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-slate-800 mb-4">Resepsi</h3>
              <div className="space-y-4 text-slate-600 mb-8">
                <p className="font-medium text-lg">Kamis, 2 April 2026</p>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-rose-400" />
                  <span>11:00 - 14:00 WIB</span>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/fEFo4M7WRv4g13wX6" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-6 py-2 bg-slate-800 text-white rounded-full text-sm hover:bg-slate-700 transition-colors"
              >
                Buka Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gallery Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Camera className="w-10 h-10 text-rose-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Galeri Kami</h2>
            <p className="text-slate-600">Momen kebersamaan kami</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <img src="https://images7.alphacoders.com/132/thumb-1920-1322952.jpeg" alt="Gallery 1" className="w-full h-48 md:h-72 object-cover rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm" />
            <img src="https://images5.alphacoders.com/481/thumb-1920-481903.png " alt="Gallery 2" className="w-full h-48 md:h-72 object-cover rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm" />
            <img src="https://images8.alphacoders.com/699/thumb-1920-699136.png" alt="Gallery 3" className="w-full h-48 md:h-72 object-cover rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm" />
            <img src="https://images5.alphacoders.com/699/thumb-1920-699214.png" alt="Gallery 4" className="w-full h-48 md:h-72 object-cover rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm" />
            <img src="https://picfiles.alphacoders.com/646/thumb-1920-646627.png" alt="Gallery 5" className="w-full h-48 md:h-72 object-cover rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm" />
            <img src="https://picfiles.alphacoders.com/646/thumb-1920-646627.png" alt="Gallery 6" className="w-full h-48 md:h-72 object-cover rounded-2xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm" />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center border-t border-slate-800">
        <p className="text-gray-400 text-sm">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <h2 className="text-3xl font-serif text-white mt-6 mb-2">A W Aluqmana & Fitria Azzahra</h2>
      </footer>
    </div>
  );
}