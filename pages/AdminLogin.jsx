import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Orbit,
  Triangle,
  Hexagon,
  Fingerprint,
  Zap,
  RefreshCcw,
  ChevronLeft,
} from "lucide-react";

export default function App() {
  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered) return;

      const { innerWidth, innerHeight } = window;
      const normalizedX = e.clientX / innerWidth - 0.5;
      const normalizedY = e.clientY / innerHeight - 0.5;
      x.set(normalizedX);
      y.set(normalizedY);
    };

    if (isHovered) {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, isHovered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  const ringVariants = {
    login: {
      rotate: 360,
      transition: {
        duration: 30,
        repeat: isHovered ? 0 : Infinity,
        ease: "linear",
      },
    },
    forgot: {
      rotate: -360,
      transition: {
        duration: 15,
        repeat: isHovered ? 0 : Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-hidden relative font-sans selection:bg-cyan-500/30 flex items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, z: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 2],
              z: [0, 100],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${i * 18}deg) translateX(${
                100 + Math.random() * 200
              }px)`,
              transformOrigin: "center center",
            }}
            className={`absolute w-[100px] h-px bg-linear-to-r from-transparent ${
              view === "login" ? "via-cyan-500" : "via-orange-500"
            } to-transparent`}
          />
        ))}

        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px] mix-blend-screen transition-colors duration-1000 ${
            view === "login" ? "bg-cyan-900/30" : "bg-orange-900/30"
          }`}
        />
      </div>

      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-20 flex items-center justify-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center -z-10 pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-50" : "opacity-100"
          }`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: isHovered ? 0 : Infinity,
              ease: "linear",
            }}
            className={`w-[750px] h-[750px] absolute rounded-full border opacity-20 bg-linear-to-tr from-transparent ${
              view === "login"
                ? "via-cyan-500/10 to-transparent border-cyan-500"
                : "via-orange-500/10 to-transparent border-orange-500"
            }`}
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 45,
              repeat: isHovered ? 0 : Infinity,
              ease: "linear",
            }}
            className={`w-[700px] h-[700px] absolute rounded-full border border-dashed opacity-20 ${
              view === "login" ? "border-cyan-300" : "border-orange-300"
            }`}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 50,
              repeat: isHovered ? 0 : Infinity,
              ease: "linear",
            }}
            className="w-[660px] h-[660px] absolute rounded-full opacity-40"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 origin-[50%_330px] ${
                  view === "login" ? "bg-cyan-400" : "bg-orange-400"
                }`}
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 25,
              repeat: isHovered ? 0 : Infinity,
              ease: "linear",
            }}
            className="w-[780px] h-[780px] absolute rounded-full"
          >
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 rounded-full blur-[1px] bg-linear-to-r from-transparent ${
                view === "login"
                  ? "via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]"
                  : "via-orange-400 to-transparent shadow-[0_0_20px_#fb923c]"
              }`}
            />
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1.5 rounded-full blur-[1px] bg-linear-to-r from-transparent ${
                view === "login"
                  ? "via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]"
                  : "via-orange-400 to-transparent shadow-[0_0_20px_#fb923c]"
              }`}
            />
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: isHovered ? 0 : Infinity,
              ease: "linear",
            }}
            className={`w-[600px] h-[600px] absolute border rounded-full opacity-30 ${
              view === "login" ? "border-cyan-400" : "border-orange-400"
            }`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
          </motion.div>
        </div>

        <div className="relative w-[500px] h-[500px] rounded-full group/core">
          <div
            className={`absolute inset-0 rounded-full backdrop-blur-xl bg-black/50 border border-white/10 shadow-[0_0_60px_-10px_rgba(0,0,0,1)] transition-colors duration-700 overflow-hidden ${
              view === "login" ? "shadow-cyan-900/50" : "shadow-orange-900/50"
            }`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />

            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{
                duration: 5,
                repeat: isHovered ? 0 : Infinity,
                ease: "linear",
              }}
              className={`absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent ${
                view === "login" ? "via-cyan-400" : "via-orange-400"
              } to-transparent blur-[3px] ${
                isHovered ? "opacity-0" : "opacity-40"
              }`}
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10 text-center">
            <div className="flex flex-col items-center justify-center mb-6 w-full">
              <motion.div
                layout
                className={`mb-4 relative w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 ${
                  view === "login"
                    ? "text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
                    : "text-orange-400 shadow-[0_0_25px_rgba(251,146,60,0.3)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {view === "login" ? (
                    <motion.div
                      key="icon-login"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Orbit className="w-8 h-8" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon-forgot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Triangle
                        className={`w-8 h-8 ${
                          isHovered ? "" : "animate-pulse"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                layout
                className="flex flex-col items-center justify-center w-full"
              >
                <h1 className="text-3xl font-bold tracking-widest uppercase mb-2 flex items-center justify-center gap-3 w-full">
                  <span
                    className={`bg-clip-text text-transparent bg-linear-to-r ${
                      view === "login"
                        ? "from-cyan-200 to-blue-500"
                        : "from-orange-200 to-red-500"
                    }`}
                  >
                    {view === "login" ? "SYSTEM" : "WARNING"}
                  </span>
                </h1>

                <p className="text-xs text-white/40 tracking-[0.3em] font-mono uppercase">
                  {view === "login" ? "Orbital Access" : "Core Instability"}
                </p>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {view === "login" ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4 max-w-[340px]"
                >
                  <div className="relative group w-full">
                    <input
                      type="text"
                      placeholder="COMMANDER ID"
                      className={`w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-3.5 px-12 text-xs font-mono text-center focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-950/20 ${
                        view === "login"
                          ? "placeholder:text-cyan-400/50"
                          : "placeholder:text-red-400/50"
                      } focus:placeholder:opacity-0 placeholder:tracking-[0.3em] placeholder:uppercase placeholder:font-light`}
                    />
                    <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-white/20 group-focus-within:text-cyan-400">
                      <Hexagon className="w-4 h-4" />
                    </div>
                    <div className="absolute right-4 top-0 bottom-0 flex items-center justify-center text-white/20 group-focus-within:text-cyan-400">
                      <Hexagon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="relative group w-full">
                    <input
                      type="password"
                      placeholder="SECURITY CODE"
                      className={`w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-3.5 px-12 text-xs font-mono text-center focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-950/20 ${
                        view === "login"
                          ? "placeholder:text-cyan-400/50"
                          : "placeholder:text-red-400/50"
                      } focus:placeholder:opacity-0 placeholder:tracking-[0.3em] placeholder:uppercase placeholder:font-light`}
                    />
                    <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-white/20 group-focus-within:text-cyan-400">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                    <div className="absolute right-4 top-0 bottom-0 flex items-center justify-center text-white/20 group-focus-within:text-cyan-400">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs py-3.5 rounded-full transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      "INITIATE SEQUENCE"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="text-[10px] text-white/30 hover:text-cyan-400 transition-colors tracking-wider flex items-center justify-center gap-1 w-full cursor-pointer"
                  >
                    // LOST ACCESS CREDENTIALS?
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="forgot-form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4 max-w-[340px]"
                >
                  <div className="relative group w-full">
                    <input
                      type="text"
                      placeholder="OVERRIDE KEY"
                      className={`w-full bg-black/60 backdrop-blur-md border border-red-500/30 rounded-full py-3.5 px-12 text-xs font-mono text-center text-red-100 focus:outline-none focus:border-red-500 focus:bg-red-950/20 ${
                        view === "login"
                          ? "placeholder:text-cyan-400/50"
                          : "placeholder:text-red-400/50"
                      } focus:placeholder:opacity-0 placeholder:tracking-[0.3em] placeholder:uppercase placeholder:font-light`}
                    />
                    <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-red-500/50">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="absolute right-4 top-0 bottom-0 flex items-center justify-center text-red-500/50">
                      <Zap className="w-4 h-4" />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-400 text-black font-bold text-xs py-3.5 rounded-full transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] cursor-pointer disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      "EMERGENCY RESET"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="text-[10px] text-white/30 hover:text-white transition-colors tracking-wider flex items-center justify-center gap-2 w-full cursor-pointer"
                  >
                    <ChevronLeft className="w-3 h-3" /> ABORT
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="absolute bottom-10 flex gap-1.5 justify-center w-full">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], height: [6, 12, 6] }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? 0 : Infinity,
                    delay: i * 0.2,
                  }}
                  className={`w-1.5 rounded-full ${
                    view === "login" ? "bg-cyan-500" : "bg-red-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
