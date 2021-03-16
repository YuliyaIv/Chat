import React from 'react'
import ChatPreview from './ChatPreview'

const mess = [
  {
    id: 1,
    name: 'Purpushechka',
    message:
      'Hello how are you?Hello how are you?Hello how are you?Hello how are you?Hello how are you?Hello how are you?Hello how are you?'
  },
  { id: 2, name: 'Aleksei', message: 'You must to learn js hardest' },
  { id: 3, name: 'Sasha', message: 'Hey, doode' },
  { id: 4, name: 'Gleb', message: 'Tilevind it is great styff' },
  { id: 5, name: 'Yuliia', message: 'Hi' },
  { id: 6, name: 'Masha', message: 'I am so beautiful' },
  { id: 7, name: 'Jerry', message: 'Everything bed' },
  { id: 8, name: 'Pepe', message: 'I am the frog!' }
]
const Channels = () => {
  return (
    <div>
      {mess.map((itChat) => {
        return <ChatPreview key={itChat.id} name={itChat.name} message={itChat.message} />
      })}
    </div>
  )
}

Channels.propTypes = {}

export default React.memo(Channels)
