import exerciseDatabase from '../data/exerciseDatabase';

// Enhanced OpenAI analysis for demo purposes
export const analyzeWorkoutAndUpdateMuscleStatus = async (sessionData, userProfile) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get exercise details from our database
    const exerciseLogs = sessionData.exercise_logs.map(log => {
      const exerciseInfo = exerciseDatabase.find(
        ex => ex.name.toLowerCase() === log.exerciseName.toLowerCase()
      );
      
      return {
        ...log,
        exerciseInfo: exerciseInfo || {
          primaryMuscle: 'unknown',
          secondaryMuscles: [],
          category: 'unknown'
        }
      };
    });
    
    // Track affected muscles
    const affectedMuscles = new Map();
    
    // Process each exercise
    exerciseLogs.forEach(log => {
      const { exerciseInfo, sets, reps, loadKg } = log;
      const volume = sets * reps * loadKg;
      
      // Primary muscle gets full volume
      const primaryMuscle = exerciseInfo.primaryMuscle;
      if (primaryMuscle !== 'unknown') {
        const currentVolume = affectedMuscles.get(primaryMuscle) || 0;
        affectedMuscles.set(primaryMuscle, currentVolume + volume);
      }
      
      // Secondary muscles get partial volume (60%)
      exerciseInfo.secondaryMuscles.forEach(muscle => {
        const currentVolume = affectedMuscles.get(muscle) || 0;
        affectedMuscles.set(muscle, currentVolume + (volume * 0.6));
      });
    });
    
    // Calculate muscle status based on volume
    const muscleUpdates = [];
    
    affectedMuscles.forEach((volume, muscle) => {
      let status = 'fresh';
      let recoveryHours = 24;
      
      // Determine fatigue level based on volume
      if (volume > 2000) {
        status = 'fatigued';
        recoveryHours = 72;
      } else if (volume > 1000) {
        status = 'moderate';
        recoveryHours = 48;
      }
      
      // Add RPE factor
      recoveryHours = Math.min(96, recoveryHours * (sessionData.perceived_exertion / 5));
      
      muscleUpdates.push({
        muscle,
        cumulativeVolume: Math.round(volume),
        estRecoveryHrs: Math.round(recoveryHours),
        status
      });
    });
    
    // Add general fatigue if no specific muscles detected
    if (muscleUpdates.length === 0) {
      const totalVolume = sessionData.exercise_logs.reduce(
        (sum, ex) => sum + (ex.sets * ex.reps * ex.loadKg), 0
      );
      
      muscleUpdates.push({
        muscle: 'general',
        cumulativeVolume: totalVolume,
        estRecoveryHrs: 48 * (sessionData.perceived_exertion / 5),
        status: sessionData.perceived_exertion > 7 ? 'fatigued' : 'moderate'
      });
    }
    
    // Generate recommendations based on exercise selection
    const muscleGroups = [...new Set(muscleUpdates.map(m => m.muscle))];
    const suggestions = [
      `Focus on muscles not trained today: ${getUntrainedMuscleGroups(muscleGroups).join(', ')}`,
      `Allow ${muscleGroups.join(', ')} to recover for ${Math.min(...muscleUpdates.map(m => m.estRecoveryHrs))}+ hours`
    ];
    
    return {
      muscleUpdates,
      nextWorkoutSuggestions: suggestions
    };
    
  } catch (error) {
    console.error('Error in analyzeWorkoutAndUpdateMuscleStatus:', error);
    
    // Return a fallback response
    return {
      muscleUpdates: [{
        muscle: 'general',
        cumulativeVolume: sessionData.exercise_logs.reduce(
          (sum, ex) => sum + (ex.sets * ex.reps * ex.loadKg), 0
        ),
        estRecoveryHrs: 48,
        status: 'moderate'
      }],
      nextWorkoutSuggestions: ["Workout saved successfully!"]
    };
  }
};

// Helper to get untrained muscle groups
function getUntrainedMuscleGroups(trainedMuscles) {
  const allMuscleGroups = [
    'chest', 'shoulders', 'triceps', 'back', 'lats', 'biceps', 
    'quads', 'hamstrings', 'glutes', 'calves', 'abs', 'core'
  ];
  
  return allMuscleGroups.filter(muscle => !trainedMuscles.includes(muscle));
}