import React from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiActivity, FiClock, FiTrendingUp } = FiIcons

const MuscleStatusCard = ({ muscle, status, recoveryHours, volume }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'fresh':
        return 'text-muscle-fresh bg-green-50 border-green-200'
      case 'moderate':
        return 'text-muscle-moderate bg-yellow-50 border-yellow-200'
      case 'fatigued':
        return 'text-muscle-fatigued bg-red-50 border-red-200'
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fresh':
        return '🟢'
      case 'moderate':
        return '🟡'
      case 'fatigued':
        return '🔴'
      default:
        return '⚪'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${getStatusColor(status)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getStatusIcon(status)}</span>
          <h3 className="font-semibold text-gray-900 capitalize">{muscle}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiClock} className="text-gray-500" />
            <span className="text-gray-600">Recovery</span>
          </div>
          <span className="font-medium">{recoveryHours}h</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiTrendingUp} className="text-gray-500" />
            <span className="text-gray-600">Volume</span>
          </div>
          <span className="font-medium">{volume?.toLocaleString() || 0}</span>
        </div>
      </div>

      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            status === 'fresh' ? 'bg-muscle-fresh' :
            status === 'moderate' ? 'bg-muscle-moderate' : 'bg-muscle-fatigued'
          }`}
          style={{
            width: `${Math.min(100, (recoveryHours / 72) * 100)}%`
          }}
        />
      </div>
    </motion.div>
  )
}

export default MuscleStatusCard