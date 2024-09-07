/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Messages from '@/components/ui/messages'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TiMessages } from 'react-icons/ti'
import useConversation from '@/services/components/useConversation'

export default function MessageContainer() {
  const [value, setValue] = useState('')
  const { selectedConversation } =
    useConversation() as any
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const getProfile = (selectedConversation: string) => {
    axios
      .get(`/api/users/${selectedConversation}`, {
        baseURL: 'http://localhost:4000',
      })
      .then((res) => {
        setValue(res.data.user.fullname)
        alert(`Now chatting with ${res.data.user.fullname}`)
      })
  }
  useEffect(() => {
    if (selectedConversation) {
      getProfile(selectedConversation)
    }
  }, [selectedConversation])

  return (
    <>
      <div
        className='flex flex-col md:min-w-[450px]'
        style={{ marginTop: '15px', marginLeft: '50px' }}
      >
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className='mb-2 bg-slate-500 px-4 py-2'>
              <span className='label-text'>To</span>
              {''}
              <span className='m-1 font-bold text-gray-900'>{value}</span>
            </div>
            {/* <Messages /> */}
          </>
        )}
      </div>
    </>
  )
}

const NoChatSelected = () => {
  return (
    <div className='flex h-96 h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2 px-4 text-center font-semibold text-gray-400 sm:text-lg md:text-xl'>
        <p>Welcome John</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-center text-3xl md:text-6xl' />
      </div>
    </div>
  )
}
