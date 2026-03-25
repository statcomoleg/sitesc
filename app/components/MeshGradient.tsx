"use client";

interface MeshGradientProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

export function MeshGradient({ variant = "section", className = "" }: MeshGradientProps) {
  const configs = {
    hero: [
      { color: "rgba(227, 83, 54, 0.30)", size: 500, top: "-10%", left: "15%", animation: "meshMove1 18s ease-in-out infinite" },
      { color: "rgba(244, 164, 96, 0.22)", size: 400, top: "30%", left: "60%", animation: "meshMove2 22s ease-in-out infinite" },
      { color: "rgba(160, 82, 45, 0.25)", size: 450, top: "55%", left: "5%", animation: "meshMove3 20s ease-in-out infinite" },
      { color: "rgba(227, 83, 54, 0.12)", size: 300, top: "10%", left: "75%", animation: "meshMove1 25s ease-in-out infinite reverse" },
    ],
    section: [
      { color: "rgba(227, 83, 54, 0.12)", size: 350, top: "0%", left: "65%", animation: "meshMove1 20s ease-in-out infinite" },
      { color: "rgba(244, 164, 96, 0.10)", size: 300, top: "50%", left: "10%", animation: "meshMove2 24s ease-in-out infinite" },
      { color: "rgba(160, 82, 45, 0.08)", size: 280, top: "70%", left: "80%", animation: "meshMove3 22s ease-in-out infinite" },
    ],
    subtle: [
      { color: "rgba(227, 83, 54, 0.06)", size: 250, top: "20%", left: "70%", animation: "meshMove1 25s ease-in-out infinite" },
      { color: "rgba(244, 164, 96, 0.05)", size: 200, top: "60%", left: "20%", animation: "meshMove2 28s ease-in-out infinite" },
    ],
  };

  const blobs = configs[variant];

  return (
    <div className={`mesh-bg grain ${className}`} aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="mesh-blob"
          style={{
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            animation: blob.animation,
          }}
        />
      ))}
    </div>
  );
}
