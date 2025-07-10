import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated (password entered)
    const authStatus = localStorage.getItem('rp_authenticated')
    const storedUser = localStorage.getItem('rp_current_user')
    
    setIsAuthenticated(authStatus === 'true')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    
    setLoading(false)
  }, [])

  const authenticate = () => {
    setIsAuthenticated(true)
  }

  const selectUser = (user) => {
    setCurrentUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('rp_authenticated')
    localStorage.removeItem('rp_current_user')
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  const value = {
    isAuthenticated,
    currentUser,
    user: currentUser, // Keep compatibility with existing components
    loading,
    authenticate,
    selectUser,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}