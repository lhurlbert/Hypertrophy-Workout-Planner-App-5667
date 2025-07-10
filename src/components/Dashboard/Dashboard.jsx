import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import MuscleStatusCard from './MuscleStatusCard'
import WorkoutLogger from '../Workout/WorkoutLogger'
import ExerciseRecommendations from '../Recommendations/ExerciseRecommendations'
import { useAuth } from '../../contexts/AuthContext'

const { FiPlus, FiBarChart3, FiTarget, FiCalendar } = FiIcons

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [muscleStatus, setMuscleStatus] = useState([])
  const [recentSessions, setRecentSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
      loadDashboardData()
    }
  }, [currentUser])

  const loadDashboardData = async () => {
    try {
      // Load data from localStorage for now (since we removed Supabase)
      const userKey = `rp_muscle_status_${currentUser.id}`
      const sessionsKey = `rp_sessions_${currentUser.id}`
      
      const storedMuscleStatus = localStorage.getItem(userKey)
      const storedSessions = localStorage.getItem(sessionsKey)
      
      setMuscleStatus(storedMuscleStatus ? JSON.parse(storedMuscleStatus) : [])
      setRecentSessions(storedSessions ? JSON.parse(storedSessions) : [])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'log-workout', label: 'Log Workout', icon: FiPlus },
    { id: 'recommendations', label: 'Exercise Suggestions', icon: FiTarget },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse-slow">
          <SafeIcon icon={FiBarChart3} className="text-4xl text-primary-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser.name}! {currentUser.avatar}
        </h1>
        <p className="text-gray-600">Ready to crush your next workout?</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Muscle Status Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Muscle Recovery Status</h2>
              {muscleStatus.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {muscleStatus.map((muscle, index) => (
                    <MuscleStatusCard
                      key={index}
                      muscle={muscle.muscle}
                      status={muscle.status}
                      recoveryHours={muscle.est_recovery_hrs}
                      volume={muscle.cumulative_volume}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <SafeIcon icon={FiCalendar} className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Training Data Yet</h3>
                  <p className="text-gray-600 mb-4">Log your first workout to see muscle recovery analysis</p>
                  <button
                    onClick={() => setActiveTab('log-workout')}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Log Your First Workout
                  </button>
                </div>
              )}
            </div>

            {/* Recent Sessions */}
            {recentSessions.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Sessions</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {recentSessions.slice(0, 5).map((session, index) => (
                    <div
                      key={session.id}
                      className={`p-4 ${index > 0 ? 'border-t border-gray-100' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(session.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {session.exercise_logs?.length || 0} exercises • RPE {session.perceived_exertion}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            Total Volume: {session.exercise_logs?.reduce((sum, log) => sum + (log.sets * log.reps * log.loadKg), 0)?.toLocaleString() || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'log-workout' && (
          <WorkoutLogger onWorkoutSaved={loadDashboardData} />
        )}

        {activeTab === 'recommendations' && (
          <ExerciseRecommendations muscleStatus={muscleStatus} />
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard