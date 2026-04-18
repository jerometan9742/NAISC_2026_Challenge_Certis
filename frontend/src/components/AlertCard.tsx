import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { Alert, AlertFeedback } from "../types";

const SEVERITY_STYLES: Record<string, string> = {
  critical: "bg-red-900/60 border-red-600 text-red-300",
  high:     "bg-orange-900/60 border-orange-500 text-orange-300",
  medium:   "bg-yellow-900/60 border-yellow-500 text-yellow-300",
  low:      "bg-blue-900/60 border-blue-500 text-blue-300",
};

const SEVERITY_BADGE: Record<string, string> = {
  critical: "bg-red-600 text-white",
  high:     "bg-orange-500 text-white",
  medium:   "bg-yellow-500 text-black",
  low:      "bg-blue-500 text-white",
};

interface Props {
  alert: Alert;
  onFeedback: (fb: AlertFeedback) => void;
}

export default function AlertCard({ alert, onFeedback }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isDismissed = alert.status === "dismissed";
  const isConfirmed = alert.status === "confirmed";

  if (isDismissed) return null;

  return (
    <div
      className={`rounded-lg border p-4 mb-3 transition-all ${SEVERITY_STYLES[alert.severity]} ${
        isConfirmed ? "opacity-60" : ""
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${SEVERITY_BADGE[alert.severity]}`}
          >
            {alert.severity}
          </span>
          {isConfirmed && (
            <span className="text-xs px-2 py-0.5 rounded bg-green-800 text-green-300">
              Confirmed
            </span>
          )}
          <span className="font-semibold text-gray-100">{alert.title}</span>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
        </span>
      </div>

      {/* Location + agents */}
      <div className="mt-1 text-xs text-gray-400 flex gap-3">
        <span> {alert.location}</span>
        <span> {alert.contributing_agents.join(", ")}</span>
        <span>Confidence: {Math.round(alert.confidence * 100)}%</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-300">{alert.description}</p>

      {/* Frame snapshot thumbnail */}
      {alert.frame_snapshot && (
        <img
          src={alert.frame_snapshot}
          alt="Frame snapshot"
          className="mt-2 rounded max-h-32 object-cover border border-gray-600"
        />
      )}

      {/* Expandable reasoning */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-2 text-xs text-gray-400 hover:text-gray-200 underline"
      >
        {expanded ? "Hide details" : "Show evidence & actions"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 text-sm">
          <div>
            <p className="text-xs uppercase text-gray-500 mb-1">Evidence</p>
            <ul className="list-disc list-inside space-y-0.5 text-gray-300">
              {alert.evidence.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase text-gray-500 mb-1">Recommended Actions</p>
            <ol className="list-decimal list-inside space-y-0.5 text-gray-300">
              {alert.recommended_actions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!isConfirmed && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onFeedback({ alert_id: alert.alert_id, outcome: "confirmed" })}
            className="text-xs px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white"
          >
            Confirm
          </button>
          <button
            onClick={() => onFeedback({ alert_id: alert.alert_id, outcome: "dismissed" })}
            className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
