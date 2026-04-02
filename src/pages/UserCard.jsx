export default function UserCard({ user }) {

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 
border border-gray-800 
rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">User Info</h2>

      <p className="text-gray-400">Name</p>
      <p className="text-lg mb-2">{user.name}</p>

      <p className="text-gray-400">Current Streak</p>
      <p className="text-green-400 text-2xl font-bold">
        🔥 {user.streak} days
      </p>

      <p className="text-gray-400 mt-3">Score</p>
      <p className="text-blue-400 text-xl">{user.score}/100</p>

      <div className="mt-3">
  <p className="text-gray-400 text-sm">Score</p>
  <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
    <div
      className="bg-blue-500 h-2 rounded-full"
      style={{ width: "78%" }}
    />
  </div>
</div>
    </div>
  );
}