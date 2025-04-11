import { useState, useEffect } from 'react'

const exampleFoods = {
  'White Rice (1 cup)': { protein: 4, carbs: 45, fats: 0.4 },
  'Chicken Breast (100g)': { protein: 31, carbs: 0, fats: 3.6 },
  'Egg (1 large)': { protein: 6, carbs: 1, fats: 5 },
  'Manual Entry': null,
}

export default function MealForm({ setResult, profile }) {
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fats, setFats] = useState('')
  const [selectedFood, setSelectedFood] = useState('Manual Entry')

  useEffect(() => {
    if (selectedFood !== 'Manual Entry') {
      const macros = exampleFoods[selectedFood]
      setProtein(macros.protein)
      setCarbs(macros.carbs)
      setFats(macros.fats)
      handleSubmit(macros)
    }
  }, [selectedFood])

  const handleSubmit = async (overrideValues) => {
    const data = {
      protein: parseFloat((overrideValues?.protein ?? protein) || 0),
      carbs: parseFloat((overrideValues?.carbs ?? carbs) || 0),
      fats: parseFloat((overrideValues?.fats ?? fats) || 0),
      weight: parseFloat(profile.weight) || 0,
      age: parseFloat(profile.age) || 0,
      activity_level: profile.activity,
    }
    data.total_calories = data.protein * 4 + data.carbs * 4 + data.fats * 9

    const response = await fetch('http://127.0.0.1:8000/calculate-tef', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    setResult(result)
  }

  return (
    <>
      <select
        value={selectedFood}
        onChange={(e) => setSelectedFood(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        {Object.keys(exampleFoods).map((food) => (
          <option key={food} value={food}>
            {food}
          </option>
        ))}
      </select>

      <div className="space-y-2">
        <label>Protein (g):</label>
        <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-full p-2 border rounded bg-white" />

        <label>Carbs (g):</label>
        <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} className="w-full p-2 border rounded bg-white" />

        <label>Fats (g):</label>
        <input type="number" value={fats} onChange={(e) => setFats(e.target.value)} className="w-full p-2 border rounded bg-white" />
      </div>

      <button onClick={() => handleSubmit()} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Calculate TEF
      </button>
    </>
  )
}
