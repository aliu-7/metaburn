from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Meal(BaseModel):
    protein: float
    carbs: float
    fats: float
    weight: float
    age: float
    activity_level: str
    total_calories: float


@app.post("/calculate-tef")
def calculate_tef(meal: Meal):
    tef_protein = 0.25
    tef_carbs = 0.08
    tef_fats = 0.03

    # Personalization Factor — Basic Example
    activity_multiplier = {
        "Sedentary": 1.0,
        "Lightly Active": 1.05,
        "Active": 1.1,
        "Very Active": 1.15,
    }

    multiplier = activity_multiplier.get(meal.activity_level, 1.0)

    base_tef = (
        meal.protein * 4 * tef_protein +
        meal.carbs * 4 * tef_carbs +
        meal.fats * 9 * tef_fats
    )

    tef = base_tef * multiplier
    adjusted_net_calories = meal.total_calories - tef

    return {
        "logged_calories": meal.total_calories,
        "estimated_tef": round(tef, 2),
        "adjusted_net_calories": round(adjusted_net_calories, 2),
        "notes": "TEF varies per individual based on lifestyle and body metrics.",
    }
