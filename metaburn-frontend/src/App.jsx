import { useState } from 'react'
import MealForm from './components/MealForm'
import TEFResult from './components/TEFResult'

export default function App() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile')
    return savedProfile ? JSON.parse(savedProfile) : { weight: '', age: '', activity: 'Lightly Active' }
  })

  const [result, setResult] = useState(null)

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const saveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Metaburn</h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Smarter calorie tracking powered by the Thermic Effect of Food (TEF). Enter your profile and meal, and we'll give a more accurate calorie estimate based on science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section - Profile */}
          <div className="bg-white p-4 rounded-2xl shadow space-y-3 border">
            <h2 className="text-xl font-bold text-blue-700">Your Profile</h2>
            <input name="weight" type="number" placeholder="Weight (lbs)" value={profile.weight} onChange={handleProfileChange} className="border p-2 rounded w-full bg-white" />
            <input name="age" type="number" placeholder="Age" value={profile.age} onChange={handleProfileChange} className="border p-2 rounded w-full bg-white" />
            <select name="activity" value={profile.activity} onChange={handleProfileChange} className="border p-2 rounded w-full bg-white">
              <option>Sedentary</option>
              <option>Lightly Active</option>
              <option>Active</option>
              <option>Very Active</option>
            </select>
            <button onClick={saveProfile} className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700">Save Profile</button>
          </div>

          {/* Center Section - Calculator */}
          <div className="bg-white p-4 rounded-2xl shadow border">
            <MealForm setResult={setResult} profile={profile} />
          </div>

          {/* Right Section - Results */}
          <div className="bg-white p-4 rounded-2xl shadow border">
            {result ? (
              <TEFResult result={result} />
            ) : (
              <p className="text-center text-gray-500">Your TEF results will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}