// Exercise database with categorization by muscle groups and equipment
const exerciseDatabase = [
  // Chest exercises
  {
    name: "Bench Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["barbell", "bench"],
    category: "push"
  },
  {
    name: "Incline Bench Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["barbell", "incline bench"],
    category: "push"
  },
  {
    name: "Decline Bench Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["barbell", "decline bench"],
    category: "push"
  },
  {
    name: "Dumbbell Bench Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["dumbbells", "bench"],
    category: "push"
  },
  {
    name: "Incline Dumbbell Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders"],
    equipment: ["dumbbells", "incline bench"],
    category: "push"
  },
  {
    name: "Decline Dumbbell Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["dumbbells", "decline bench"],
    category: "push"
  },
  {
    name: "Cable Fly",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders"],
    equipment: ["cables"],
    category: "push"
  },
  {
    name: "Dumbbell Fly",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders"],
    equipment: ["dumbbells", "bench"],
    category: "push"
  },
  {
    name: "Push-ups",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["bodyweight"],
    category: "push"
  },
  {
    name: "Machine Chest Press",
    primaryMuscle: "chest",
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: ["machine"],
    category: "push"
  },
  {
    name: "Pec Deck",
    primaryMuscle: "chest",
    secondaryMuscles: [],
    equipment: ["machine"],
    category: "push"
  },

  // Shoulders exercises
  {
    name: "Overhead Press",
    primaryMuscle: "shoulders",
    secondaryMuscles: ["triceps"],
    equipment: ["barbell"],
    category: "push"
  },
  {
    name: "Seated Dumbbell Press",
    primaryMuscle: "shoulders",
    secondaryMuscles: ["triceps"],
    equipment: ["dumbbells", "bench"],
    category: "push"
  },
  {
    name: "Lateral Raises",
    primaryMuscle: "shoulders",
    secondaryMuscles: [],
    equipment: ["dumbbells"],
    category: "push"
  },
  {
    name: "Front Raises",
    primaryMuscle: "shoulders",
    secondaryMuscles: [],
    equipment: ["dumbbells", "barbell"],
    category: "push"
  },
  {
    name: "Reverse Fly",
    primaryMuscle: "rear delts",
    secondaryMuscles: ["rhomboids"],
    equipment: ["dumbbells", "machine"],
    category: "pull"
  },
  {
    name: "Face Pulls",
    primaryMuscle: "rear delts",
    secondaryMuscles: ["rhomboids", "traps"],
    equipment: ["cables"],
    category: "pull"
  },
  {
    name: "Upright Row",
    primaryMuscle: "shoulders",
    secondaryMuscles: ["traps"],
    equipment: ["barbell", "dumbbells"],
    category: "pull"
  },
  {
    name: "Military Press",
    primaryMuscle: "shoulders",
    secondaryMuscles: ["triceps"],
    equipment: ["barbell"],
    category: "push"
  },
  {
    name: "Machine Shoulder Press",
    primaryMuscle: "shoulders",
    secondaryMuscles: ["triceps"],
    equipment: ["machine"],
    category: "push"
  },

  // Back exercises
  {
    name: "Pull-ups",
    primaryMuscle: "lats",
    secondaryMuscles: ["biceps", "rhomboids"],
    equipment: ["pull-up bar"],
    category: "pull"
  },
  {
    name: "Lat Pulldown",
    primaryMuscle: "lats",
    secondaryMuscles: ["biceps", "rhomboids"],
    equipment: ["cables", "machine"],
    category: "pull"
  },
  {
    name: "Barbell Rows",
    primaryMuscle: "lats",
    secondaryMuscles: ["rhomboids", "biceps", "traps"],
    equipment: ["barbell"],
    category: "pull"
  },
  {
    name: "Dumbbell Rows",
    primaryMuscle: "lats",
    secondaryMuscles: ["rhomboids", "biceps", "rear delts"],
    equipment: ["dumbbells", "bench"],
    category: "pull"
  },
  {
    name: "T-Bar Rows",
    primaryMuscle: "lats",
    secondaryMuscles: ["rhomboids", "traps"],
    equipment: ["t-bar", "barbell"],
    category: "pull"
  },
  {
    name: "Cable Rows",
    primaryMuscle: "lats",
    secondaryMuscles: ["rhomboids", "biceps"],
    equipment: ["cables"],
    category: "pull"
  },
  {
    name: "Deadlift",
    primaryMuscle: "back",
    secondaryMuscles: ["hamstrings", "glutes", "traps"],
    equipment: ["barbell"],
    category: "pull"
  },
  {
    name: "Machine Rows",
    primaryMuscle: "lats",
    secondaryMuscles: ["rhomboids"],
    equipment: ["machine"],
    category: "pull"
  },
  {
    name: "Chinups",
    primaryMuscle: "lats",
    secondaryMuscles: ["biceps"],
    equipment: ["pull-up bar"],
    category: "pull"
  },

  // Arms exercises - Triceps
  {
    name: "Tricep Dips",
    primaryMuscle: "triceps",
    secondaryMuscles: ["chest", "shoulders"],
    equipment: ["dip bars", "bench"],
    category: "push"
  },
  {
    name: "Tricep Pushdowns",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    equipment: ["cables"],
    category: "push"
  },
  {
    name: "Skull Crushers",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    equipment: ["barbell", "bench", "dumbbells"],
    category: "push"
  },
  {
    name: "Overhead Tricep Extension",
    primaryMuscle: "triceps",
    secondaryMuscles: [],
    equipment: ["dumbbells", "cables"],
    category: "push"
  },
  {
    name: "Close Grip Bench Press",
    primaryMuscle: "triceps",
    secondaryMuscles: ["chest", "shoulders"],
    equipment: ["barbell", "bench"],
    category: "push"
  },

  // Arms exercises - Biceps
  {
    name: "Bicep Curls",
    primaryMuscle: "biceps",
    secondaryMuscles: ["forearms"],
    equipment: ["dumbbells", "barbell"],
    category: "pull"
  },
  {
    name: "Hammer Curls",
    primaryMuscle: "biceps",
    secondaryMuscles: ["forearms"],
    equipment: ["dumbbells"],
    category: "pull"
  },
  {
    name: "Preacher Curls",
    primaryMuscle: "biceps",
    secondaryMuscles: [],
    equipment: ["barbell", "dumbbells", "machine"],
    category: "pull"
  },
  {
    name: "Concentration Curls",
    primaryMuscle: "biceps",
    secondaryMuscles: [],
    equipment: ["dumbbells"],
    category: "pull"
  },
  {
    name: "Cable Curls",
    primaryMuscle: "biceps",
    secondaryMuscles: ["forearms"],
    equipment: ["cables"],
    category: "pull"
  },
  {
    name: "EZ Bar Curls",
    primaryMuscle: "biceps",
    secondaryMuscles: ["forearms"],
    equipment: ["ez bar"],
    category: "pull"
  },

  // Legs exercises - Quads
  {
    name: "Squats",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: ["barbell"],
    category: "legs"
  },
  {
    name: "Leg Press",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: ["machine"],
    category: "legs"
  },
  {
    name: "Leg Extension",
    primaryMuscle: "quads",
    secondaryMuscles: [],
    equipment: ["machine"],
    category: "legs"
  },
  {
    name: "Front Squats",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes"],
    equipment: ["barbell"],
    category: "legs"
  },
  {
    name: "Hack Squats",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes"],
    equipment: ["machine", "barbell"],
    category: "legs"
  },
  {
    name: "Bulgarian Split Squats",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: ["dumbbells", "bench"],
    category: "legs"
  },
  {
    name: "Walking Lunges",
    primaryMuscle: "quads",
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: ["dumbbells", "barbell", "bodyweight"],
    category: "legs"
  },

  // Legs exercises - Hamstrings
  {
    name: "Romanian Deadlifts",
    primaryMuscle: "hamstrings",
    secondaryMuscles: ["glutes", "lower back"],
    equipment: ["barbell", "dumbbells"],
    category: "legs"
  },
  {
    name: "Leg Curls",
    primaryMuscle: "hamstrings",
    secondaryMuscles: [],
    equipment: ["machine"],
    category: "legs"
  },
  {
    name: "Good Mornings",
    primaryMuscle: "hamstrings",
    secondaryMuscles: ["lower back", "glutes"],
    equipment: ["barbell"],
    category: "legs"
  },
  {
    name: "Glute-Ham Raise",
    primaryMuscle: "hamstrings",
    secondaryMuscles: ["glutes", "lower back"],
    equipment: ["machine"],
    category: "legs"
  },

  // Legs exercises - Calves
  {
    name: "Standing Calf Raises",
    primaryMuscle: "calves",
    secondaryMuscles: [],
    equipment: ["machine", "dumbbells"],
    category: "legs"
  },
  {
    name: "Seated Calf Raises",
    primaryMuscle: "calves",
    secondaryMuscles: [],
    equipment: ["machine"],
    category: "legs"
  },
  {
    name: "Donkey Calf Raises",
    primaryMuscle: "calves",
    secondaryMuscles: [],
    equipment: ["machine", "bodyweight"],
    category: "legs"
  },

  // Core exercises
  {
    name: "Crunches",
    primaryMuscle: "abs",
    secondaryMuscles: [],
    equipment: ["bodyweight"],
    category: "core"
  },
  {
    name: "Leg Raises",
    primaryMuscle: "abs",
    secondaryMuscles: ["hip flexors"],
    equipment: ["bodyweight", "pull-up bar"],
    category: "core"
  },
  {
    name: "Planks",
    primaryMuscle: "core",
    secondaryMuscles: ["shoulders"],
    equipment: ["bodyweight"],
    category: "core"
  },
  {
    name: "Russian Twists",
    primaryMuscle: "obliques",
    secondaryMuscles: ["abs"],
    equipment: ["bodyweight", "kettlebell", "medicine ball"],
    category: "core"
  },
  {
    name: "Cable Crunches",
    primaryMuscle: "abs",
    secondaryMuscles: [],
    equipment: ["cables"],
    category: "core"
  },
  {
    name: "Ab Rollout",
    primaryMuscle: "abs",
    secondaryMuscles: ["shoulders"],
    equipment: ["ab wheel"],
    category: "core"
  },
  {
    name: "Mountain Climbers",
    primaryMuscle: "abs",
    secondaryMuscles: ["shoulders", "quads"],
    equipment: ["bodyweight"],
    category: "core"
  }
];

// Helper function to get all unique muscle groups
export const getAllMuscleGroups = () => {
  const primaryMuscles = new Set(exerciseDatabase.map(ex => ex.primaryMuscle));
  const secondaryMuscles = new Set(
    exerciseDatabase.flatMap(ex => ex.secondaryMuscles)
  );
  
  return [...new Set([...primaryMuscles, ...secondaryMuscles])].sort();
};

// Helper function to get all unique equipment types
export const getAllEquipment = () => {
  return [...new Set(exerciseDatabase.flatMap(ex => ex.equipment))].sort();
};

// Helper function to get exercises by muscle
export const getExercisesByMuscle = (muscle) => {
  return exerciseDatabase.filter(
    ex => ex.primaryMuscle === muscle || ex.secondaryMuscles.includes(muscle)
  );
};

// Helper function to filter exercises by search term
export const searchExercises = (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return [];
  
  const term = searchTerm.toLowerCase().trim();
  return exerciseDatabase.filter(
    ex => ex.name.toLowerCase().includes(term)
  );
};

export default exerciseDatabase;