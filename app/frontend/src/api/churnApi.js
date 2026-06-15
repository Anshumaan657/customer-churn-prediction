export async function predictChurn(customerInput) {
  // Phase 10 uses a mock response. Phase 11 will replace this with a FastAPI call.
  await new Promise((resolve) => setTimeout(resolve, 500));

  const activityRisk =
    Number(customerInput.Months_Inactive_12_mon) >= 3 ||
    Number(customerInput.Total_Trans_Ct) < 45 ||
    Number(customerInput.Total_Trans_Amt) < 1800;

  const churnProbability = activityRisk ? 0.78 : 0.18;

  return {
    prediction: activityRisk ? 1 : 0,
    prediction_label: activityRisk ? "Attrited Customer" : "Existing Customer",
    churn_probability: churnProbability,
    risk_level: activityRisk ? "High" : "Low",
    recommendation: activityRisk
      ? "Prioritize immediate retention outreach with a personalized offer or support follow-up."
      : "No urgent intervention required; continue standard customer engagement.",
  };
}
