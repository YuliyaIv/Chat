import React from 'react'

const WelcomeWindow = () => {
  return (
    <div className="flex flex-1 justify-center items-center z-0 h-screen w-3/4 px-4 py-6 bg-gradient-to-r from-gray-50 to-cyan-50 ">
      <span className="p-5 border-2 shadow-xl border-violet-200 bg-gradient-to-r from-violet-200 to to-blue-200 rounded-md">
        Select a chat to start messaging
      </span>
    </div>
  )
}

WelcomeWindow.propTypes = {}

export default React.memo(WelcomeWindow)
