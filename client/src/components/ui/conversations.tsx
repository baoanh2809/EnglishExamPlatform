/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Conversation } from '@/components/ui/conversation'
import useConversation from '@/services/components/useConversation'
type User = {
  _id: string
  fullname: string
  email: string
  password: string
  avatar: string
  role: string
  status: string
  created_at: string
  updated_at: string
}

type Conversation = {
  _id: string
  sender_id: string
  receiver_id: string
  content: string
  status_conversation: string
  users: User[]
}

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const { selectedConversation, setSelectedConversation } =
    useConversation() as any
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await axios
          .get('/api/conversations/receivers/users', {
            baseURL: 'http://localhost:4000',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            const users = response.data.result
            setConversations(users)
          })
      } catch (error) {
        console.error('Error fetching conversations:', error)
      }
    }

    fetchConversations()
  }, [])

  const handleSelectConversation = (conversationId: string) => () => {
    setSelectedConversation(conversationId)
  }
  const users: { _id: string; fullname: string }[] = []
  const userIds = new Set<string>()

  conversations.forEach((conversation) => {
    const user = conversation.users[0]
    if (!userIds.has(user._id)) {
      userIds.add(user._id)
      users.push({
        _id: user._id,
        fullname: user.fullname,
      })
    }
  })

  console.log(users)

  return (
    <div>
      <div className='flex flex-col overflow-auto py-2'>
        {users.map((conversation, idx) => {
          const isActive = selectedConversation === conversation._id
          return (
            <div>
              <div
                className={`flex cursor-pointer items-center gap-2 rounded p-2 py-1 hover:bg-sky-500 ${isActive ? 'bg-sky-500' : ''}`}
                onClick={handleSelectConversation(conversation._id)}
              >
                <div className='avatar online'>
                  <div className='w-12 rounded-full'>
                    <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
                  </div>
                </div>

                <div className='flex flex-1 flex-col'>
                  <div className='flex gap-3'>
                    <p className='font-bold text-gray-200'>
                      {conversation.fullname}
                    </p>
                    {/* <span className='text-xl'>😶</span> */}
                  </div>
                </div>
              </div>
              <div className='divider my-0 h-1 py-0' />
              {idx !== conversations.length - 1 && (
                <div className='divider my-0 h-1 py-0' />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
