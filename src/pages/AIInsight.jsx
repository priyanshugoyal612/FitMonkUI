export default function AIInsights({ insights = [] }) {

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 
      border border-gray-800 
      rounded-2xl p-6 shadow-xl">

      <h2 className="text-xl mb-4">AI Insights</h2>

      {insights.length === 0 ? (
        <p className="text-gray-400">No insights available</p>
      ) : (
        <div className="space-y-3">
          {insights.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-3 rounded-lg"
            >
              ⚡ {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}