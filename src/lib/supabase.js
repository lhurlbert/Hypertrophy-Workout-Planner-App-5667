import { createClient } from '@supabase/supabase-js'

// Project ID will be auto-injected during deployment
const SUPABASE_URL = 'https://mujoytsnegtxwhflihct.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11am95dHNuZWd0eHdoZmxpaGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NzgxNjEsImV4cCI6MjA2NzA1NDE2MX0.e8rlhfQl18VLsQzjwMvOqnKq-M4aqmORDgo8eRTkLZY'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ){
  throw new Error('Missing Supabase variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

// Check if email is allowed - updated with new emails
export const isEmailAllowed = (email) => {
  const allowedEmails = [
    'krista@example.com',
    'friend1@example.com', 
    'friend2@example.com',
    'leehurlbert@gmail.com',
    'krista.celentano13@gmail.com'
  ]
  return allowedEmails.includes(email.toLowerCase().trim())
}