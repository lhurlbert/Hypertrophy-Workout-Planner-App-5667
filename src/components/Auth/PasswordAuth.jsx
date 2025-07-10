import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiLock, FiActivity, FiEye, FiEyeOff } = FiIcons

const PasswordAuth = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Simple password - you can change this
  const APP_PASSWORD = 'rp2024coach'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    if (password === APP_PASSWORD) {
      toast.success('Access granted!')
      localStorage.setItem('rp_authenticated', 'true')
      onAuthenticated()
    } else {
      toast.error('Incorrect password')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-xl inline-block mb-4">
              <SafeIcon icon={FiActivity} className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">RP Hypertrophy Coach</h1>
            <p className="text-gray-600">Intelligent training analysis for Krista & friends</p>
          </div>

          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <div className="flex items-center space-x-2 text-primary-700 mb-2">
              <SafeIcon icon={FiLock} className="text-sm" />
              <span className="text-sm font-medium">Private Access Required</span>
            </div>
            <p className="text-xs text-primary-600">
              Enter the password to access the training platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Verifying...' : 'Access App'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Contact Krista if you need the password
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PasswordAuth