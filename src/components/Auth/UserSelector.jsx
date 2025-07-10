import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiUser, FiUsers, FiPlus } = FiIcons

const UserSelector = ({ onUserSelected }) => {
  const [selectedUser, setSelectedUser] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [showNewUser, setShowNewUser] = useState(false)

  // Default users - you can modify this list
  const defaultUsers = [
    { id: 'krista', name: 'Krista', avatar: '💪' },
    { id: 'alex', name: 'Alex', avatar: '🏋️' },
    { id: 'sarah', name: 'Sarah', avatar: '🔥' },
    { id: 'mike', name: 'Mike', avatar: '⚡' }
  ]

  // Get users from localStorage or use defaults
  const getStoredUsers = () => {
    const stored = localStorage.getItem('rp_users')
    return stored ? JSON.parse(stored) : defaultUsers
  }

  const [users, setUsers] = useState(getStoredUsers())

  const handleUserSelect = (user) => {
    localStorage.setItem('rp_current_user', JSON.stringify(user))
    onUserSelected(user)
  }

  const handleCreateNewUser = () => {
    if (!newUserName.trim()) return

    const newUser = {
      id: newUserName.toLowerCase().replace(/\s+/g, '_'),
      name: newUserName,
      avatar: '🎯'
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('rp_users', JSON.stringify(updatedUsers))
    
    setNewUserName('')
    setShowNewUser(false)
    handleUserSelect(newUser)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-xl inline-block mb-4">
              <SafeIcon icon={FiUsers} className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Your Profile</h1>
            <p className="text-gray-600">Choose your profile to continue training</p>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <motion.button
                key={user.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserSelect(user)}
                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div className="text-2xl">{user.avatar}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">Training Profile</p>
                </div>
                <SafeIcon icon={FiUser} className="text-gray-400" />
              </motion.button>
            ))}

            {/* Add New User */}
            {!showNewUser ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewUser(true)}
                className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600"
              >
                <SafeIcon icon={FiPlus} />
                <span>Add New Profile</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-2 border-primary-200 rounded-xl p-4 bg-primary-50"
              >
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateNewUser()}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCreateNewUser}
                      disabled={!newUserName.trim()}
                      className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Create Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowNewUser(false)
                        setNewUserName('')
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserSelector