-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  equipment TEXT[] DEFAULT '{}',
  preferred_split TEXT DEFAULT 'PPL',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  exercise_logs JSONB NOT NULL DEFAULT '[]',
  perceived_exertion INTEGER CHECK (perceived_exertion >= 1 AND perceived_exertion <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Muscle status table
CREATE TABLE muscle_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  muscle TEXT NOT NULL,
  cumulative_volume INTEGER DEFAULT 0,
  est_recovery_hrs INTEGER DEFAULT 48,
  status TEXT CHECK (status IN ('fresh', 'moderate', 'fatigued')) DEFAULT 'fresh',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, muscle)
);

-- Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE muscle_status ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Sessions policies
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Muscle status policies
CREATE POLICY "Users can view own muscle status" ON muscle_status
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own muscle status" ON muscle_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own muscle status" ON muscle_status
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_sessions_user_date ON sessions(user_id, date DESC);
CREATE INDEX idx_muscle_status_user_muscle ON muscle_status(user_id, muscle);
CREATE INDEX idx_muscle_status_timestamp ON muscle_status(timestamp DESC);