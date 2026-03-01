'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get('role') || 'student'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        role: role,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
        setIsLoading(false)
        return
      }

      // Redirect to correct dashboard path
      if (role === 'student') {
        router.push('/student/dashboard')
      } else if (role === 'manager') {
        router.push('/manager/dashboard')
      } else if (role === 'owner') {
        router.push('/owner/dashboard')
      }
    } catch (error) {
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-2 capitalize">{role} Login</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Use demo credentials below</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Demo credentials buttons */}
          <div className="mb-4 grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => setFormData({ email: 'student@pg.com', password: 'student123' })}
              className="text-sm text-blue-600 hover:underline"
            >
              📋 Fill Student Demo
            </button>
            <button
              type="button"
              onClick={() => setFormData({ email: 'manager@pg.com', password: 'manager123' })}
              className="text-sm text-green-600 hover:underline"
            >
              📋 Fill Manager Demo
            </button>
            <button
              type="button"
              onClick={() => setFormData({ email: 'owner@pg.com', password: 'owner123' })}
              className="text-sm text-purple-600 hover:underline"
            >
              📋 Fill Owner Demo
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-blue-600 hover:underline text-sm">← Back to Home</a>
        </div>
      </div>
    </div>
  )
}