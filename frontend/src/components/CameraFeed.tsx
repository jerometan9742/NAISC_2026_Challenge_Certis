import type { Alert } from "../types";
import { useCamera } from "../hooks/useCamera";

interface Props {
  onAlert: (alert: Alert) => void;
}

export default function CameraFeed({ onAlert }: Props) {
  const { videoRef, canvasRef, active, wsConnected, analysisText, start, stop } =
    useCamera(onAlert);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Live Camera Feed
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div
            className={`w-2 h-2 rounded-full ${
              wsConnected ? "bg-green-500 animate-pulse" : "bg-gray-600"
            }`}
          />
          {active ? "Streaming" : "Standby"}
        </div>
      </div>

      {/* Video */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video border border-border">
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-2">
            <span className="text-4xl"></span>
            <span className="text-sm">Camera inactive</span>
          </div>
        )}
        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Status bar */}
      {active && analysisText && (
        <p className="text-xs text-gray-400 truncate">{analysisText}</p>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!active ? (
          <button
            onClick={start}
            className="flex-1 py-2 rounded bg-blue-700 hover:bg-blue-600 text-sm text-white font-medium"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stop}
            className="flex-1 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 font-medium"
          >
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
}
