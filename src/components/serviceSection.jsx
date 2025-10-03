import React, { useRef, useState, useEffect } from "react";

export default function ServiceSection() {
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
      {/* Left Column - video */}
      <div className="md:w-1/2 w-full relative group bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover min-h-[320px]"
          src="/images/pages/home/videos/serviceVideo.mp4"
          poster="/images/service-poster.jpg"
          playsInline
          loop
          muted
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

        {/* Controls */}
        <div className="absolute left-4 bottom-4 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-250">
          <div className="flex items-center gap-2 bg-black/55 backdrop-blur-sm rounded-full p-2">
            <button
              onClick={togglePlay}
              aria-pressed={!isPlaying}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {isPlaying ? (
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
                    d="M10 9v6m4-6v6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
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
            <span className="px-3 text-xs sm:text-sm text-gray-200/85">
              Controls
            </span>
          </div>
        </div>

        {/* Center icon when paused */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`${
              !isPlaying ? "opacity-80" : "opacity-0"
            } transition-opacity duration-300`}
          >
            {!isPlaying ? (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/45 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
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

      {/* Right Column - text */}
      <div className="md:w-1/2 w-full flex items-start md:items-center p-6 md:p-16 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            Premium Auto Service
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl font-medium text-indigo-300 mb-4">
            Reliable maintenance & professional repair
          </h2>
          <p className="text-sm sm:text-base md:text-base text-gray-200 mb-6">
            From routine maintenance to complex repairs, our certified experts
            ensure your car receives the best treatment. Using genuine parts,
            modern tools, and years of expertise — we keep your vehicle in top
            condition.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#booking"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold shadow-lg transition"
            >
              Book a Service
            </a>
            <button
              className="inline-block px-5 py-3 border border-indigo-500 rounded-2xl font-medium hover:bg-white/5 transition"
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
