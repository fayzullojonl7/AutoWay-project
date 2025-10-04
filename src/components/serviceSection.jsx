"use client";

import React, { useRef, useState, useEffect } from "react";

export default function ServiceSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  // Lazy-load через Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !inView) return;

    v.muted = isMuted;

    const handleLoadedData = () => setLoaded(true);
    v.addEventListener("loadeddata", handleLoadedData);

    const playPromise = v.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(true);
    }

    return () => v.removeEventListener("loadeddata", handleLoadedData);
  }, [inView, isMuted]);

  const toggleMute = () => setIsMuted((m) => !m);

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
    } catch {
      setIsPlaying(!v.paused);
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full h-[85vh] flex flex-col md:flex-row bg-gray-900 text-white rounded-[30px] overflow-hidden relative"
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse z-10 rounded-[30px]" />
      )}

      <div className="md:w-1/2 w-full relative group bg-black flex items-center justify-center overflow-hidden">
        {inView && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/images/pages/home/videos/serviceVideo.mp4"
            poster="/images/service-poster.jpg"
            playsInline
            loop
            muted={isMuted}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-20" />

        <div className="absolute left-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-30">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M23 9l-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a9 9 0 010 14.14" />
                </svg>
              )}
            </button>

            <span className="px-3 text-xs text-gray-200/80">Hover Controls</span>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex items-end md:items-center p-8 md:p-16 bg-gradient-to-b from-transparent to-black z-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            Premium Auto Service
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-indigo-300 mb-4">
            Reliable maintenance & professional repair
          </h2>
          <p className="text-sm md:text-base text-gray-200 mb-6">
            From routine maintenance to complex repairs, our certified experts ensure your car receives the best treatment. Using genuine parts, modern tools, and years of expertise — we keep your vehicle in top condition.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#booking"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold shadow-lg transition"
            >
              Book a Service
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
    </section>
  );
}
