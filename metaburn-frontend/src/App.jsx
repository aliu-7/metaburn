import { useState } from 'react'
import MealForm from './components/MealForm'
import TEFResult from './components/TEFResult'

export default function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold mb-4 text-center text-blue-700">
        Metaburn
      </h1>

      <p className="mb-8 text-center text-gray-700 max-w-lg text-lg">
        Smarter calorie tracking powered by Thermic Effect of Food (TEF). Enter your meal's macros — we'll adjust calories intelligently.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <MealForm setResult={setResult} />
        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Results:
            </h2>
            <TEFResult result={result} />
          </div>
        )}
      </div>
    </div>
  )
}
