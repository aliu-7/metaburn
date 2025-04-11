from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class Meal(BaseModel):
    protein_g: float
    carbs_g: float
    fats_g: float
    total_calories: float


@app.post("/calculate-tef")
def calculate_tef(meal: Meal):
    # TEF Factors
    tef_protein = 0.25
    tef_carbs = 0.08
    tef_fats = 0.03

    # Calculate TEF
    tef = (
        meal.protein_g * 4 * tef_protein +
        meal.carbs_g * 4 * tef_carbs +
        meal.fats_g * 9 * tef_fats
    )

    adjusted_net_calories = meal.total_calories - tef

    return {
        "logged_calories": meal.total_calories,
        "estimated_tef": round(tef, 2),
        "adjusted_net_calories": round(adjusted_net_calories, 2),
        "notes": "TEF varies per individual. This is an estimated adjustment.",
    }
