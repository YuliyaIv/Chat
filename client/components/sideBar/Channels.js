import React from 'react'
import ChatPreview from './ChatPreview'
import InputSearch from '../reuseComponent/InputSearch'

const mess = [
  {
    id: 1,
    name: 'Purpushechka',
    message:
      'Hello how are you?Hello how are you?Hello how are you?Hello how are you?Hello how are you?Hello how are you?Hello how are you?'
  },
  { id: 2, name: 'Aleksei', message: 'You must to learn js hardest' },
  { id: 3, name: 'Sasha', message: 'Hey, doode' },
  { id: 4, name: 'Gleb', message: 'Tailwind it is great styff' },
  { id: 5, name: 'Yuliia', message: 'Hi' },
  { id: 6, name: 'Masha', message: 'I am so beautiful' },
  { id: 7, name: 'Jerry', message: 'Everything bed' },
  { id: 8, name: 'Pepe', message: 'I am the frog!' }
]
const Channels = () => {
  return (
    <div>
      <InputSearch textPlaceholder="Search by message..." />
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold">Messages</div>
        <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
          5
        </div>
      </div>
      <div className="mt-5">
        <ul className="flex flex-row items-center justify-between">
          <li>
            <a
              href="#"
              className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800"
            >
              <span>All Conversations</span>
              <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full" />
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
              <span>Archived</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
              <span>Starred</span>
            </a>
          </li>
        </ul>
      </div>
      {mess.map((itChat) => {
        return <ChatPreview key={itChat.id} name={itChat.name} message={itChat.message} />
      })}
    </div>
  )
}

Channels.propTypes = {}

export default React.memo(Channels)
