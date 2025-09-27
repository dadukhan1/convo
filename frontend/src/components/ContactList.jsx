import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx';
import NoChatsFound from './NoChatsFound.jsx';

const ContactList = () => {

  const { allContacts, isUserLoading, setSelectedUser, getAllContacts } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts])

  if (isUserLoading) return <UsersLoadingSkeleton />

  if (allContacts.length == 0) return <NoChatsFound />

  return (
    <>
      {
        allContacts.map(contact => (
          <div key={contact._id} className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
            onClick={() => setSelectedUser(contact)}
          >
            <div className='flex items-center gap-3 '>
              {/* Task left : fix with socket.io */}
              <div className={'avatar online'}>
                <div className='size-12 rounded-full'>
                  <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate '>{contact.fullName}</h4>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ContactList