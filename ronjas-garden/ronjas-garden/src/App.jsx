import { useState, useEffect, useCallback, useRef } from "react";
import QUOTES from "./quotes.js";

// ╔══════════════════════════════════════════════════════════════╗
// ║  CONFIGURATION — Edit these values!                         ║
// ╚══════════════════════════════════════════════════════════════╝

const CONFIG = {
  // Your Cloudinary cloud name (find it in your Cloudinary dashboard)
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dzfaz2fry",

  // The tag you give your photos in Cloudinary
  photoTag: import.meta.env.VITE_CLOUDINARY_TAG || "ronjas-garden",

  // Photo display width (800px is perfect for mobile)
  photoWidth: 800,

  // Password to enter the garden
  password: "0505",
};

// ─── COLORS ──────────────────────────────────────────────────────
const C = {
  cream: "#F5F0E8",
  creamLight: "#FAF7F2",
  terracotta: "#C17F59",
  terracottaLight: "#D4A574",
  terracottaDark: "#A66B45",
  sage: "#8B9E7E",
  sageLight: "#A3B899",
  sageDark: "#6B7E5E",
  brown: "#3D3229",
  brownLight: "#5C4A3A",
  gold: "#C9A96E",
  warmWhite: "#FDF9F3",
};

const CATEGORY_ICONS = {
  yoga: "🧘‍♀️", mindfulness: "🍃", ayurveda: "🌿", psychology: "🦋",
  motivation: "✨", growth: "🌱", love: "💛", personal: "🤍",
};

// ─── LEAF DECORATION ─────────────────────────────────────────────
const LeafDecor = ({ style, flip }) => (
  <svg width="40" height="60" viewBox="0 0 40 60" fill="none"
    style={{ ...style, transform: flip ? "scaleX(-1)" : "none", opacity: 0.12, position: "absolute", pointerEvents: "none" }}>
    <path d="M20 0C20 0 0 20 0 40C0 51 9 60 20 60C31 60 40 51 40 40C40 20 20 0 20 0Z" fill={C.sage} />
    <path d="M20 10V55M12 25L20 20M28 30L20 24M14 38L20 32M26 44L20 38" stroke={C.sageDark} strokeWidth="0.8" />
  </svg>
);

// ─── CLOUDINARY PHOTO LOADER ─────────────────────────────────────
async function fetchPhotos() {
  try {
    const res = await fetch(
      `https://res.cloudinary.com/${CONFIG.cloudName}/image/list/${CONFIG.photoTag}.json`
    );
    if (!res.ok) throw new Error("Could not fetch photos");
    const data = await res.json();
    return data.resources.map((r) => ({
      id: r.public_id,
      url: `https://res.cloudinary.com/${CONFIG.cloudName}/image/upload/w_${CONFIG.photoWidth},c_limit,q_auto,f_auto/${r.public_id}`,
      urlFull: `https://res.cloudinary.com/${CONFIG.cloudName}/image/upload/q_auto,f_auto/${r.public_id}`,
    }));
  } catch (err) {
    console.warn("Cloudinary fetch failed:", err.message);
    return null;
  }
}

// ─── PLACEHOLDER PHOTOS (shown until real photos are set up) ─────
const PLACEHOLDER_PHOTOS = Array.from({ length: 12 }, (_, i) => {
  const palettes = [
    ["#C17F59", "#8B9E7E"], ["#D4A574", "#7A8B6F"], ["#B8860B", "#6B8E6B"],
    ["#CD853F", "#9CAF88"], ["#D2B48C", "#8FBC8F"], ["#C4956A", "#A3B899"],
    ["#B8956A", "#7D9B71"], ["#D4A982", "#6B8F5E"], ["#C9A96E", "#8B9E7E"],
    ["#B07D4B", "#5F7A52"], ["#C08050", "#7E9B6E"], ["#D4956A", "#6B8B6B"],
  ];
  return { id: `placeholder-${i}`, gradient: palettes[i], isPlaceholder: true };
});

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [shakeAnim, setShakeAnim] = useState(false);
  const [landingAnim, setLandingAnim] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [quoteAnim, setQuoteAnim] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const usedQuotes = useRef(new Set());
  const usedPhotos = useRef(new Set());

  // Load photos on mount
  useEffect(() => {
    fetchPhotos().then((result) => {
      if (result && result.length > 0) {
        setPhotos(result);
      } else {
        setPhotos(PLACEHOLDER_PHOTOS);
      }
    });
    setTimeout(() => setLandingAnim(true), 100);
  }, []);

  const getRandomItem = useCallback((arr, usedSet) => {
    if (!arr || arr.length === 0) return null;
    if (usedSet.size >= arr.length) usedSet.clear();
    let item;
    do {
      item = arr[Math.floor(Math.random() * arr.length)];
    } while (usedSet.has(item));
    usedSet.add(item);
    return item;
  }, []);

  const loadNewInspiration = useCallback((quoteOnly = false) => {
    setQuoteAnim(false);
    if (!quoteOnly) {
      setFadeIn(false);
      setImgLoaded(false);
    }

    setTimeout(() => {
      if (!quoteOnly && photos) {
        setCurrentPhoto(getRandomItem(photos, usedPhotos.current));
      }
      setCurrentQuote(getRandomItem(QUOTES, usedQuotes.current));
      setTimeout(() => {
        setQuoteAnim(true);
        if (quoteOnly) return;
        // For placeholders, fade in immediately; for real photos, wait for onLoad
        if (photos && photos[0]?.isPlaceholder) {
          setFadeIn(true);
          setImgLoaded(true);
        }
      }, 50);
    }, quoteOnly ? 200 : 350);
  }, [photos, getRandomItem]);

  const handleCodeSubmit = () => {
    if (code === CONFIG.password) {
      setScreen("main");
      setTimeout(() => loadNewInspiration(), 100);
    } else {
      setCodeError(true);
      setShakeAnim(true);
      setTimeout(() => { setShakeAnim(false); setCodeError(false); }, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCodeSubmit();
  };

  // ─── LANDING SCREEN ─────────────────────────────────────────────
  if (screen === "landing") {
    return (
      <div style={{
        minHeight: "100vh", minHeight: "100dvh",
        background: `linear-gradient(180deg, ${C.cream} 0%, ${C.warmWhite} 50%, ${C.cream} 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", position: "relative", overflow: "hidden",
      }}>
        <LeafDecor style={{ top: "8%", left: "8%" }} />
        <LeafDecor style={{ top: "15%", right: "10%" }} flip />
        <LeafDecor style={{ bottom: "12%", left: "12%" }} flip />
        <LeafDecor style={{ bottom: "8%", right: "8%" }} />

        {/* Garden gate icon */}
        <div style={{
          opacity: landingAnim ? 1 : 0,
          transform: landingAnim ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease",
          marginBottom: 24,
          animation: landingAnim ? "gentleFloat 4s ease-in-out infinite" : "none",
        }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke={C.terracotta} strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M22 44V28C22 22.5 26.5 18 32 18C37.5 18 42 22.5 42 28V44" stroke={C.terracotta} strokeWidth="2" strokeLinecap="round" />
            <path d="M32 18V44" stroke={C.terracotta} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="44" x2="46" y2="44" stroke={C.terracotta} strokeWidth="2" strokeLinecap="round" />
            <circle cx="29" cy="34" r="1.5" fill={C.terracotta} />
            <circle cx="35" cy="34" r="1.5" fill={C.terracotta} />
            <path d="M18 26C18 26 14 22 16 18C18 20 22 22 18 26Z" fill={C.sage} opacity="0.5" />
            <path d="M46 24C46 24 50 20 48 16C46 18 42 20 46 24Z" fill={C.sage} opacity="0.5" />
          </svg>
        </div>

        {/* Welcome */}
        <div style={{
          textAlign: "center", maxWidth: 380,
          opacity: landingAnim ? 1 : 0,
          transform: landingAnim ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s ease 0.3s",
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 500,
            color: C.brown, lineHeight: 1.3, marginBottom: 20,
          }}>
            Welcome to our Garden<br />
            <span style={{ color: C.terracotta, fontStyle: "italic" }}>My Queen</span>
          </h1>
          <p style={{
            fontSize: "clamp(14px, 3.5vw, 16px)", color: C.brownLight,
            lineHeight: 1.7, fontStyle: "italic", marginBottom: 8,
          }}>
            Breathe the fresh air and enjoy your walk through my favorite moments.
          </p>
          <p style={{
            fontSize: "clamp(16px, 4vw, 18px)", color: C.terracotta,
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            marginTop: 16, marginBottom: 40,
          }}>
            Te amo Ronja! 💛
          </p>
        </div>

        {/* Code entry */}
        <div style={{
          opacity: landingAnim ? 1 : 0,
          transform: landingAnim ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s ease 0.6s",
          textAlign: "center", width: "100%", maxWidth: 300,
        }}>
          <p style={{
            fontSize: 13, color: C.brownLight, marginBottom: 12,
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            Enter the secret code
          </p>
          <div style={{
            display: "flex", gap: 12, justifyContent: "center", alignItems: "center",
            animation: shakeAnim ? "shake 0.3s ease" : "none",
          }}>
            <input
              type="tel" maxLength={4} value={code}
              onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setCodeError(false); }}
              onKeyDown={handleKeyDown}
              placeholder="• • • •"
              style={{
                width: 140, padding: "14px 20px", fontSize: 22,
                fontFamily: "'Playfair Display', serif", textAlign: "center",
                letterSpacing: 8,
                border: `2px solid ${codeError ? "#C75050" : C.terracottaLight}`,
                borderRadius: 12, background: C.warmWhite, color: C.brown,
                transition: "border-color 0.3s",
              }}
            />
            <button onClick={handleCodeSubmit} style={{
              width: 52, height: 52, borderRadius: "50%",
              border: `2px solid ${C.terracotta}`, background: "transparent",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s", color: C.terracotta, fontSize: 20,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.terracotta; e.currentTarget.style.color = C.warmWhite; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.terracotta; }}
            >→</button>
          </div>

          {codeError && (
            <p style={{ color: "#C75050", fontSize: 13, marginTop: 10, fontStyle: "italic" }}>
              That's not quite right, my love...
            </p>
          )}

          <p style={{
            fontSize: 11, color: C.brownLight, marginTop: 16, opacity: 0.5, fontStyle: "italic",
          }}>
            hint: the day that made the world more beautiful
          </p>
        </div>
      </div>
    );
  }

  // ─── MAIN SCREEN ───────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", minHeight: "100dvh",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.warmWhite} 40%, ${C.cream} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "32px 20px 40px", position: "relative", overflow: "hidden",
    }}>
      <LeafDecor style={{ top: "3%", right: "5%" }} />
      <LeafDecor style={{ bottom: "5%", left: "5%" }} flip />

      {/* Header */}
      <div style={{
        textAlign: "center", marginBottom: 28,
        opacity: fadeIn ? 1 : 0, transition: "opacity 0.6s ease",
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18px, 4.5vw, 22px)", fontWeight: 500,
          color: C.brown, marginBottom: 4,
        }}>
          Ronja's Garden
        </h2>
        <p style={{ fontSize: 12, color: C.sage, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          a moment just for you
        </p>
      </div>

      {/* Photo Card */}
      {currentPhoto && (
        <div style={{
          width: "100%", maxWidth: 380, aspectRatio: "3/4",
          borderRadius: 20, overflow: "hidden", position: "relative",
          boxShadow: "0 8px 32px rgba(61,50,41,0.12), 0 2px 8px rgba(61,50,41,0.08)",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          marginBottom: 28,
        }}>
          {currentPhoto.isPlaceholder ? (
            // Placeholder gradient
            <div style={{
              width: "100%", height: "100%",
              background: `linear-gradient(135deg, ${currentPhoto.gradient[0]} 0%, ${currentPhoto.gradient[1]} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12,
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.4">
                <rect x="4" y="8" width="40" height="32" rx="4" stroke="white" strokeWidth="2" />
                <circle cx="16" cy="20" r="4" stroke="white" strokeWidth="2" />
                <path d="M4 32L16 24L24 30L32 22L44 32" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontStyle: "italic" }}>
                Your photo here
              </p>
            </div>
          ) : (
            // Real Cloudinary photo
            <>
              {/* Loading shimmer */}
              {!imgLoaded && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(90deg, ${C.cream} 25%, ${C.creamLight} 50%, ${C.cream} 75%)`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease-in-out infinite",
                }} />
              )}
              <img
                src={currentPhoto.url}
                alt="Our moment"
                onLoad={() => { setImgLoaded(true); setFadeIn(true); }}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
            </>
          )}

          {/* Category badge */}
          {currentQuote && (
            <div style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
              borderRadius: 20, padding: "6px 14px", fontSize: 12, color: C.brownLight,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              {CATEGORY_ICONS[currentQuote.category] || "🌿"}
              <span style={{ textTransform: "capitalize" }}>{currentQuote.category}</span>
            </div>
          )}
        </div>
      )}

      {/* Quote */}
      {currentQuote && (
        <div style={{
          width: "100%", maxWidth: 380, textAlign: "center", padding: "0 8px",
          opacity: quoteAnim ? 1 : 0,
          transform: quoteAnim ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: 28, color: C.terracottaLight, lineHeight: 1, marginBottom: 8,
            fontFamily: "'Playfair Display', serif", opacity: 0.4,
          }}>"</div>
          <p style={{
            fontSize: "clamp(15px, 3.8vw, 17px)", color: C.brown,
            lineHeight: 1.7, fontStyle: "italic", marginBottom: 12,
          }}>
            {currentQuote.text}
          </p>
          <p style={{ fontSize: 13, color: C.sage, fontWeight: 500 }}>
            — {currentQuote.author}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 12,
        width: "100%", maxWidth: 300,
        opacity: fadeIn ? 1 : 0, transition: "opacity 0.6s ease 0.5s",
      }}>
        <button
          onClick={() => loadNewInspiration(true)}
          style={{
            padding: "14px 24px", border: `1.5px solid ${C.sage}`,
            borderRadius: 14, background: "transparent", color: C.sageDark,
            fontSize: 14, cursor: "pointer", transition: "all 0.3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = C.sage; e.currentTarget.style.color = C.warmWhite; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.sageDark; }}
        >
          🌿 New Quote
        </button>
        <button
          onClick={() => loadNewInspiration(false)}
          style={{
            padding: "14px 24px", border: "none", borderRadius: 14,
            background: `linear-gradient(135deg, ${C.terracotta} 0%, ${C.terracottaDark} 100%)`,
            color: C.warmWhite, fontSize: 14, cursor: "pointer",
            transition: "all 0.3s", boxShadow: "0 4px 16px rgba(193,127,89,0.25)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(193,127,89,0.35)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(193,127,89,0.25)"; }}
        >
          ✨ New Inspiration
        </button>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 40, fontSize: 11, color: C.brownLight,
        opacity: 0.35, fontStyle: "italic", textAlign: "center",
      }}>
        made with love, for the most beautiful soul I know
      </p>
    </div>
  );
}
