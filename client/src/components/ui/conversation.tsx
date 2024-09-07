// interface ConversationProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   name: any;
// }
type Conversation = {
  _id: string
  sender_id: string
  receiver_id: string
  content: string
  status_conversation: string
}

export function Conversation({ conversations }: { conversations: Conversation }) {
  console.log('Conversation: ', conversations)
  console.log(123)
  return (
    <>
      <div className='flex cursor-pointer items-center gap-2 rounded p-2 py-1 hover:bg-sky-500'>
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
          </div>
        </div>

        <div className='flex flex-1 flex-col'>
          <div className='flex gap-3'>
            <p className='font-bold text-gray-200'>John</p>
            <span className='text-xl'>😶</span>
          </div>
        </div>
      </div>
      <div className='divider my-0 h-1 py-0' />
    </>
  )
}
