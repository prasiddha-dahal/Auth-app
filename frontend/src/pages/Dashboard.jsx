import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/auth/profile',
          { withCredentials: true }
        )

        setUser(res.data.user)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Dashboard
        </h1>

        {user ? (
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">
                Welcome 
              </p>
              <p className="text-xl font-bold text-blue-600">
                {user.username}
              </p>
            </div>

            <div className="text-gray-600">
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>

            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500 animate-pulse">Loading user data...</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
