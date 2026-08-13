# import joblib
# from fastapi import FastAPI
# from pydantic import BaseModel, Field
# import pandas as pd
# from typing import Literal
# from fastapi.middleware.cors import CORSMiddleware

# model = joblib.load('Mental_Heath_Model.pkl')
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class StudentData(BaseModel):
#     Age: int = Field(..., ge=10, le=100)
#     Gender: Literal['Male','Female','Other']
#     Country: str
#     Academic_Level: Literal['High School','Undergraduate','Postgraduate','PhD','Other']
#     Most_Used_Platform: Literal['Instagram','Facebook','Twitter','Snapchat','TikTok','YouTube','Reddit','Other']
#     Purpose_Of_Use: Literal['Socializing','Entertainment','Education','News','Other']
#     Avg_Daily_Usage_Hours: float = Field(..., ge=0, le=24)
#     Daily_Unlocks: int = Field(..., ge=0)
#     Study_Hours: int = Field(..., ge=0, le=24)
#     Physical_Activity_Hours: int = Field(..., ge=0, le=24)
#     Sleep_Hours_Per_Night: int = Field(..., ge=0, le=24)
#     Stress_Level: Literal['Low','Medium','High','Very High']


# class PredictionResponse(BaseModel):
#     Predict_Mental_Health_Score: float

# @app.get('/')
# def greeting():
#     return {'This is your first ML Project! Congrats❤️👍💃'}

# top_countries = ['Other','India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France']

# @app.post('/predict', response_model=PredictionResponse)
# def predict(data: StudentData):
#     country_group = 'Other' if data.Country not in top_countries else data.Country
#     input_row = pd.DataFrame([{
#         'Age' : data.Age,
#         'Gender' : data.Gender,
#         'Academic_Level' : data.Academic_Level,
#         'Most_Used_Platform' : data.Most_Used_Platform,
#         'Purpose_Of_Use' : data.Purpose_Of_Use,
#         'Avg_Daily_Usage_Hours' : data.Avg_Daily_Usage_Hours,
#         'Daily_Unlocks' : data.Daily_Unlocks,
#         'Study_Hours' : data.Study_Hours,
#         'Physical_Activity_Hours' : data.Physical_Activity_Hours,
#         'Sleep_Hours_Per_Night' : data.Sleep_Hours_Per_Night,
#         'Stress_Level' : data.Stress_Level,
#         'Grouped_country' : country_group
#     }])

#     prediction = model.predict(input_row)[0]
#     return PredictionResponse(Predict_Mental_Health_Score=round(float(prediction), 2))



import joblib
from fastapi import FastAPI
from pydantic import BaseModel, Field
import pandas as pd
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware

model = joblib.load("Mental_Heath_Model.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StudentData(BaseModel):
    Age: int = Field(..., ge=10, le=100)
    Gender: Literal["Male", "Female", "Other"]
    Country: str
    Academic_Level: Literal[
        "High School",
        "Undergraduate",
        "Postgraduate",
        "PhD",
        "Other"
    ]
    Most_Used_Platform: Literal[
        "Instagram",
        "Facebook",
        "Twitter",
        "Snapchat",
        "TikTok",
        "YouTube",
        "Reddit",
        "Other"
    ]
    Purpose_Of_Use: Literal[
        "Socializing",
        "Entertainment",
        "Education",
        "News",
        "Other"
    ]
    Avg_Daily_Usage_Hours: float = Field(..., ge=0, le=24)
    Daily_Unlocks: int = Field(..., ge=0)
    Study_Hours: int = Field(..., ge=0, le=24)
    Physical_Activity_Hours: int = Field(..., ge=0, le=24)
    Sleep_Hours_Per_Night: int = Field(..., ge=0, le=24)
    Stress_Level: Literal["Low", "Medium", "High", "Very High"]


class PredictionResponse(BaseModel):
    Predict_Mental_Health_Score: float


@app.get("/")
def greeting():
    return {
        "message": "This is your first ML Project! Congrats ❤️👍💃"
    }


top_countries = [
    "Other",
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "Mexico",
    "Turkey",
    "France"
]


@app.post("/predict", response_model=PredictionResponse)
def predict(data: StudentData):

    country_group = (
        "Other"
        if data.Country not in top_countries
        else data.Country
    )

    input_row = pd.DataFrame([{
        "Age": data.Age,
        "Gender": data.Gender,
        "Academic_Level": data.Academic_Level,
        "Most_Used_Platform": data.Most_Used_Platform,
        "Purpose_Of_Use": data.Purpose_Of_Use,
        "Avg_Daily_Usage_Hours": data.Avg_Daily_Usage_Hours,
        "Daily_Unlocks": data.Daily_Unlocks,
        "Study_Hours": data.Study_Hours,
        "Physical_Activity_Hours": data.Physical_Activity_Hours,
        "Sleep_Hours_Per_Night": data.Sleep_Hours_Per_Night,
        "Stress_Level": data.Stress_Level,
        "Grouped_country": country_group
    }])

    prediction = model.predict(input_row)[0]

    return PredictionResponse(
        Predict_Mental_Health_Score=round(float(prediction), 2)
    )