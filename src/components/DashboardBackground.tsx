import React from "react";

export function DashboardBackground() {
  return (
    <>
      {/* Noise Texture */}
      <div className="noise-overlay"></div>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-teal-400/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>
    </>
  );
}
