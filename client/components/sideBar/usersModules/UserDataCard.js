import React from 'react'

const UserDataCard = ({ cardOfUsers, id, changeFlagModal, setIdForRenderDataCardInfo }) => {
  const colorStyleDefaultAvatar = `flex items-center justify-center w-1/5 h-10 rounded-full bg-${cardOfUsers[id].userMetaDate.defaultAvatar}-700 text-gray-300 font-bold flex-shrink-0 mr-2`
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
          <div className={colorStyleDefaultAvatar}>{cardOfUsers[id].nameUser[0]}</div>

          <div className="flex pl-1 w-3/5 font-medium">{cardOfUsers[id].nameUser}</div>

          <div className="flex text-gray-600 w-1/5 text-xs mr-1 whitespace-nowrap">10:00 PM</div>
        </div>
      </button>
    </li>
  )
}

UserDataCard.propType = {}

export default React.memo(UserDataCard)
