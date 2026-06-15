import { RotateCcw, Send } from "lucide-react";

const categoricalFields = {
  Gender: ["M", "F"],
  Education_Level: [
    "College",
    "Doctorate",
    "Graduate",
    "High School",
    "Post-Graduate",
    "Uneducated",
    "Unknown",
  ],
  Marital_Status: ["Divorced", "Married", "Single", "Unknown"],
  Income_Category: [
    "$120K +",
    "$40K - $60K",
    "$60K - $80K",
    "$80K - $120K",
    "Less than $40K",
    "Unknown",
  ],
  Card_Category: ["Blue", "Gold", "Platinum", "Silver"],
};

const numericFields = [
  ["Customer_Age", "Customer age"],
  ["Dependent_count", "Dependents"],
  ["Months_on_book", "Months on book"],
  ["Total_Relationship_Count", "Total relationships"],
  ["Months_Inactive_12_mon", "Inactive months"],
  ["Contacts_Count_12_mon", "Contacts in 12 months"],
  ["Credit_Limit", "Credit limit"],
  ["Total_Revolving_Bal", "Revolving balance"],
  ["Avg_Open_To_Buy", "Average open to buy"],
  ["Total_Amt_Chng_Q4_Q1", "Amount change Q4/Q1"],
  ["Total_Trans_Amt", "Transaction amount"],
  ["Total_Trans_Ct", "Transaction count"],
  ["Total_Ct_Chng_Q4_Q1", "Count change Q4/Q1"],
  ["Avg_Utilization_Ratio", "Utilization ratio"],
];

const labels = {
  Gender: "Gender",
  Education_Level: "Education level",
  Marital_Status: "Marital status",
  Income_Category: "Income category",
  Card_Category: "Card category",
};

export default function PredictionForm({
  formData,
  onChange,
  onSubmit,
  onReset,
  isLoading,
}) {
  return (
    <section className="form-section" aria-labelledby="prediction-form-title">
      <div className="section-heading">
        <p className="eyebrow">Prediction Form</p>
        <h2 id="prediction-form-title">Customer profile</h2>
      </div>

      <form onSubmit={onSubmit} className="prediction-form">
        <div className="field-grid categorical-grid">
          {Object.entries(categoricalFields).map(([name, options]) => (
            <label className="field" key={name}>
              <span>{labels[name]}</span>
              <select
                name={name}
                value={formData[name]}
                onChange={onChange}
                required
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="field-grid">
          {numericFields.map(([name, label]) => (
            <label className="field" key={name}>
              <span>{label}</span>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={onChange}
                min="0"
                step={name.includes("Ratio") || name.includes("Chng") ? "0.001" : "1"}
                required
              />
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onReset}>
            <RotateCcw size={18} aria-hidden="true" />
            Reset
          </button>
          <button type="submit" className="primary-button" disabled={isLoading}>
            <Send size={18} aria-hidden="true" />
            {isLoading ? "Scoring" : "Score customer"}
          </button>
        </div>
      </form>
    </section>
  );
}
