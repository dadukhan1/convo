import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div>ChatPage
      <br />
      <button className='cursor-pointer text-3xl' onClick={logout}>lgo</button>
    </div>
  )
}

export default ChatPage