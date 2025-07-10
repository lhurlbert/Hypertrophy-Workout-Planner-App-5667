// Mock OpenAI analysis for demo purposes
export const analyzeWorkoutAndUpdateMuscleStatus = async (sessionData, userProfile) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock analysis based on exercise names
  const exerciseNames = sessionData.exerciseLogs.map(log => log.exerciseName.toLowerCase())
  const muscleUpdates = []
  
  // Simple muscle group detection
  const muscleGroups = {
    chest: ['bench', 'press', 'fly', 'dip'],
    shoulders: ['shoulder', 'press', 'raise', 'overhead'],
    triceps: ['tricep', 'dip', 'press'],
    back: ['row', 'pull', 'lat', 'pulldown'],
    biceps: ['curl', 'chin'],
    quads: ['squat', 'lunge', 'leg press'],
    hamstrings: ['deadlift', 'curl', 'romanian'],
    glutes: ['squat', 'deadlift', 'hip']
  }
  
  // Calculate volume and status for detected muscles
  Object.entries(muscleGroups).forEach(([muscle, keywords]) => {
    const relevantExercises = sessionData.exerciseLogs.filter(log => 
      keywords.some(keyword => log.exerciseName.toLowerCase().includes(keyword))
    )
    
    if (relevantExercises.length > 0) {
      const totalVolume = relevantExercises.reduce((sum, ex) => 
        sum + (ex.sets * ex.reps * ex.loadKg), 0
      )
      
      let status = 'fresh'
      let recoveryHours = 24
      
      if (totalVolume > 2000) {
        status = 'fatigued'
        recoveryHours = 72
      } else if (totalVolume > 1000) {
        status = 'moderate'
        recoveryHours = 48
      }
      
      muscleUpdates.push({
        muscle,
        cumulativeVolume: totalVolume,
        estRecoveryHrs: recoveryHours,
        status
      })
    }
  })
  
  return {
    muscleUpdates,
    nextWorkoutSuggestions: [
      "Focus on muscles showing 'fresh' status for optimal growth",
      "Allow fatigued muscles 48-72 hours recovery time"
    ]
  }
}