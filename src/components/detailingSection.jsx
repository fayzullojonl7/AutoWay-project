import React, { useRef, useState, useEffect } from "react";

// DetailingSection.jsx
// Use this component in your project: import DetailingSection from "./DetailingSection";
// Replace the video src with your own (e.g., /videos/detailing.mp4)

export default function DetailingSection() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    const playPromise = v.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((m) => !m);
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        setIsPlaying(true);
      } else {
        v.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      setIsPlaying(!v.paused);
    }
  };

  return (
    <section className="w-full h-[85vh] flex flex-col md:flex-row bg-gray-900 text-white rounded-[30px] overflow-hidden">
      {/* Left Column */}
      <div className="md:w-1/2 w-full flex items-end md:items-center p-8 md:p-16 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            Premium Car Detailing
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-indigo-300 mb-4">
            Perfect cleanliness, shine and protection for your car
          </h2>
          <p className="text-sm md:text-base text-gray-200 mb-6">
            We bring back the factory shine: hand wash, deep polishing, ceramic
            coating, protective layer, and interior cleaning. Focused on quality
            and durability — every detail matters.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#booking"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold shadow-lg transition"
            >
              Book a Detailing Session
            </a>
            <button
              className="inline-block px-4 py-3 border border-indigo-500 rounded-2xl font-medium hover:bg-white/5 transition"
              onClick={() => {
                const el = document.querySelector("#booking");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - video with hover controls */}
      <div className="md:w-1/2 w-full relative group bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/images/pages/home/videos/AQO1dAgzU3433TCCPVSKLqzF4VOJcwX2aU4ZSQ5WzBGKEfoRSdJavXyaxQfCpZd.mp4"
          poster="/images/detailing-poster.jpg"
          playsInline
          loop
          muted
        />

        <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />

        {/* Controls - appear on hover */}
        <div className="absolute left-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
            <button
              onClick={togglePlay}
              aria-pressed={!isPlaying}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 9v6m4-6v6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M5 3.868v16.264L19 12 5 3.868z" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMute}
              aria-pressed={isMuted}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {isMuted ? (
                // muted icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5L6 9H2v6h4l5 4V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M23 9l-6 6M17 9l6 6"
                  />
                </svg>
              ) : (
                // sound on
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5L6 9H2v6h4l5 4V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a9 9 0 010 14.14"
                  />
                </svg>
              )}
            </button>

            <span className="px-3 text-xs text-gray-200/80">
              Hover Controls
            </span>
          </div>
        </div>

        {/* Optional: center pause icon when hovered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-60 transition-opacity duration-300">
            {!isPlaying ? (
              <div className="w-28 h-28 rounded-full bg-black/40 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 9v6m4-6v6"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
