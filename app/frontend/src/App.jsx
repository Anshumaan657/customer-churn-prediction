import { useEffect, useMemo, useState } from "react";
import { predictChurn } from "./api/churnApi";
import Header from "./components/Header";
import ModelSummary from "./components/ModelSummary";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";

const initialFormData = {
  Customer_Age: 45,
  Gender: "M",
  Dependent_count: 3,
  Education_Level: "High School",
  Marital_Status: "Married",
  Income_Category: "$60K - $80K",
  Card_Category: "Blue",
  Months_on_book: 39,
  Total_Relationship_Count: 5,
  Months_Inactive_12_mon: 1,
  Contacts_Count_12_mon: 3,
  Credit_Limit: 12691,
  Total_Revolving_Bal: 777,
  Avg_Open_To_Buy: 11914,
  Total_Amt_Chng_Q4_Q1: 1.335,
  Total_Trans_Amt: 1144,
  Total_Trans_Ct: 42,
  Total_Ct_Chng_Q4_Q1: 1.625,
  Avg_Utilization_Ratio: 0.061,
};

const mockResult = {
  prediction: 0,
  prediction_label: "Existing Customer",
  churn_probability: 0.18,
  risk_level: "Low",
  recommendation:
    "No urgent intervention required; continue standard customer engagement.",
};

const numericFields = new Set(
  Object.keys(initialFormData).filter((key) => typeof initialFormData[key] === "number")
);

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(mockResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("churn-theme") || "system";
  });

  const systemThemeQuery = useMemo(() => {
    return window.matchMedia("(prefers-color-scheme: dark)");
  }, []);

  useEffect(() => {
    function applyTheme() {
      const resolvedTheme =
        theme === "system"
          ? systemThemeQuery.matches
            ? "dark"
            : "light"
          : theme;

      document.documentElement.dataset.theme = resolvedTheme;
    }

    applyTheme();
    localStorage.setItem("churn-theme", theme);

    if (theme !== "system") return undefined;

    systemThemeQuery.addEventListener("change", applyTheme);
    return () => systemThemeQuery.removeEventListener("change", applyTheme);
  }, [systemThemeQuery, theme]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: numericFields.has(name) ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const prediction = await predictChurn(formData);
      setResult(prediction);
    } catch (requestError) {
      setError(requestError.message || "Unable to score this customer.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setFormData(initialFormData);
    setResult(mockResult);
    setError("");
  }

  return (
    <main className="app-shell">
      <Header theme={theme} onThemeChange={setTheme} />
      <div className="workspace-layout">
        <PredictionForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoading}
        />
        <aside className="result-column">
          {error && <div className="error-panel">{error}</div>}
          <ResultCard result={result} />
        </aside>
      </div>
      <ModelSummary />
    </main>
  );
}
