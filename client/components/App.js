import React from 'react'
import Chat from './Chat'

const App = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          <Chat />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {}

export default React.memo(App)
