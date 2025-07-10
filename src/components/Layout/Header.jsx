import React from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'

const { FiUser, FiLogOut, FiActivity, FiRefreshCw } = FiIcons

const Header = () => {
  const { currentUser, signOut } = useAuth()

  const switchUser = () => {
    localStorage.removeItem('rp_current_user')
    window.location.reload()
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
              <SafeIcon icon={FiActivity} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RP Hypertrophy Coach</h1>
              <p className="text-xs text-gray-500">Intelligent Training Analysis</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-lg">{currentUser?.avatar || '👤'}</div>
              <div>
                <div className="font-medium text-gray-900">{currentUser?.name}</div>
                <div className="text-xs text-gray-500">Training Profile</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={switchUser}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Switch User"
              >
                <SafeIcon icon={FiRefreshCw} className="text-sm" />
                <span className="hidden sm:inline">Switch</span>
              </button>

              <button
                onClick={signOut}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="text-sm" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header