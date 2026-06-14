"""SHAP helper utilities for the churn prediction project."""

from __future__ import annotations

import numpy as np
import pandas as pd
import shap


def sample_features(
    features: pd.DataFrame,
    sample_size: int = 500,
    random_state: int = 42,
) -> pd.DataFrame:
    """Return a stable sample for explainability plots."""
    if len(features) <= sample_size:
        return features.copy()
    return features.sample(sample_size, random_state=random_state)


def explain_binary_tree_model(model, features: pd.DataFrame):
    """Create SHAP values for the positive class of a binary tree model."""
    explainer = shap.TreeExplainer(model)
    explanation = explainer(features)

    values = explanation.values
    base_values = explanation.base_values

    if values.ndim == 3:
        values = values[:, :, 1]
        base_values = base_values[:, 1]

    return shap.Explanation(
        values=values,
        base_values=base_values,
        data=features.to_numpy(),
        feature_names=list(features.columns),
    )


def top_shap_features(explanation, top_n: int = 15) -> pd.DataFrame:
    """Rank features by mean absolute SHAP value."""
    importance = np.abs(explanation.values).mean(axis=0)
    return (
        pd.DataFrame(
            {
                "feature": explanation.feature_names,
                "mean_abs_shap": importance,
            }
        )
        .sort_values("mean_abs_shap", ascending=False)
        .head(top_n)
        .reset_index(drop=True)
    )
