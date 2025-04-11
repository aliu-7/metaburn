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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-br from-blue-100 to-blue-200">

      {/* Left - User Profile */}
      <div className="bg-white p-4 rounded-2xl shadow-xl space-y-4">
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

      {/* Center - Macro Calculator */}
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-blue-700">Metaburn</h1>
        <MealForm setResult={setResult} profile={profile} />
      </div>

      {/* Right - TEF Results */}
      <div className="bg-white p-4 rounded-2xl shadow-xl">
        {result ? (
          <TEFResult result={result} />
        ) : (
          <p className="text-center text-gray-500">Your TEF results will appear here.</p>
        )}
      </div>
    </div>
  )
}
