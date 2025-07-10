# RP Hypertrophy Coach

An intelligent hypertrophy training coach for Krista and her training partners. This password-protected web application analyzes workout sessions and provides personalized exercise recommendations based on muscle recovery status.

## Features

### 🔐 Simple Password Protection
- Single password protects the entire app
- No complex authentication - just enter password once
- Local storage keeps you logged in

### 👥 Multiple User Profiles
- Create and switch between different user profiles
- Each user has their own training data and progress
- Easy profile switching without re-authentication

### 📊 Intelligent Analysis
- AI-powered workout analysis
- Real-time muscle fatigue and recovery tracking
- Personalized exercise recommendations

### 💪 Comprehensive Tracking
- **User Profiles**: Individual training data per user
- **Exercise Database**: Primary/secondary muscle groups, equipment requirements
- **Session Logging**: Sets, reps, load, RPE tracking
- **Recovery Monitoring**: Estimated recovery times, cumulative volume

### 🎯 Smart Recommendations
- Exercise suggestions based on fresh vs. fatigued muscles
- Equipment-aware recommendations
- Training optimization

## Setup Instructions

### 1. Password Configuration
The default password is `rp2024coach` - you can change this in:
`src/components/Auth/PasswordAuth.jsx` (line 12)

### 2. Installation & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Default Users
The app comes with 4 default users:
- Krista 💪
- Alex 🏋️
- Sarah 🔥
- Mike ⚡

Users can also create new profiles on the fly.

## Usage Guide

### Getting Started
1. **Enter Password**: Use `rp2024coach` (or your custom password)
2. **Select Profile**: Choose existing user or create new profile
3. **Start Training**: Log workouts and view recovery recommendations

### Logging Workouts
1. Go to "Log Workout" tab
2. Add exercises with sets, reps, and weight
3. Set your RPE (Rate of Perceived Exertion)
4. Save workout for AI analysis

### Viewing Progress
1. **Overview Tab**: See muscle recovery status and recent sessions
2. **Exercise Suggestions**: Get AI-powered recommendations
3. **Switch Users**: Easy profile switching in header

## Technical Architecture

### Frontend
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Local Storage** for data persistence
- **React Hot Toast** for notifications

### Data Storage
- All data stored in browser's localStorage
- No external database required
- Separate data per user profile

### Key Components
- `PasswordAuth`: Simple password protection
- `UserSelector`: Profile selection and creation
- `Dashboard`: Main interface with tabbed navigation
- `WorkoutLogger`: Exercise tracking and RPE input
- `MuscleStatusCard`: Visual recovery status display
- `ExerciseRecommendations`: AI-powered suggestions

## Data Flow
1. **User logs workout** → Exercise data captured
2. **Session saved** → localStorage storage
3. **AI analysis triggered** → Mock analysis processes workout data
4. **Muscle status updated** → Recovery calculations stored
5. **Recommendations generated** → Exercise suggestions displayed

## Security Features
- Simple password protection for app access
- Local data storage (no external database)
- Session persistence in localStorage
- Easy logout and user switching

## Deployment

### For Production:
1. **Change the password** in `PasswordAuth.jsx`
2. **Build the app**: `npm run build`
3. **Deploy** the `dist` folder to your hosting service
4. **Share the password** with your team

### Recommended Hosting:
- Netlify
- Vercel
- GitHub Pages

## Future Enhancements
- Progressive overload tracking
- Training periodization recommendations
- Data export/import functionality
- Mobile-responsive improvements
- Advanced analytics dashboard

---

Built with ❤️ for intelligent hypertrophy training

**Password**: `rp2024coach`