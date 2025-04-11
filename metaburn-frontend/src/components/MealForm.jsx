import { useState } from 'react'

export default function MealForm({ setResult }) {
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fats, setFats] = useState('')

  const totalCalories = protein * 4 + carbs * 4 + fats * 9

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://127.0.0.1:8000/calculate-tef', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protein_g: Number(protein),
        carbs_g: Number(carbs),
        fats_g: Number(fats),
        total_calories: totalCalories,
      }),
    })

    const data = await response.json()
    setResult(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <label>Protein (g):</label>
        <input
          className="border p-1 rounded w-24 text-right"
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <label>Carbs (g):</label>
        <input
          className="border p-1 rounded w-24 text-right"
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <label>Fats (g):</label>
        <input
          className="border p-1 rounded w-24 text-right"
          type="number"
          value={fats}
          onChange={(e) => setFats(e.target.value)}
        />
      </div>

      <p className="text-center text-gray-600">
        Auto-calculated Total Calories: {totalCalories.toFixed(2)}
      </p>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
        Calculate TEF
      </button>
    </form>
  )
}
