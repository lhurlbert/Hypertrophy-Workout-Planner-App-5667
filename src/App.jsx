import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Layout/Header'
import Dashboard from './components/Dashboard/Dashboard'
import PasswordAuth from './components/Auth/PasswordAuth'
import UserSelector from './components/Auth/UserSelector'
import './App.css'

function AppContent() {
  const { isAuthenticated, currentUser, loading, authenticate, selectUser } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="text-4xl">💪</div>
        </div>
      </div>
    )
  }

  // Step 1: Password authentication
  if (!isAuthenticated) {
    return <PasswordAuth onAuthenticated={authenticate} />
  }

  // Step 2: User selection
  if (!currentUser) {
    return <UserSelector onUserSelected={selectUser} />
  }

  // Step 3: Main app
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </Router>
  )
}

export default App