import React from 'react'
import PropTypes from 'prop-types'

const UserDataCard = ({ nameUser, id, changeFlagModal, setIdForRenderDataCardInfo }) => {
  // const colorStyleDefaultAvatar = `flex items-center justify-center w-1/5 rounded-full w-10 bg-lime-700 text-gray-300 font-bold flex-shrink-0 mr-2`
  return (
    <li className="border-gray-400 flex flex-row w-full mt-2">
      <button
        type="button"
        className="focus:outline-none w-full"
        key={id}
        onClick={() => {
          changeFlagModal()
          setIdForRenderDataCardInfo(id)
        }}
      >
        <div className="flex w-full flex-row rounded-md items-center p-2 transition duration-500 select-none cursor-pointer bg-gray-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <svg viewBox="0 0 80 80" width="50" height="40">
            <circle className="circle" cx="40" cy="40" r="40" fill="#52bf85" />
            <text y="55" x="20" className="text-gray-300  text-5xl">
              {nameUser[0] + nameUser[1]}
            </text>
            {nameUser[0]}
          </svg>

          <div className="flex pl-1 w-3/5 font-medium">{nameUser}</div>

          <div className="flex text-gray-600 w-1/5 text-xs mr-1 whitespace-nowrap">10:00 PM</div>
        </div>
      </button>
    </li>
  )
}

UserDataCard.propType = {
  nameUser: PropTypes.string,
  metaDate: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string,
  changeFlagModal: PropTypes.func,
  setIdForRenderDataCardInfo: PropTypes.func
}

export default React.memo(UserDataCard)
