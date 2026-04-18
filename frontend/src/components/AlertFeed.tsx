import type { Alert, AlertFeedback } from "../types";
import AlertCard from "./AlertCard";

interface Props {
  alerts: Alert[];
  onFeedback: (fb: AlertFeedback) => void;
}

export default function AlertFeed({ alerts, onFeedback }: Props) {
  const active = alerts.filter((a) => a.status !== "dismissed");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Alert Feed
        </h2>
        <span className="text-xs text-gray-500">{active.length} active</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {active.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-600 text-sm">
            <span className="text-3xl mb-2">✓</span>
            No active alerts
          </div>
        ) : (
          active.map((alert) => (
            <AlertCard key={alert.alert_id} alert={alert} onFeedback={onFeedback} />
          ))
        )}
      </div>
    </div>
  );
}
