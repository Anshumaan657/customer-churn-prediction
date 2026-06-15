import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

function formatProbability(value) {
  return `${Math.round(Number(value) * 100)}%`;
}

function getRiskIcon(riskLevel) {
  if (riskLevel === "High") return <AlertTriangle size={24} aria-hidden="true" />;
  if (riskLevel === "Medium") return <TrendingUp size={24} aria-hidden="true" />;
  return <CheckCircle2 size={24} aria-hidden="true" />;
}

export default function ResultCard({ result }) {
  const riskClass = result.risk_level.toLowerCase();

  return (
    <section className={`result-card ${riskClass}`} aria-live="polite">
      <div className="result-topline">
        <div className="risk-icon">{getRiskIcon(result.risk_level)}</div>
        <div>
          <p className="eyebrow">Prediction Result</p>
          <h2>{result.prediction_label}</h2>
        </div>
      </div>

      <div className="score-row">
        <span>Churn probability</span>
        <strong>{formatProbability(result.churn_probability)}</strong>
      </div>

      <div className="probability-track" aria-hidden="true">
        <span style={{ width: formatProbability(result.churn_probability) }} />
      </div>

      <div className="result-meta">
        <span>Risk level</span>
        <strong>{result.risk_level}</strong>
      </div>

      <div className="recommendation">
        <span>Recommendation</span>
        <p>{result.recommendation}</p>
      </div>
    </section>
  );
}
