export default function TEFResult({ result }) {
  return (
    <div className="text-gray-700">
      <p><strong>Logged Calories:</strong> {result.logged_calories}</p>
      <p><strong>Estimated TEF:</strong> {result.estimated_tef}</p>
      <p><strong>Adjusted Net Calories:</strong> {result.adjusted_net_calories}</p>
      <p className="text-sm mt-2">{result.notes}</p>
    </div>
  )
}
