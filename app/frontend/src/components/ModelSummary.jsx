import { Activity, BadgeCheck, Gauge } from "lucide-react";

export default function ModelSummary() {
  return (
    <section className="model-summary" aria-label="Model summary">
      <div className="summary-item">
        <BadgeCheck size={20} aria-hidden="true" />
        <span>Final model</span>
        <strong>Tuned XGBoost</strong>
      </div>
      <div className="summary-item">
        <Gauge size={20} aria-hidden="true" />
        <span>Primary metric</span>
        <strong>Recall</strong>
      </div>
      <div className="summary-item">
        <Activity size={20} aria-hidden="true" />
        <span>Workflow</span>
        <strong>Raw input</strong>
      </div>
    </section>
  );
}
