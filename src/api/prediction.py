from functools import lru_cache

import joblib
import pandas as pd

from src.api.schemas import CustomerInput
from src.api.utils import (
    FEATURE_COLUMNS,
    MODEL_PATH,
    PREPROCESSOR_PATH,
    get_recommendation,
    get_risk_level,
)


@lru_cache(maxsize=1)
def load_preprocessor():
    return joblib.load(PREPROCESSOR_PATH)


@lru_cache(maxsize=1)
def load_model():
    return joblib.load(MODEL_PATH)


def artifacts_are_loaded() -> tuple[bool, bool]:
    try:
        load_model()
        model_loaded = True
    except Exception:
        model_loaded = False

    try:
        load_preprocessor()
        preprocessor_loaded = True
    except Exception:
        preprocessor_loaded = False

    return model_loaded, preprocessor_loaded


def build_input_dataframe(customer: CustomerInput) -> pd.DataFrame:
    raw_input = customer.model_dump(by_alias=True)
    return pd.DataFrame([raw_input], columns=FEATURE_COLUMNS)


def predict_churn(customer: CustomerInput) -> dict:
    preprocessor = load_preprocessor()
    model = load_model()

    input_df = build_input_dataframe(customer)
    processed_input = preprocessor.transform(input_df)

    prediction = int(model.predict(processed_input)[0])
    churn_probability = float(model.predict_proba(processed_input)[0, 1])
    prediction_label = (
        "Attrited Customer" if prediction == 1 else "Existing Customer"
    )
    risk_level = get_risk_level(churn_probability)

    return {
        "prediction": prediction,
        "prediction_label": prediction_label,
        "churn_probability": round(churn_probability, 4),
        "risk_level": risk_level,
        "recommendation": get_recommendation(risk_level),
    }
