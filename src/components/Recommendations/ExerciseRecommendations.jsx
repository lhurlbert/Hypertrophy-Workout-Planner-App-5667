import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiTarget, FiCheckCircle, FiAlertCircle, FiInfo } = FiIcons

const ExerciseRecommendations = ({ muscleStatus }) => {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    generateRecommendations()
  }, [muscleStatus])

  const generateRecommendations = () => {
    const freshMuscles = muscleStatus.filter(m => m.status === 'fresh')
    const moderateMuscles = muscleStatus.filter(m => m.status === 'moderate')
    const fatiguedMuscles = muscleStatus.filter(m => m.status === 'fatigued')

    const exerciseDatabase = [
      // Push exercises
      { name: 'Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['shoulders', 'triceps'], equipment: ['barbell', 'bench'] },
      { name: 'Incline Dumbbell Press', primaryMuscle: 'chest', secondaryMuscles: ['shoulders'], equipment: ['dumbbells', 'bench'] },
      { name: 'Overhead Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'], equipment: ['barbell'] },
      { name: 'Lateral Raises', primaryMuscle: 'shoulders', secondaryMuscles: [], equipment: ['dumbbells'] },
      { name: 'Tricep Dips', primaryMuscle: 'triceps', secondaryMuscles: ['chest'], equipment: ['dip bars'] },
      
      // Pull exercises
      { name: 'Pull-ups', primaryMuscle: 'lats', secondaryMuscles: ['biceps', 'rhomboids'], equipment: ['pull-up bar'] },
      { name: 'Barbell Rows', primaryMuscle: 'lats', secondaryMuscles: ['rhomboids', 'biceps'], equipment: ['barbell'] },
      { name: 'Face Pulls', primaryMuscle: 'rear delts', secondaryMuscles: ['rhomboids'], equipment: ['cables'] },
      { name: 'Bicep Curls', primaryMuscle: 'biceps', secondaryMuscles: [], equipment: ['dumbbells'] },
      
      // Legs
      { name: 'Squats', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['barbell'] },
      { name: 'Romanian Deadlifts', primaryMuscle: 'hamstrings', secondaryMuscles: ['glutes'], equipment: ['barbell'] },
      { name: 'Bulgarian Split Squats', primaryMuscle: 'quads', secondaryMuscles: ['glutes'], equipment: ['dumbbells'] },
      { name: 'Calf Raises', primaryMuscle: 'calves', secondaryMuscles: [], equipment: ['dumbbells'] },
    ]

    const newRecommendations = []

    // Recommend exercises for fresh muscles
    freshMuscles.forEach(muscle => {
      const suitableExercises = exerciseDatabase.filter(ex => 
        ex.primaryMuscle === muscle.muscle || ex.secondaryMuscles.includes(muscle.muscle)
      )
      
      suitableExercises.forEach(exercise => {
        newRecommendations.push({
          ...exercise,
          reason: `${muscle.muscle} is fresh and ready for training`,
          priority: 'high',
          status: 'recommended'
        })
      })
    })

    // Light work for moderate muscles
    moderateMuscles.forEach(muscle => {
      const lightExercises = exerciseDatabase.filter(ex => 
        ex.secondaryMuscles.includes(muscle.muscle)
      )
      
      lightExercises.slice(0, 2).forEach(exercise => {
        newRecommendations.push({
          ...exercise,
          reason: `Light work for ${muscle.muscle} (moderate fatigue)`,
          priority: 'medium',
          status: 'caution'
        })
      })
    })

    // Avoid fatigued muscles
    fatiguedMuscles.forEach(muscle => {
      newRecommendations.push({
        name: `Avoid ${muscle.muscle} exercises`,
        primaryMuscle: muscle.muscle,
        reason: `${muscle.muscle} needs ${muscle.estRecoveryHrs}h recovery`,
        priority: 'low',
        status: 'avoid'
      })
    })

    setRecommendations(newRecommendations)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'recommended':
        return FiCheckCircle
      case 'caution':
        return FiAlertCircle
      case 'avoid':
        return FiTarget
      default:
        return FiInfo
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'recommended':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'caution':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'avoid':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (!muscleStatus.length) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <SafeIcon icon={FiTarget} className="text-4xl text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Data for Recommendations</h3>
        <p className="text-gray-600">Log some workouts first to get personalized exercise suggestions</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Exercise Recommendations</h2>
        <p className="text-gray-600">Based on your current muscle recovery status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${getStatusColor(rec.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={getStatusIcon(rec.status)} className="text-lg" />
                <h3 className="font-semibold text-gray-900">{rec.name}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(rec.status)}`}>
                {rec.status}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-3">{rec.reason}</p>

            {rec.equipment && (
              <div className="flex flex-wrap gap-1">
                {rec.equipment.map((equip, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {equip}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No specific recommendations available. Try logging more workouts!</p>
        </div>
      )}
    </div>
  )
}

export default ExerciseRecommendations