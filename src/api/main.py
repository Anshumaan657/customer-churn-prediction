from fastapi import FastAPI, HTTPException

from src.api.prediction import artifacts_are_loaded, predict_churn
from src.api.schemas import CustomerInput, HealthResponse, PredictionResponse


app = FastAPI(
    title="Customer Churn Prediction API",
    description="FastAPI backend for predicting credit card customer churn risk.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Customer Churn Prediction API",
        "docs": "/docs",
        "health": "/health",
        "predict": "/predict",
    }


@app.get("/health", response_model=HealthResponse)
def health_check():
    model_loaded, preprocessor_loaded = artifacts_are_loaded()
    return {
        "status": "ok",
        "model_loaded": model_loaded,
        "preprocessor_loaded": preprocessor_loaded,
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(customer: CustomerInput):
    try:
        return predict_churn(customer)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}",
        ) from exc
