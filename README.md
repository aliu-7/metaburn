# Metaburn MVP - Dynamic Thermic Effect of Food (TEF) Engine

## Overview
Metaburn estimates the Thermic Effect of Food based on user meal logs. It adjusts net calories to help users track more accurately.

Built with:
- Python FastAPI
- REST API Architecture
- Clean Code Practices

---

## API Endpoints

### POST /calculate-tef
Estimate TEF from a single meal log.

#### Request Body:
```json
{
  "protein_g": 150,
  "carbs_g": 200,
  "fats_g": 70,
  "total_calories": 2500
}
