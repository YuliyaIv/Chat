import React from 'react'

const ChatPannel = ({ channelName, description }) => {
  return (
    <div className="flex flex-col  w-full  px-4 pb-6">
      <div className="flex flex-row items-center py-3 px-3 rounded-2xl bg-gray-50 shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-lime-500 ">
          {channelName[0]}
        </div>
        <div className="flex flex-col ml-3">
          <div className="font-semibold text-sm">{channelName}</div>
          <div className="font-semibold text-sm">{description}</div>
        </div>
        <div className="ml-auto">
          <ul className="flex flex-row items-center space-x-2">
            <li>
              <a
                href="#"
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
              >
                <span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

ChatPannel.propTypes = {}

export default React.memo(ChatPannel)
