from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = PROJECT_ROOT / "src" / "models" / "final_model.pkl"
PREPROCESSOR_PATH = PROJECT_ROOT / "src" / "models" / "preprocessor.pkl"

FEATURE_COLUMNS = [
    "Customer_Age",
    "Gender",
    "Dependent_count",
    "Education_Level",
    "Marital_Status",
    "Income_Category",
    "Card_Category",
    "Months_on_book",
    "Total_Relationship_Count",
    "Months_Inactive_12_mon",
    "Contacts_Count_12_mon",
    "Credit_Limit",
    "Total_Revolving_Bal",
    "Avg_Open_To_Buy",
    "Total_Amt_Chng_Q4_Q1",
    "Total_Trans_Amt",
    "Total_Trans_Ct",
    "Total_Ct_Chng_Q4_Q1",
    "Avg_Utilization_Ratio",
]


def get_risk_level(churn_probability: float) -> str:
    if churn_probability >= 0.75:
        return "High"
    if churn_probability >= 0.5:
        return "Medium"
    return "Low"


def get_recommendation(risk_level: str) -> str:
    recommendations = {
        "High": "Prioritize immediate retention outreach with a personalized offer or support follow-up.",
        "Medium": "Monitor customer activity and consider a targeted engagement campaign.",
        "Low": "No urgent intervention required; continue standard customer engagement.",
    }
    return recommendations[risk_level]
