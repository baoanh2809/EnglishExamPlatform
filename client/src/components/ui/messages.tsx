// import Message from '@/components/ui/message'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'
import useConversation from '@/services/components/useConversation'
/** @format */
// const profile = JSON.parse(localStorage.getItem('userData') ?? '') || {}
const socket = io('http://localhost:4000', {
  auth: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

const LIMIT = 10
const PAGE = 1

type Conversation = {
  // Define the structure of a conversation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any
  content: string
  sender_id: string
  receiver_id: string
}

export default function Messages() {
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { selectedConversation } = useConversation() as any
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0,
  })
  useEffect(() => {
    socket.on('receive_message', (data: string) => {
      const { payload } = JSON.parse(data.toString())
      setConversations((conversations) => [payload, ...conversations])
    })
    socket.on('connect_error', (err) => {
      console.log(err)
    })
    socket.on('disconnect', (reason) => {
      console.log(reason)
    })
    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      axios
        .get(`/api/conversations/receivers/${selectedConversation}`, {
          baseURL: import.meta.env.VITE_API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            limit: LIMIT,
            page: PAGE,
          },
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result
          setConversations(conversations)
          setPagination({ page, total_page })
        })
    }
  }, [selectedConversation])

  const fetchMoreConversations = (page: number) => {
    if (selectedConversation && page <= pagination.total_page) {
      axios
        .get(`/api/conversations/receivers/${selectedConversation}`, {
          baseURL: import.meta.env.VITE_API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            limit: LIMIT,
            page: pagination.page + 1,
          },
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result
          setConversations((pre) => [...conversations, ...pre])
          setPagination({
            page,
            total_page,
          })
        })
    }
  }

  const send = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setValue('')
    const conversation = {
      content: value,
      sender_id: profile._id,
      receiver_id: selectedConversation,
    }
    // console.log('conversation', conversation)
    socket.emit('send_message', {
      payload: conversation,
    })
    setConversations((conversations) => [
      {
        ...conversation,
        _id: new Date().getTime(),
      },
      ...conversations,
    ])
  }
  return (
    <div className='flex-1 overflow-auto px-4'>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreConversations}
        isReverse={false}
        hasMore={pagination.page < pagination.total_page}
        threshold={5}
      >
        <div
          style={{
            height: 300,
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column-reverse',
          }}
          id='scrollableDiv'
        >
          {conversations.map((conversation) => {
            return (
              <div key={conversation._id} id={conversation._id}>
                <div className='message-container'>
                  <div
                    className={
                      'message ' +
                      (conversation.sender_id === profile._id
                        ? 'message-right'
                        : '')
                    }
                  >
                    {conversation.content}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
      <form onSubmit={send}>
        <input
          type='text'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
