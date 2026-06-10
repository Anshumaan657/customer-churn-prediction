# Phase 1: Business Understanding

## 1.1 Understand Customer Churn

Customer churn refers to customers discontinuing the use of a company's product or service.

In this project, churn is treated as a binary classification problem:

- Churned Customer → 1
- Non-Churned Customer → 0

The objective is to predict whether a customer is likely to leave the company.

---

## 1.2 Define Business Problem

### Problem Statement

The telecom company experiences customer churn, leading to revenue loss and increased customer acquisition costs.

### Objective

Develop a machine learning model capable of identifying customers who are likely to churn.

### Business Value

Early identification of at-risk customers enables the company to implement retention strategies such as:

- Personalized offers
- Improved customer support
- Better service recommendations
- Proactive customer engagement

---

## 1.3 Define Success Metrics

### Business Success Metrics

- Reduce customer churn rate
- Improve customer retention rate
- Minimize revenue loss associated with churn
- Increase the effectiveness of retention initiatives

### Machine Learning Success Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC Score

### Primary Metric

**Recall**

Reason:
Missing a customer who is likely to churn (False Negative) is typically more costly than incorrectly identifying a loyal customer as at risk (False Positive). Therefore, Recall is prioritized to maximize the identification of potential churners.

---

## Key Takeaways

- Customer churn prediction is a binary classification problem.
- The primary business objective is customer retention.
- Machine learning enables proactive intervention before customers leave.
- Business understanding is essential because models should solve real business problems rather than exist solely for predictive performance.
- In churn prediction, Recall is often the most critical evaluation metric due to the high cost of losing customers.

## Confusion Matrix in Customer Churn Prediction

Positive Class = Churn (1)
Negative Class = Not Churn (0)

### True Positive (TP)
The customer actually churned, and the model correctly predicted churn.

Business impact:
The company can proactively intervene to retain the customer.

---

### True Negative (TN)
The customer stayed, and the model correctly predicted that they would stay.

Business impact:
No retention action is required.

---

### False Positive (FP)
The customer stayed, but the model incorrectly predicted churn.

Business impact:
The company may spend unnecessary resources on retention efforts.

---

### False Negative (FN)
The customer churned, but the model incorrectly predicted that they would stay.

Business impact:
The company loses the customer and associated revenue.

---

In churn prediction, False Negatives are generally considered more costly than False Positives because losing an existing customer has a greater financial impact than offering unnecessary retention incentives.