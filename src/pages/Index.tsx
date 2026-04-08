import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const floatingItems = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: i % 3 === 0 ? "💖" : i % 3 === 1 ? "✨" : "🤍",
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 10}s`,
  size: `${0.8 + Math.random() * 1.2}rem`,
}));

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  top: `${10 + Math.random() * 80}%`,
  delay: `${Math.random() * 5}s`,
  size: `${3 + Math.random() * 5}px`,
}));

const Index = () => {
  const [showGift, setShowGift] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    if (isMuted) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(330 50% 92%), hsl(270 40% 92%), hsl(300 20% 97%), hsl(0 0% 100%))",
      }}
    >
      {/* Floating hearts & sparkles */}
      {floatingItems.map((item) => (
        <span
          key={item.id}
          className="fixed pointer-events-none z-0 animate-float-up"
          style={{
            left: item.left,
            bottom: "-20px",
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.emoji}
        </span>
      ))}

      {/* Dreamy particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-0 rounded-full animate-gentle-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            background: "hsl(330 60% 75% / 0.4)",
            boxShadow: "0 0 10px hsl(330 60% 75% / 0.3)",
          }}
        />
      ))}

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 glass rounded-full p-3 transition-all duration-300 hover:scale-110 text-foreground/70 hover:text-foreground"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-16 md:py-20 max-w-2xl mx-auto">
        {/* Hero heading */}
        <div
          id="hero"
          data-animate
          className={`transition-all duration-1000 ${isVisible("hero") ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h1 className="font-dancing text-5xl sm:text-6xl md:text-7xl font-bold text-primary animate-text-glow text-center leading-tight">
            Happy Birthday 😊
          </h1>
        </div>

        {/* Photo section */}
        <div
          id="photo"
          data-animate
          className={`mt-10 sm:mt-14 transition-all duration-1000 ${isVisible("photo") ? "animate-zoom-in" : "opacity-0"}`}
        >
          <div className="relative">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden animate-glow-pulse border-4 border-primary/30 shadow-xl">
              <div className="w-full h-full flex items-center justify-center bg-secondary text-4xl sm:text-5xl">
                🎂
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 scale-110 animate-gentle-pulse" />
          </div>
        </div>

        {/* Glass card with message */}
        <div
          id="message"
          data-animate
          className={`mt-10 sm:mt-14 w-full glass rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-1000 ${isVisible("message") ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="space-y-4 text-foreground/80 text-sm sm:text-base leading-relaxed">
            <p>
              Happiest bday my dear <s className="text-muted-foreground">best friend</s>…
            </p>
            <p>
              ohh I'm sorry 😄 I know you don't like 'best friends'…
            </p>
            <p>
              Happy birthday my dear friend 🤍
            </p>
            <p>
              Have a great day and an amazing year ahead.
            </p>
            <p>
              God bless you ✨
            </p>
            <p>
              Stay happy and stay beautiful…
            </p>
            <p>
              You're one of the most genuine people I've ever met 😊
            </p>
            <p>
              I'm really glad that I got to know you.
            </p>
            <p>
              Stay the same kind-hearted person you are… don't change for anyone 🤍
            </p>
            <p className="font-medium text-foreground/90">
              And whatever you may call me,
              <br />
              you are my best friend 😊
            </p>
          </div>
        </div>

        {/* Extra lines */}
        <div
          id="extra"
          data-animate
          className={`mt-8 sm:mt-10 text-center space-y-3 text-foreground/70 text-sm sm:text-base transition-all duration-1000 delay-200 ${isVisible("extra") ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <p>You're one of the kindest people I know.</p>
          <p>I'm really happy that I got to know you.</p>
          <p>Stay happy always ✨</p>
        </div>

        {/* Gift button */}
        <div
          id="gift"
          data-animate
          className={`mt-10 sm:mt-14 transition-all duration-1000 ${isVisible("gift") ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <button
            onClick={() => setShowGift(true)}
            className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-primary text-primary-foreground font-medium text-base sm:text-lg shadow-lg transition-all duration-300 hover:scale-105 animate-glow-pulse hover:shadow-2xl active:scale-95"
          >
            Click here 🎁
          </button>
        </div>

        {/* Hidden gift message */}
        {showGift && (
          <div className="mt-8 glass rounded-2xl p-6 sm:p-8 text-center animate-reveal shadow-xl">
            <p className="font-dancing text-2xl sm:text-3xl md:text-4xl text-primary font-semibold animate-text-glow">
              You deserve all the happiness in the world ✨
            </p>
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default Index;
