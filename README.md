# 🧠 MindScore AI

### Student Mental Health Prediction System

MindScore AI is a machine learning web application that predicts a student's mental health score based on different personal, academic, lifestyle, stress, and social media usage factors.

I built this project to understand how a machine learning model can be connected to a real web application and deployed online.

## 🌐 Live Demo

🔗 https://mindscore-cwgk.onrender.com/

## 📌 About the Project

The application collects information from the user and sends it to a FastAPI backend.

The backend processes the input and uses a trained machine learning model to generate a predicted mental health score on a **0–10 scale**.

The prediction is then displayed on the website using an interactive score indicator.

### Workflow

```text
User Input
    ↓
HTML / CSS / JavaScript
    ↓
FastAPI REST API
    ↓
Data Validation
    ↓
Machine Learning Model
    ↓
Mental Health Score
    ↓
Result displayed on Website
