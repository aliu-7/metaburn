export default function TEFResult({ result }) {
    return (
      <div className="space-y-2 text-gray-700">
        <p>Logged Calories: {result.logged_calories}</p>
        <p>Estimated TEF: {result.estimated_tef}</p>
        <p>Adjusted Net Calories: {result.adjusted_net_calories}</p>
        <p className="text-sm text-gray-500">{result.notes}</p>
      </div>
    )
  }
  