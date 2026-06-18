# Customer Churn Prediction

An end-to-end machine learning project that predicts whether a credit card customer is likely to churn. The project covers business understanding, data preprocessing, model training, hyperparameter tuning, MLflow experiment tracking, SHAP explainability, a FastAPI backend, and a React frontend.

The final model is a tuned XGBoost classifier selected primarily for recall, because missing actual churners is more costly than sending retention outreach to some customers who may not churn.

## Project Highlights

- Binary classification project for customer churn prediction
- Complete ML workflow from raw data to production-style inference
- Tuned XGBoost final model
- Recall-focused model selection
- MLflow experiment tracking with a SQLite backend
- SHAP global and local explainability
- FastAPI prediction backend
- React + Vite frontend with light, dark, and system themes
- Frontend sends raw customer input; backend handles preprocessing

## Problem Statement

Customer churn occurs when a customer stops using a company's product or service. In this project, the target is:

```text
Existing Customer  -> 0
Attrited Customer  -> 1
```

The business goal is to identify customers at risk of churn early enough for the company to take retention actions such as personalized offers, proactive support, or targeted engagement.

## Primary Metric

The primary metric is **Recall**.

In churn prediction, a false negative means the model failed to identify a customer who actually churned. This is usually more costly than a false positive, because losing an existing customer can be more expensive than offering retention support to a customer who may stay.

## Tech Stack

### Machine Learning

- Python
- pandas
- NumPy
- scikit-learn
- XGBoost
- SHAP
- joblib

### Experiment Tracking

- MLflow
- SQLite backend via `mlflow.db`

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- CSS
- lucide-react

## Project Structure

```text
customer-churn-prediction/
├── app/
│   └── frontend/
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.js
│       └── src/
│           ├── App.jsx
│           ├── main.jsx
│           ├── api/
│           │   └── churnApi.js
│           ├── components/
│           │   ├── Header.jsx
│           │   ├── ModelSummary.jsx
│           │   ├── PredictionForm.jsx
│           │   ├── ResultCard.jsx
│           │   └── ThemeToggle.jsx
│           └── styles/
│               └── App.css
├── data/
│   ├── raw/
│   │   └── credit_card_customers.csv
│   └── processed/
│       ├── X_train_processed.csv
│       ├── X_test_processed.csv
│       ├── y_train.csv
│       └── y_test.csv
├── notebooks/
│   ├── 01_business_understanding.md
│   ├── 02_data_understanding.ipynb
│   ├── 03_data_preprocessing.ipynb
│   ├── 04_model_training.ipynb
│   ├── 05_hyperparameter_tuning.ipynb
│   ├── 06_experiment_tracking_mlflow.ipynb
│   ├── 07_final_model_selection.ipynb
│   └── 08_model_explainability.ipynb
├── reports/
│   └── figures/
│       ├── phase8_shap_global_feature_importance.png
│       ├── phase8_shap_beeswarm.png
│       └── phase8_shap_local_customer_waterfall.png
├── src/
│   ├── api/
│   │   ├── main.py
│   │   ├── prediction.py
│   │   ├── schemas.py
│   │   └── utils.py
│   ├── explainability/
│   │   └── shap_utils.py
│   └── models/
│       ├── preprocessor.pkl
│       ├── tuned_random_forest.pkl
│       ├── tuned_xgboost.pkl
│       └── final_model.pkl
├── requirements.txt
├── mlflow.db
└── README.md
```

## Completed Workflow

### 1. Business Understanding

The project was framed as a binary classification problem focused on customer retention. Recall was selected as the key metric because the business priority is to catch as many churners as possible.

### 2. Data Understanding and EDA

The raw dataset was inspected for:

- Shape and column types
- Target distribution
- Numerical and categorical features
- Class imbalance
- Leakage-prone columns

The target class is imbalanced, with churned customers forming the minority class.

### 3. Data Preprocessing

The preprocessing phase:

- Encoded `Attrition_Flag` into `0` and `1`
- Removed `CLIENTNUM`
- Removed leakage-prone Naive Bayes columns
- Split the data into train and test sets
- Scaled numerical features
- One-hot encoded categorical features
- Saved processed datasets
- Saved the fitted preprocessor

Saved preprocessor:

```text
src/models/preprocessor.pkl
```

### 4. Model Training

Models trained:

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost

Metrics used:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC
- Confusion Matrix

### 5. Hyperparameter Tuning

Random Forest and XGBoost were tuned using `RandomizedSearchCV` with recall as the optimization metric.

The tuned XGBoost model achieved the best recall and was selected as the final candidate.

### 6. MLflow Experiment Tracking

MLflow was used to track model experiments and metrics.

Tracking backend:

```text
mlflow.db
```

Experiment name:

```text
Customer Churn Prediction
```

### 7. Final Model Selection

Tuned XGBoost was selected as the final production model and saved as:

```text
src/models/final_model.pkl
```

### 8. SHAP Explainability

SHAP was used to explain the final model.

Top churn-driving features included:

- `num__Total_Trans_Ct`
- `num__Total_Trans_Amt`
- `num__Total_Revolving_Bal`
- `num__Total_Ct_Chng_Q4_Q1`
- `num__Total_Amt_Chng_Q4_Q1`
- `num__Total_Relationship_Count`
- `num__Months_Inactive_12_mon`
- `num__Contacts_Count_12_mon`

Saved explainability plots:

```text
reports/figures/
```

### 9. FastAPI Backend

The backend accepts raw customer input, applies the saved preprocessor, and returns churn predictions from the final model.

Endpoints:

```text
GET  /
GET  /health
POST /predict
```

The `/predict` endpoint returns:

```json
{
  "prediction": 0,
  "prediction_label": "Existing Customer",
  "churn_probability": 0.001,
  "risk_level": "Low",
  "recommendation": "No urgent intervention required; continue standard customer engagement."
}
```

### 10. Frontend Development

The frontend was built with React and Vite.

Features:

- Clean responsive UI
- Raw customer input form
- Dropdowns for categorical fields
- Number inputs for numerical fields
- Result card
- Light, dark, and system theme modes

### 11. Frontend and Backend Integration

The frontend sends raw customer JSON to the FastAPI backend:

```text
http://127.0.0.1:8000/predict
```

The backend handles preprocessing and prediction. The frontend displays:

- Prediction label
- Churn probability
- Risk level
- Business recommendation

## Model Performance Summary

Final selected model:

```text
Tuned XGBoost
```

Tuned XGBoost test performance:

| Metric | Score |
|---|---:|
| Accuracy | 96.35% |
| Precision | 85.35% |
| Recall | 93.23% |
| F1 Score | 89.12% |
| ROC-AUC | 99.18% |

Confusion matrix:

```text
[[1649, 52],
 [22, 303]]
```

## Run Locally

This project is intended to run locally without Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/Anshumaan657/customer-churn-prediction.git
cd customer-churn-prediction
```

### 2. Create and Activate a Python Virtual Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI Backend

```bash
uvicorn src.api.main:app --reload
```

Backend docs:

```text
http://127.0.0.1:8000/docs
```

Health check:

```text
http://127.0.0.1:8000/health
```

### 5. Start the React Frontend

Open a second terminal:

```bash
cd app/frontend
npm install
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

## Example API Request

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Customer_Age": 45,
    "Gender": "M",
    "Dependent_count": 3,
    "Education_Level": "High School",
    "Marital_Status": "Married",
    "Income_Category": "$60K - $80K",
    "Card_Category": "Blue",
    "Months_on_book": 39,
    "Total_Relationship_Count": 5,
    "Months_Inactive_12_mon": 1,
    "Contacts_Count_12_mon": 3,
    "Credit_Limit": 12691.0,
    "Total_Revolving_Bal": 777,
    "Avg_Open_To_Buy": 11914.0,
    "Total_Amt_Chng_Q4_Q1": 1.335,
    "Total_Trans_Amt": 1144,
    "Total_Trans_Ct": 42,
    "Total_Ct_Chng_Q4_Q1": 1.625,
    "Avg_Utilization_Ratio": 0.061
  }'
```

## MLflow UI

To inspect experiment runs:

```bash
mlflow ui --backend-store-uri sqlite:///mlflow.db --default-artifact-root ./mlruns
```

Then open:

```text
http://127.0.0.1:5000
```

## Notes on Docker

Docker is intentionally not included in this project. The project is designed to run with:

- Python virtual environment for backend and ML code
- npm/Vite for frontend development

This keeps the project simpler and easier to understand for an internship portfolio.

## Current Limitations and Future Improvements

- Add automated backend tests for `/health` and `/predict`
- Add frontend tests for form validation and API error states
- Add screenshots or a short demo GIF to the README
- Add deployment instructions if the project is hosted later
- Add input validation notes for real-world business deployment
- Consider model monitoring if the project is extended beyond portfolio use

## Author

Anshumaan Sharma
