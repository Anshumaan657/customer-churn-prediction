from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class CustomerInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    customer_age: int = Field(..., alias="Customer_Age", ge=18, le=100)
    gender: Literal["M", "F"] = Field(..., alias="Gender")
    dependent_count: int = Field(..., alias="Dependent_count", ge=0)
    education_level: Literal[
        "College",
        "Doctorate",
        "Graduate",
        "High School",
        "Post-Graduate",
        "Uneducated",
        "Unknown",
    ] = Field(..., alias="Education_Level")
    marital_status: Literal["Divorced", "Married", "Single", "Unknown"] = Field(
        ..., alias="Marital_Status"
    )
    income_category: Literal[
        "$120K +",
        "$40K - $60K",
        "$60K - $80K",
        "$80K - $120K",
        "Less than $40K",
        "Unknown",
    ] = Field(..., alias="Income_Category")
    card_category: Literal["Blue", "Gold", "Platinum", "Silver"] = Field(
        ..., alias="Card_Category"
    )
    months_on_book: int = Field(..., alias="Months_on_book", ge=0)
    total_relationship_count: int = Field(
        ..., alias="Total_Relationship_Count", ge=0
    )
    months_inactive_12_mon: int = Field(..., alias="Months_Inactive_12_mon", ge=0)
    contacts_count_12_mon: int = Field(..., alias="Contacts_Count_12_mon", ge=0)
    credit_limit: float = Field(..., alias="Credit_Limit", ge=0)
    total_revolving_bal: int = Field(..., alias="Total_Revolving_Bal", ge=0)
    avg_open_to_buy: float = Field(..., alias="Avg_Open_To_Buy", ge=0)
    total_amt_chng_q4_q1: float = Field(..., alias="Total_Amt_Chng_Q4_Q1", ge=0)
    total_trans_amt: int = Field(..., alias="Total_Trans_Amt", ge=0)
    total_trans_ct: int = Field(..., alias="Total_Trans_Ct", ge=0)
    total_ct_chng_q4_q1: float = Field(..., alias="Total_Ct_Chng_Q4_Q1", ge=0)
    avg_utilization_ratio: float = Field(
        ..., alias="Avg_Utilization_Ratio", ge=0, le=1
    )


class PredictionResponse(BaseModel):
    prediction: int
    prediction_label: Literal["Existing Customer", "Attrited Customer"]
    churn_probability: float
    risk_level: Literal["Low", "Medium", "High"]
    recommendation: str


class HealthResponse(BaseModel):
    status: Literal["ok"]
    model_loaded: bool
    preprocessor_loaded: bool
