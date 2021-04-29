import React from 'react'
import PropTypes from 'prop-types'

const UserDataCard = ({ nameUser, id, changeFlagModal, metaDate, setIdForRenderDataCardInfo }) => {
  const colorStyleDefaultAvatar = `flex items-center justify-center w-1/5 h-10 rounded-full bg-${metaDate.defaultAvatar}-700 text-gray-300 font-bold flex-shrink-0 mr-2`
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
          <div className={colorStyleDefaultAvatar}>{nameUser[0]}</div>

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
