import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'
import { analyzeWorkoutAndUpdateMuscleStatus } from '../../lib/openai'
import toast from 'react-hot-toast'

const { FiPlus, FiTrash2, FiSave, FiActivity } = FiIcons

const WorkoutLogger = ({ onWorkoutSaved }) => {
  const { currentUser } = useAuth()
  const [exerciseLogs, setExerciseLogs] = useState([
    { exerciseName: '', sets: 1, reps: 10, loadKg: 20 }
  ])
  const [perceivedExertion, setPerceivedExertion] = useState(7)
  const [loading, setLoading] = useState(false)

  const addExercise = () => {
    setExerciseLogs([...exerciseLogs, { exerciseName: '', sets: 1, reps: 10, loadKg: 20 }])
  }

  const removeExercise = (index) => {
    setExerciseLogs(exerciseLogs.filter((_, i) => i !== index))
  }

  const updateExercise = (index, field, value) => {
    const updated = [...exerciseLogs]
    updated[index][field] = value
    setExerciseLogs(updated)
  }

  const saveWorkout = async () => {
    if (exerciseLogs.some(log => !log.exerciseName.trim())) {
      toast.error('Please fill in all exercise names')
      return
    }

    setLoading(true)
    try {
      const sessionData = {
        id: Date.now().toString(),
        user_id: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        exercise_logs: exerciseLogs,
        perceived_exertion: perceivedExertion,
        created_at: new Date().toISOString()
      }

      // Save session to localStorage
      const sessionsKey = `rp_sessions_${currentUser.id}`
      const existingSessions = JSON.parse(localStorage.getItem(sessionsKey) || '[]')
      const updatedSessions = [sessionData, ...existingSessions]
      localStorage.setItem(sessionsKey, JSON.stringify(updatedSessions))

      // Analyze workout with AI (mock implementation)
      const analysis = await analyzeWorkoutAndUpdateMuscleStatus(sessionData, currentUser)
      
      if (analysis && analysis.muscleUpdates) {
        // Update muscle status in localStorage
        const muscleStatusKey = `rp_muscle_status_${currentUser.id}`
        const existingMuscleStatus = JSON.parse(localStorage.getItem(muscleStatusKey) || '[]')
        
        // Update or add muscle status
        const updatedMuscleStatus = [...existingMuscleStatus]
        
        analysis.muscleUpdates.forEach(update => {
          const existingIndex = updatedMuscleStatus.findIndex(m => m.muscle === update.muscle)
          const muscleData = {
            muscle: update.muscle,
            cumulative_volume: update.cumulativeVolume,
            est_recovery_hrs: update.estRecoveryHrs,
            status: update.status,
            timestamp: new Date().toISOString()
          }
          
          if (existingIndex >= 0) {
            updatedMuscleStatus[existingIndex] = muscleData
          } else {
            updatedMuscleStatus.push(muscleData)
          }
        })
        
        localStorage.setItem(muscleStatusKey, JSON.stringify(updatedMuscleStatus))
      }

      toast.success('Workout logged successfully!')
      setExerciseLogs([{ exerciseName: '', sets: 1, reps: 10, loadKg: 20 }])
      setPerceivedExertion(7)
      onWorkoutSaved?.()
    } catch (error) {
      console.error('Error saving workout:', error)
      toast.error('Failed to save workout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-primary-100 p-2 rounded-lg">
            <SafeIcon icon={FiActivity} className="text-primary-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Log Today's Workout</h2>
            <p className="text-gray-600">Track your exercises and let AI analyze your training</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Exercise Logs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercises</h3>
            <div className="space-y-4">
              {exerciseLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      value={log.exerciseName}
                      onChange={(e) => updateExercise(index, 'exerciseName', e.target.value)}
                      placeholder="e.g., Bench Press"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sets
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={log.sets}
                      onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reps
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={log.reps}
                      onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Load (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={log.loadKg}
                        onChange={(e) => updateExercise(index, 'loadKg', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    {exerciseLogs.length > 1 && (
                      <button
                        onClick={() => removeExercise(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={addExercise}
              className="mt-4 flex items-center space-x-2 px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add Exercise</span>
            </button>
          </div>

          {/* RPE */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Perceived Exertion (RPE)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                value={perceivedExertion}
                onChange={(e) => setPerceivedExertion(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-2xl font-bold text-primary-600 min-w-[3rem] text-center">
                {perceivedExertion}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Very Easy</span>
              <span>Maximum Effort</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveWorkout}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <SafeIcon icon={FiSave} />
              <span>{loading ? 'Analyzing & Saving...' : 'Save Workout'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutLogger